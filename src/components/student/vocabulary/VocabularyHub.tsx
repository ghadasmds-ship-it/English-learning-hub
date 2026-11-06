import React, { useState } from 'react';
import { Student, StudentProgress, VocabularyWord } from '../../../types';
import { VOCABULARY_DATA } from '../../../data/welcomeUnitData';
import {
  ILLUSTRATION_MAP,
  VocabGroupTimeIcon,
  VocabGroupEventsIcon,
  VocabGroupNatureIcon,
  VocabGroupDescriptionIcon
} from '../../../data/illustrations';
import { audioService } from '../../../services/audioService';
import { storageService } from '../../../services/storageService';
import {
  Volume2,
  CheckCircle2,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface VocabularyHubProps {
  student: Student;
  progress: StudentProgress;
  onBack: () => void;
  onProgressUpdated: (updated: StudentProgress) => void;
}

export const VocabularyHub: React.FC<VocabularyHubProps> = ({
  student,
  progress,
  onBack,
  onProgressUpdated
}) => {
  const [selectedGroup, setSelectedGroup] = useState<1 | 2 | 3 | 4>(1);
  // Four activities only: Learn, Match, Listen, Spell + Smart Review
  const [activeActivity, setActiveActivity] = useState<'learn' | 'match' | 'listen' | 'spell' | 'smart-review'>('learn');

  const groups = [
    { id: 1 as const, title: 'Time & Calendar', Illustration: VocabGroupTimeIcon, bgColor: 'bg-sky-50/70 hover:bg-sky-50 border-sky-200' },
    { id: 2 as const, title: 'Events & Actions', Illustration: VocabGroupEventsIcon, bgColor: 'bg-orange-50/70 hover:bg-orange-50 border-orange-200' },
    { id: 3 as const, title: 'Things & Nature', Illustration: VocabGroupNatureIcon, bgColor: 'bg-emerald-50/70 hover:bg-emerald-50 border-emerald-200' },
    { id: 4 as const, title: 'Description', Illustration: VocabGroupDescriptionIcon, bgColor: 'bg-amber-50/70 hover:bg-amber-50 border-amber-200' }
  ];

  const groupWords = VOCABULARY_DATA.filter(w => w.group === selectedGroup);

  const handleSpeak = (word: VocabularyWord) => {
    audioService.speak(word.audioText);
  };

  // ----------------------------------------------------
  // ACTIVITY 1: LEARN & LISTEN
  // ----------------------------------------------------
  const [activeWordId, setActiveWordId] = useState<string>(groupWords[0]?.id || 'ago');
  const currentLearnWord = groupWords.find(w => w.id === activeWordId) || groupWords[0];
  const CurrentIllustration = currentLearnWord ? ILLUSTRATION_MAP[currentLearnWord.illustrationKey] : null;

  // ----------------------------------------------------
  // ACTIVITY 2: MATCH MEANING (Picture-Based Matching)
  // Orange for incorrect (not red), "Try again!", allow 2nd attempt
  // Reveal after repeated errors, add to Smart Review
  // ----------------------------------------------------
  const [matchSelectedWord, setMatchSelectedWord] = useState<string | null>(null);
  const [matchSelectedCard, setMatchSelectedCard] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [matchMistakes, setMatchMistakes] = useState<Record<string, number>>({});
  const [matchFeedback, setMatchFeedback] = useState<{ message: string; type: 'correct' | 'try-again' | 'revealed' } | null>(null);

  const handleMatchWordClick = (wordId: string) => {
    if (matchedPairs.includes(wordId)) return;
    setMatchSelectedWord(wordId);
    if (matchSelectedCard) {
      evaluateMatch(wordId, matchSelectedCard);
    }
  };

  const handleMatchCardClick = (targetId: string) => {
    if (matchedPairs.includes(targetId)) return;
    setMatchSelectedCard(targetId);
    if (matchSelectedWord) {
      evaluateMatch(matchSelectedWord, targetId);
    }
  };

  const evaluateMatch = (wId: string, cId: string) => {
    const isCorrect = wId === cId;
    const currentMissCount = (matchMistakes[wId] || 0);

    if (isCorrect) {
      audioService.playSuccessChime();
      setMatchedPairs(prev => [...prev, wId]);
      setMatchSelectedWord(null);
      setMatchSelectedCard(null);
      setMatchFeedback({ message: 'Great job! Correct match.', type: 'correct' });

      const isIndependent = currentMissCount === 0;

      storageService.recordLearningAttempt({
        studentId: student.id,
        classId: student.classId,
        teacherId: student.teacherId,
        section: 'vocabulary',
        activityId: 'match',
        score: isIndependent ? 100 : 70,
        maxScore: 100,
        isCorrect: true,
        details: { wordId: wId, independent: isIndependent }
      });
      onProgressUpdated(storageService.getStudentProgress(student.id));
    } else {
      audioService.playEncouragingTone();
      const updatedMissCount = currentMissCount + 1;
      setMatchMistakes(prev => ({ ...prev, [wId]: updatedMissCount }));

      if (updatedMissCount === 1) {
        // First error: Orange feedback & second attempt
        setMatchFeedback({ message: 'Try again! Check the picture meaning.', type: 'try-again' });
        setTimeout(() => {
          setMatchSelectedWord(null);
          setMatchSelectedCard(null);
        }, 600);
      } else {
        // Repeated error: reveal & pronounce word, add to Smart Review
        const targetWord = groupWords.find(w => w.id === wId);
        setMatchFeedback({
          message: `The correct picture for "${targetWord?.word || wId}" is shown. Added to Smart Review.`,
          type: 'revealed'
        });
        if (targetWord) audioService.speak(targetWord.word);

        storageService.recordLearningAttempt({
          studentId: student.id,
          classId: student.classId,
          teacherId: student.teacherId,
          section: 'vocabulary',
          activityId: 'match',
          score: 0,
          maxScore: 100,
          isCorrect: false,
          details: { wordId: wId, independent: false }
        });
        onProgressUpdated(storageService.getStudentProgress(student.id));

        setTimeout(() => {
          setMatchSelectedWord(null);
          setMatchSelectedCard(null);
        }, 1200);
      }
    }
  };

  // ----------------------------------------------------
  // ACTIVITY 3: LISTEN & CHOOSE
  // Audio prompt -> select word card. Consistent retry rule.
  // ----------------------------------------------------
  const [listenWordIndex, setListenWordIndex] = useState(0);
  const targetListenWord = groupWords[listenWordIndex % groupWords.length];
  const [selectedListenChoice, setSelectedListenChoice] = useState<string | null>(null);
  const [listenAttemptCount, setListenAttemptCount] = useState<number>(0);
  const [listenFeedback, setListenFeedback] = useState<{ message: string; type: 'correct' | 'try-again' | 'revealed' } | null>(null);

  const handlePlayListenAudio = () => {
    if (targetListenWord) audioService.speak(targetListenWord.word);
  };

  const handleSelectListenChoice = (wordId: string) => {
    if (listenFeedback?.type === 'correct' || listenFeedback?.type === 'revealed' || !targetListenWord) return;
    setSelectedListenChoice(wordId);
    const newAttempt = listenAttemptCount + 1;
    setListenAttemptCount(newAttempt);

    const isCorrect = wordId === targetListenWord.id;

    if (isCorrect) {
      audioService.playSuccessChime();
      setListenFeedback({ message: 'Great job! You heard the right word.', type: 'correct' });

      const isIndependent = newAttempt === 1;

      storageService.recordLearningAttempt({
        studentId: student.id,
        classId: student.classId,
        teacherId: student.teacherId,
        section: 'vocabulary',
        activityId: 'listen',
        score: isIndependent ? 100 : 70,
        maxScore: 100,
        isCorrect: true,
        details: { wordId: targetListenWord.id, chosen: wordId, independent: isIndependent }
      });
      onProgressUpdated(storageService.getStudentProgress(student.id));
    } else {
      audioService.playEncouragingTone();
      if (newAttempt === 1) {
        setListenFeedback({ message: 'Try again! Listen closely to the audio.', type: 'try-again' });
      } else {
        setListenFeedback({
          message: `The word was "${targetListenWord.word}". Added to Smart Review.`,
          type: 'revealed'
        });
        audioService.speak(targetListenWord.word);

        storageService.recordLearningAttempt({
          studentId: student.id,
          classId: student.classId,
          teacherId: student.teacherId,
          section: 'vocabulary',
          activityId: 'listen',
          score: 0,
          maxScore: 100,
          isCorrect: false,
          details: { wordId: targetListenWord.id, chosen: wordId, independent: false }
        });
        onProgressUpdated(storageService.getStudentProgress(student.id));
      }
    }
  };

  const handleNextListenWord = () => {
    setListenWordIndex(prev => prev + 1);
    setSelectedListenChoice(null);
    setListenAttemptCount(0);
    setListenFeedback(null);
  };

  // ----------------------------------------------------
  // ACTIVITY 4: SPELL IT (INTERACTIVE LETTER ARRANGING)
  // Replaced full-word typing with scrambled letter tiles!
  // Tap/drag to arrange letters. Touchscreen & mouse support.
  // ----------------------------------------------------
  const [spellIndex, setSpellIndex] = useState(0);
  const targetSpellWord = groupWords[spellIndex % groupWords.length];

  // Scrambled letters pool and placed letters
  const [scrambledTiles, setScrambledTiles] = useState<Array<{ id: number; char: string }>>([]);
  const [placedTiles, setPlacedTiles] = useState<Array<{ id: number; char: string }>>([]);
  const [spellFeedback, setSpellFeedback] = useState<{ message: string; type: 'correct' | 'try-again' | 'revealed' } | null>(null);

  const initSpellLetters = (word: VocabularyWord) => {
    const letters = word.word.toUpperCase().split('').map((char, id) => ({ id, char }));
    // Shuffle
    let shuffled = [...letters].sort(() => Math.random() - 0.5);
    while (shuffled.map(l => l.char).join('') === word.word.toUpperCase() && letters.length > 2) {
      shuffled = [...letters].sort(() => Math.random() - 0.5);
    }
    setScrambledTiles(shuffled);
    setPlacedTiles([]);
    setSpellFeedback(null);
  };

  React.useEffect(() => {
    if (activeActivity === 'spell' && targetSpellWord) {
      initSpellLetters(targetSpellWord);
    }
  }, [activeActivity, targetSpellWord]);

  const handlePickTile = (tile: { id: number; char: string }) => {
    if (spellFeedback?.type === 'correct') return;
    setScrambledTiles(prev => prev.filter(t => t.id !== tile.id));
    setPlacedTiles(prev => [...prev, tile]);
    audioService.playStarPop();
  };

  const handleReturnTile = (tile: { id: number; char: string }) => {
    if (spellFeedback?.type === 'correct') return;
    setPlacedTiles(prev => prev.filter(t => t.id !== tile.id));
    setScrambledTiles(prev => [...prev, tile]);
  };

  const handleCheckSpelling = () => {
    if (!targetSpellWord) return;
    const currentSpelled = placedTiles.map(t => t.char).join('');
    const target = targetSpellWord.word.toUpperCase();

    if (currentSpelled === target) {
      audioService.playSuccessChime();
      setSpellFeedback({ message: 'Great job! Word spelled correctly!', type: 'correct' });

      storageService.recordLearningAttempt({
        studentId: student.id,
        classId: student.classId,
        teacherId: student.teacherId,
        section: 'vocabulary',
        activityId: 'spell',
        score: 100,
        maxScore: 100,
        isCorrect: true,
        details: { wordId: targetSpellWord.id, spelled: currentSpelled }
      });
      onProgressUpdated(storageService.getStudentProgress(student.id));
    } else {
      audioService.playEncouragingTone();
      setSpellFeedback({ message: 'Try again! Check the letter positions.', type: 'try-again' });
    }
  };

  const handleNextSpellWord = () => {
    const nextIdx = (spellIndex + 1) % groupWords.length;
    setSpellIndex(nextIdx);
    const nextWord = groupWords[nextIdx];
    if (nextWord) initSpellLetters(nextWord);
  };

  // ----------------------------------------------------
  // SMART REVIEW: PERSISTENT WEAK WORDS POOL
  // ----------------------------------------------------
  const weakWords = VOCABULARY_DATA.filter(w => {
    const wm = progress.wordMastery[w.id];
    return wm?.needsReview || (!wm?.mastered && wm?.learned);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header and Back navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBack}
            className="text-xs font-semibold text-slate-500 hover:text-amber-600 flex items-center gap-1.5 transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Welcome</span>
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              My Vocabulary
            </h1>
          </div>
        </div>

        {/* Activity Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl text-xs font-bold overflow-x-auto">
          <button
            onClick={() => setActiveActivity('learn')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeActivity === 'learn' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Learn &amp; Listen
          </button>
          <button
            onClick={() => setActiveActivity('match')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeActivity === 'match' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Match Meaning
          </button>
          <button
            onClick={() => setActiveActivity('listen')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeActivity === 'listen' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Listen &amp; Choose
          </button>
          <button
            onClick={() => setActiveActivity('spell')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeActivity === 'spell' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Spell It
          </button>
          <button
            onClick={() => setActiveActivity('smart-review')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
              activeActivity === 'smart-review' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Smart Review</span>
            {weakWords.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
                {weakWords.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Four Vocabulary Group Selection Cards (Display ONLY illustration + title) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {groups.map((g) => {
          const GroupIcon = g.Illustration;
          const isSelected = selectedGroup === g.id;
          return (
            <div
              key={g.id}
              onClick={() => {
                setSelectedGroup(g.id);
                const first = VOCABULARY_DATA.filter(w => w.group === g.id)[0];
                if (first) setActiveWordId(first.id);
                setMatchedPairs([]);
                setMatchSelectedWord(null);
                setMatchSelectedCard(null);
              }}
              className={`rounded-2xl border p-4 flex flex-col items-center justify-center text-center transition-all cursor-pointer bg-white group ${
                isSelected
                  ? 'border-amber-400 ring-2 ring-amber-300 shadow-xs'
                  : 'border-slate-200 hover:border-amber-200 hover:shadow-xs'
              }`}
            >
              <div className="w-16 h-16 mb-2 flex items-center justify-center transition-transform group-hover:scale-105">
                <GroupIcon className="w-full h-full drop-shadow-xs" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 font-display group-hover:text-amber-600 transition-colors">
                {g.title}
              </h3>
            </div>
          );
        })}
      </div>

      {/* Activity Area Container */}
      <div className="bg-slate-50/70 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6">
        {/* ========================================================================= */}
        {/* 1. LEARN & LISTEN                                                         */}
        {/* ========================================================================= */}
        {activeActivity === 'learn' && currentLearnWord && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center gap-8">
              <div className="w-48 h-40 shrink-0 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center p-2">
                {CurrentIllustration ? <CurrentIllustration className="w-full h-full" /> : null}
              </div>

              <div className="flex-1 space-y-3 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                    {currentLearnWord.groupName}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 font-arabic">
                    {currentLearnWord.arabicMeaning}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display">
                  {currentLearnWord.word}
                </h2>

                <p className="text-base text-slate-600 font-medium italic">
                  &quot;{currentLearnWord.exampleSentence}&quot;
                </p>

                <div className="pt-2 flex flex-wrap gap-3 justify-center md:justify-start">
                  <button
                    onClick={() => handleSpeak(currentLearnWord)}
                    className="py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer kid-button"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Hear Pronunciation</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Word selector strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {groupWords.map((w) => {
                const isSelected = w.id === currentLearnWord.id;
                const isMastered = progress.wordMastery[w.id]?.mastered;
                return (
                  <button
                    key={w.id}
                    onClick={() => {
                      setActiveWordId(w.id);
                      handleSpeak(w);
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-50 border-amber-400 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-slate-900">{w.word}</span>
                      {isMastered && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </div>
                    <div className="text-xs text-slate-500 font-arabic">{w.arabicMeaning}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. MATCH MEANING (Picture-Based Matching)                                 */}
        {/* Orange for incorrect (not red), "Try again!", allow 2nd attempt          */}
        {/* ========================================================================= */}
        {activeActivity === 'match' && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-slate-900 font-display">
                Match Word to Meaning
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Tap an English word on the left, then tap its matching meaning on the right.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Left Column: English Words */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-slate-400 uppercase text-center">English</div>
                {groupWords.map((w) => {
                  const isMatched = matchedPairs.includes(w.id);
                  const isSelected = matchSelectedWord === w.id;
                  return (
                    <button
                      key={w.id}
                      disabled={isMatched}
                      onClick={() => handleMatchWordClick(w.id)}
                      className={`w-full p-3.5 rounded-xl border text-sm font-bold transition-all flex items-center justify-between cursor-pointer ${
                        isMatched
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800 opacity-60'
                          : isSelected
                          ? 'bg-amber-100 border-amber-400 text-amber-950 scale-102'
                          : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-amber-50'
                      }`}
                    >
                      <span>{w.word}</span>
                      {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Arabic Meanings (reversed order) */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-slate-400 uppercase text-center">Meaning</div>
                {[...groupWords].reverse().map((w) => {
                  const isMatched = matchedPairs.includes(w.id);
                  const isSelected = matchSelectedCard === w.id;
                  return (
                    <button
                      key={w.id}
                      disabled={isMatched}
                      onClick={() => handleMatchCardClick(w.id)}
                      className={`w-full p-3.5 rounded-xl border text-sm font-bold font-arabic transition-all flex items-center justify-between cursor-pointer ${
                        isMatched
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800 opacity-60'
                          : isSelected
                          ? 'bg-amber-100 border-amber-400 text-amber-950 scale-102'
                          : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-amber-50'
                      }`}
                    >
                      <span>{w.arabicMeaning}</span>
                      {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Orange feedback for errors, green for success */}
            {matchFeedback && (
              <div
                className={`p-3.5 rounded-2xl text-xs font-bold text-center ${
                  matchFeedback.type === 'correct'
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                    : 'bg-amber-50 border border-orange-300 text-orange-950'
                }`}
              >
                {matchFeedback.message}
              </div>
            )}

            {matchedPairs.length === groupWords.length && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center text-xs font-bold text-emerald-900">
                🎉 Great job! All pairs matched successfully!
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. LISTEN & CHOOSE                                                        */}
        {/* ========================================================================= */}
        {activeActivity === 'listen' && targetListenWord && (
          <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 text-center">
            <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
              <div className="text-xs font-semibold text-amber-900">
                Listen carefully to the word, then tap the matching card:
              </div>
              <button
                onClick={handlePlayListenAudio}
                className="py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-bold text-xs inline-flex items-center gap-2 shadow-xs transition-all cursor-pointer kid-button"
              >
                <Volume2 className="w-5 h-5" />
                <span>Hear Audio</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              {groupWords.slice(0, 4).map((w) => {
                const isSelected = selectedListenChoice === w.id;
                const isCorrectOpt = w.id === targetListenWord.id;

                let btnClass = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-amber-50';
                if (listenFeedback) {
                  if (listenFeedback.type === 'correct' && isCorrectOpt) {
                    btnClass = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                  } else if (listenFeedback.type === 'try-again' && isSelected) {
                    btnClass = 'bg-amber-50 border-orange-400 text-orange-950 font-bold';
                  } else if (listenFeedback.type === 'revealed') {
                    if (isCorrectOpt) btnClass = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                    else if (isSelected) btnClass = 'bg-amber-50 border-orange-300 text-orange-900 opacity-70';
                    else btnClass = 'bg-slate-50 border-slate-200 text-slate-400 opacity-50';
                  }
                }

                return (
                  <button
                    key={w.id}
                    disabled={listenFeedback?.type === 'correct' || listenFeedback?.type === 'revealed'}
                    onClick={() => handleSelectListenChoice(w.id)}
                    className={`p-4 rounded-2xl border-2 text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${btnClass}`}
                  >
                    <span>{w.word}</span>
                    {listenFeedback?.type === 'correct' && isCorrectOpt && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                  </button>
                );
              })}
            </div>

            {listenFeedback && (
              <div
                className={`p-3.5 rounded-xl text-xs font-bold ${
                  listenFeedback.type === 'correct'
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                    : 'bg-amber-50 border border-orange-300 text-orange-950'
                }`}
              >
                {listenFeedback.message}
              </div>
            )}

            {(listenFeedback?.type === 'correct' || listenFeedback?.type === 'revealed') && (
              <button
                onClick={handleNextListenWord}
                className="w-full py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-bold text-xs transition-all cursor-pointer kid-button"
              >
                Next Word →
              </button>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. SPELL IT: INTERACTIVE LETTER-ARRANGING ACTIVITY                         */}
        {/* Scrambled letter tiles. Tap/drag to arrange. Touchscreen & mouse support.  */}
        {/* ========================================================================= */}
        {activeActivity === 'spell' && targetSpellWord && (
          <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 text-center">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase">
                Arrange Letters to Spell
              </span>
              <button
                onClick={() => audioService.speak(targetSpellWord.word)}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Hear Word</span>
              </button>
            </div>

            {/* Arabic meaning cue */}
            <div className="text-xs text-slate-600 font-medium">
              Meaning: <span className="font-bold text-slate-900 font-arabic text-sm">{targetSpellWord.arabicMeaning}</span>
            </div>

            {/* Target Spelling Slots Box */}
            <div className="min-h-[70px] p-4 rounded-2xl bg-amber-50/50 border-2 border-dashed border-amber-300 flex flex-wrap items-center justify-center gap-2">
              {placedTiles.length === 0 ? (
                <span className="text-xs text-slate-400 italic">
                  Tap the letter tiles below in the correct order to spell the word
                </span>
              ) : (
                placedTiles.map((tile) => (
                  <button
                    key={tile.id}
                    onClick={() => handleReturnTile(tile)}
                    className="w-12 h-12 rounded-xl bg-amber-500 text-white font-black text-xl flex items-center justify-center shadow-xs cursor-pointer hover:bg-amber-600 active:scale-95 transition-all"
                    title="Tap to return letter"
                  >
                    {tile.char}
                  </button>
                ))
              )}
            </div>

            {/* Scrambled Letter Tiles Pool */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-semibold text-slate-500">Available Letters:</div>
              <div className="flex flex-wrap items-center justify-center gap-2.5 min-h-[50px]">
                {scrambledTiles.map((tile) => (
                  <button
                    key={tile.id}
                    onClick={() => handlePickTile(tile)}
                    className="w-12 h-12 rounded-xl bg-white border-2 border-slate-300 text-slate-900 font-black text-xl flex items-center justify-center shadow-xs hover:border-amber-400 hover:bg-amber-50 active:scale-95 transition-all cursor-pointer kid-button"
                  >
                    {tile.char}
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Banner */}
            {spellFeedback && (
              <div
                className={`p-3.5 rounded-2xl text-xs font-bold ${
                  spellFeedback.type === 'correct'
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                    : 'bg-amber-50 border border-orange-300 text-orange-950'
                }`}
              >
                {spellFeedback.message}
              </div>
            )}

            {/* Verification & Navigation Buttons */}
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={handleCheckSpelling}
                disabled={placedTiles.length === 0 || spellFeedback?.type === 'correct'}
                className="py-3 px-8 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-white font-bold text-xs shadow-xs transition-all cursor-pointer kid-button"
              >
                Check Spelling
              </button>

              <button
                onClick={() => initSpellLetters(targetSpellWord)}
                className="py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer"
              >
                Reset Letters
              </button>

              {spellFeedback?.type === 'correct' && (
                <button
                  onClick={handleNextSpellWord}
                  className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-all cursor-pointer kid-button"
                >
                  Next Word →
                </button>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 5. SMART REVIEW                                                           */}
        {/* ========================================================================= */}
        {activeActivity === 'smart-review' && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <h3 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-amber-600" />
              <span>Vocabulary Smart Review</span>
            </h3>
            <p className="text-xs text-slate-500">
              Words requiring extra practice are reinforced here until independent mastery is achieved.
            </p>

            {weakWords.length === 0 ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <div className="text-sm font-bold text-emerald-950">All Words Mastered!</div>
                <p className="text-xs text-emerald-700">
                  You have successfully achieved independent mastery across all practiced target words!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {weakWords.map((w) => (
                  <div
                    key={w.id}
                    className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-900">{w.word}</div>
                      <div className="text-xs text-slate-500 font-arabic">{w.arabicMeaning}</div>
                    </div>
                    <button
                      onClick={() => handleSpeak(w)}
                      className="p-2 rounded-xl bg-white border border-amber-200 text-amber-700 hover:bg-amber-100 transition-colors cursor-pointer"
                      title="Hear pronunciation"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
