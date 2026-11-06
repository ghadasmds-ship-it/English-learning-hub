import React, { useState } from 'react';
import { Student, StudentProgress } from '../../../types';
import { audioService } from '../../../services/audioService';
import { storageService } from '../../../services/storageService';
import { numberToAmericanWords } from '../../../data/welcomeUnitData';
import {
  Volume2,
  CheckCircle2,
  ArrowLeft,
  RotateCcw,
  Headphones,
  Check,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface NumbersHubProps {
  student: Student;
  progress: StudentProgress;
  onBack: () => void;
  onProgressUpdated: (updated: StudentProgress) => void;
}

interface NumberItem {
  numeral: number;
  words: string;
}

export const NumbersHub: React.FC<NumbersHubProps> = ({
  student,
  progress,
  onBack,
  onProgressUpdated
}) => {
  // Navigation tabs: 'learn' | 'recognition' | 'dictation' | 'smart-review'
  const [activeTab, setActiveTab] = useState<'learn' | 'recognition' | 'dictation' | 'smart-review'>('learn');

  // Groups for Learning: Ones, Teens and Tens, Hundreds, One Thousand, Combined Numbers
  const numberGroups = [
    {
      id: 'ones',
      title: 'Ones',
      items: [
        { numeral: 0, words: 'zero' },
        { numeral: 1, words: 'one' },
        { numeral: 2, words: 'two' },
        { numeral: 3, words: 'three' },
        { numeral: 4, words: 'four' },
        { numeral: 5, words: 'five' },
        { numeral: 6, words: 'six' },
        { numeral: 7, words: 'seven' },
        { numeral: 8, words: 'eight' },
        { numeral: 9, words: 'nine' }
      ]
    },
    {
      id: 'teens_tens',
      title: 'Teens and Tens',
      items: [
        { numeral: 10, words: 'ten' },
        { numeral: 11, words: 'eleven' },
        { numeral: 12, words: 'twelve' },
        { numeral: 13, words: 'thirteen' },
        { numeral: 14, words: 'fourteen' },
        { numeral: 15, words: 'fifteen' },
        { numeral: 20, words: 'twenty' },
        { numeral: 30, words: 'thirty' },
        { numeral: 40, words: 'forty' },
        { numeral: 50, words: 'fifty' },
        { numeral: 60, words: 'sixty' },
        { numeral: 70, words: 'seventy' },
        { numeral: 80, words: 'eighty' },
        { numeral: 90, words: 'ninety' }
      ]
    },
    {
      id: 'hundreds',
      title: 'Hundreds',
      items: [
        { numeral: 100, words: 'one hundred' },
        { numeral: 200, words: 'two hundred' },
        { numeral: 300, words: 'three hundred' },
        { numeral: 400, words: 'four hundred' },
        { numeral: 500, words: 'five hundred' },
        { numeral: 600, words: 'six hundred' },
        { numeral: 700, words: 'seven hundred' },
        { numeral: 800, words: 'eight hundred' },
        { numeral: 900, words: 'nine hundred' }
      ]
    },
    {
      id: 'one_thousand',
      title: 'One Thousand',
      items: [
        { numeral: 1000, words: 'one thousand' }
      ]
    },
    {
      id: 'combined',
      title: 'Combined Numbers',
      items: [
        { numeral: 24, words: 'twenty-four' },
        { numeral: 75, words: 'seventy-five' },
        { numeral: 125, words: 'one hundred twenty-five' },
        { numeral: 308, words: 'three hundred eight' },
        { numeral: 348, words: 'three hundred forty-eight' },
        { numeral: 470, words: 'four hundred seventy' },
        { numeral: 902, words: 'nine hundred two' }
      ]
    }
  ];

  const [selectedGroupId, setSelectedGroupId] = useState<string>('ones');
  const currentGroup = numberGroups.find(g => g.id === selectedGroupId) || numberGroups[0];

  const handleSpeak = (text: string) => {
    audioService.speak(text);
  };

  // Smart review list of missed numbers
  const [smartReviewNumbers, setSmartReviewNumbers] = useState<number[]>([308, 470]);

  // =========================================================================
  // PRACTICE A: NUMBER RECOGNITION
  // Students see a numeral and choose its correctly written English name (4 choices)
  // 1st error: orange + "Try again!" (allow second attempt)
  // 2nd error: reveal & pronounce correct answer + add to Smart Review
  // Mastery awarded only if correct on first attempt
  // =========================================================================
  const recognitionQuestions = [
    {
      numeral: 8,
      correct: 'eight',
      options: ['eight', 'eighteen', 'eighty', 'seven']
    },
    {
      numeral: 40,
      correct: 'forty',
      options: ['four', 'fourteen', 'forty', 'four hundred']
    },
    {
      numeral: 100,
      correct: 'one hundred',
      options: ['one hundred', 'ten', 'one thousand', 'one hundred ten']
    },
    {
      numeral: 125,
      correct: 'one hundred twenty-five',
      options: ['one hundred twenty-five', 'one hundred fifteen', 'two hundred twenty-five', 'one hundred two']
    },
    {
      numeral: 308,
      correct: 'three hundred eight',
      options: ['three hundred eight', 'three hundred eighty', 'three hundred eighteen', 'thirty-eight']
    },
    {
      numeral: 348,
      correct: 'three hundred forty-eight',
      options: ['three hundred forty-eight', 'three hundred eighty-four', 'three hundred fourteen', 'four hundred thirty-eight']
    },
    {
      numeral: 470,
      correct: 'four hundred seventy',
      options: ['four hundred seventy', 'four hundred seventeen', 'four hundred seven', 'seven hundred forty']
    },
    {
      numeral: 902,
      correct: 'nine hundred two',
      options: ['nine hundred two', 'nine hundred twenty', 'nine hundred twelve', 'nine thousand two']
    },
    {
      numeral: 1000,
      correct: 'one thousand',
      options: ['one thousand', 'one hundred', 'ten thousand', 'one million']
    }
  ];

  const [recIndex, setRecIndex] = useState(0);
  const currentRecQ = recognitionQuestions[recIndex % recognitionQuestions.length];
  const [recSelected, setRecSelected] = useState<string | null>(null);
  const [recAttemptCount, setRecAttemptCount] = useState<number>(0);
  const [recFeedback, setRecFeedback] = useState<{ message: string; type: 'correct' | 'try-again' | 'revealed' } | null>(null);

  const handleSelectRecognition = (chosen: string) => {
    if (recFeedback?.type === 'correct' || recFeedback?.type === 'revealed') return;
    setRecSelected(chosen);
    const newAttemptCount = recAttemptCount + 1;
    setRecAttemptCount(newAttemptCount);

    const isCorrect = chosen === currentRecQ.correct;

    if (isCorrect) {
      audioService.playSuccessChime();
      setRecFeedback({ message: 'Great job! Correct English name.', type: 'correct' });

      // Only count towards independent mastery if answered correctly on first try
      const isIndependentMastery = newAttemptCount === 1;

      storageService.recordLearningAttempt({
        studentId: student.id,
        classId: student.classId,
        teacherId: student.teacherId,
        section: 'numbers',
        activityId: 'read',
        score: isIndependentMastery ? 100 : 70,
        maxScore: 100,
        isCorrect: true,
        details: { numeral: currentRecQ.numeral, chosen, independent: isIndependentMastery }
      });
      onProgressUpdated(storageService.getStudentProgress(student.id));
    } else {
      audioService.playEncouragingTone();
      if (newAttemptCount === 1) {
        // First error: Orange feedback + allow 2nd attempt
        setRecFeedback({ message: 'Try again! Look closely at the written words.', type: 'try-again' });
      } else {
        // Second error: Reveal and pronounce correct answer, add to Smart Review
        setRecFeedback({
          message: `The correct written name is "${currentRecQ.correct}". Added to Smart Review.`,
          type: 'revealed'
        });
        audioService.speak(currentRecQ.correct);
        setSmartReviewNumbers(prev => prev.includes(currentRecQ.numeral) ? prev : [...prev, currentRecQ.numeral]);

        storageService.recordLearningAttempt({
          studentId: student.id,
          classId: student.classId,
          teacherId: student.teacherId,
          section: 'numbers',
          activityId: 'read',
          score: 0,
          maxScore: 100,
          isCorrect: false,
          details: { numeral: currentRecQ.numeral, chosen, independent: false }
        });
        onProgressUpdated(storageService.getStudentProgress(student.id));
      }
    }
  };

  const handleNextRecognition = () => {
    setRecIndex(prev => prev + 1);
    setRecSelected(null);
    setRecAttemptCount(0);
    setRecFeedback(null);
  };

  // =========================================================================
  // PRACTICE B: NUMBER DICTATION
  // Students listen to spoken number and select correct NUMERAL from 4 options
  // NO typing required! Replay audio anytime. Same supportive 2-step retry.
  // =========================================================================
  const dictationQuestions = [
    { numeral: 8, spoken: 'eight', options: [8, 18, 80, 7] },
    { numeral: 40, spoken: 'forty', options: [14, 40, 4, 400] },
    { numeral: 125, spoken: 'one hundred twenty-five', options: [125, 152, 215, 120] },
    { numeral: 308, spoken: 'three hundred eight', options: [380, 308, 318, 803] },
    { numeral: 348, spoken: 'three hundred forty-eight', options: [348, 384, 438, 340] },
    { numeral: 470, spoken: 'four hundred seventy', options: [417, 470, 740, 407] },
    { numeral: 902, spoken: 'nine hundred two', options: [920, 902, 912, 209] },
    { numeral: 1000, spoken: 'one thousand', options: [100, 1000, 10000, 10] }
  ];

  const [dictIndex, setDictIndex] = useState(0);
  const currentDictQ = dictationQuestions[dictIndex % dictationQuestions.length];
  const [dictSelected, setDictSelected] = useState<number | null>(null);
  const [dictAttemptCount, setDictAttemptCount] = useState<number>(0);
  const [dictFeedback, setDictFeedback] = useState<{ message: string; type: 'correct' | 'try-again' | 'revealed' } | null>(null);

  const handlePlayDictationAudio = () => {
    audioService.speak(currentDictQ.spoken);
  };

  const handleSelectDictation = (chosenNum: number) => {
    if (dictFeedback?.type === 'correct' || dictFeedback?.type === 'revealed') return;
    setDictSelected(chosenNum);
    const newAttempt = dictAttemptCount + 1;
    setDictAttemptCount(newAttempt);

    const isCorrect = chosenNum === currentDictQ.numeral;

    if (isCorrect) {
      audioService.playSuccessChime();
      setDictFeedback({ message: 'Great job! You heard and chose the right number.', type: 'correct' });

      const isIndependent = newAttempt === 1;

      storageService.recordLearningAttempt({
        studentId: student.id,
        classId: student.classId,
        teacherId: student.teacherId,
        section: 'numbers',
        activityId: 'dictation',
        score: isIndependent ? 100 : 70,
        maxScore: 100,
        isCorrect: true,
        details: { target: currentDictQ.numeral, chosen: chosenNum, independent: isIndependent }
      });
      onProgressUpdated(storageService.getStudentProgress(student.id));
    } else {
      audioService.playEncouragingTone();
      if (newAttempt === 1) {
        setDictFeedback({ message: 'Try again! Listen to the audio once more.', type: 'try-again' });
      } else {
        setDictFeedback({
          message: `The correct numeral is ${currentDictQ.numeral} (${currentDictQ.spoken}). Added to Smart Review.`,
          type: 'revealed'
        });
        audioService.speak(currentDictQ.spoken);
        setSmartReviewNumbers(prev => prev.includes(currentDictQ.numeral) ? prev : [...prev, currentDictQ.numeral]);

        storageService.recordLearningAttempt({
          studentId: student.id,
          classId: student.classId,
          teacherId: student.teacherId,
          section: 'numbers',
          activityId: 'dictation',
          score: 0,
          maxScore: 100,
          isCorrect: false,
          details: { target: currentDictQ.numeral, chosen: chosenNum, independent: false }
        });
        onProgressUpdated(storageService.getStudentProgress(student.id));
      }
    }
  };

  const handleNextDictation = () => {
    setDictIndex(prev => prev + 1);
    setDictSelected(null);
    setDictAttemptCount(0);
    setDictFeedback(null);
    setTimeout(() => {
      audioService.speak(dictationQuestions[(dictIndex + 1) % dictationQuestions.length].spoken);
    }, 300);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header and Back navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBack}
            className="text-xs font-semibold text-slate-500 hover:text-indigo-600 flex items-center gap-1.5 transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Welcome</span>
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Numbers: 0 to 1,000
            </h1>
            {progress.numbersFullMastery && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Mastered
              </span>
            )}
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl text-xs font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab('learn')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'learn' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Learn Numbers
          </button>
          <button
            onClick={() => setActiveTab('recognition')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'recognition' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Number Recognition
          </button>
          <button
            onClick={() => setActiveTab('dictation')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'dictation' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Number Dictation
          </button>
          <button
            onClick={() => setActiveTab('smart-review')}
            className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 ${
              activeTab === 'smart-review' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Smart Review</span>
            {smartReviewNumbers.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-orange-500 text-white text-[10px] flex items-center justify-center font-bold">
                {smartReviewNumbers.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. LEARN NUMBERS                                                          */}
      {/* Groups: Ones, Teens and Tens, Hundreds, One Thousand, Combined Numbers    */}
      {/* Shows numeral + English written name + pronunciation button               */}
      {/* NO mathematical decomposition / expanded form                             */}
      {/* ========================================================================= */}
      {activeTab === 'learn' && (
        <div className="space-y-6">
          {/* Child-Friendly Group Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {numberGroups.map((g) => (
              <button
                key={g.id}
                onClick={() => setSelectedGroupId(g.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedGroupId === g.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {g.title}
              </button>
            ))}
          </div>

          {/* Number Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentGroup.items.map((item) => (
              <div
                key={item.numeral}
                onClick={() => handleSpeak(`${item.numeral}. ${item.words}.`)}
                className="bg-white rounded-2xl border border-indigo-100 p-5 flex items-center justify-between shadow-xs hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 flex items-center justify-center font-mono font-black text-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    {item.numeral}
                  </div>
                  <div>
                    <div className="text-base font-extrabold text-slate-900 font-display capitalize group-hover:text-indigo-600 transition-colors">
                      {item.words}
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium">
                      Tap to listen
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpeak(`${item.numeral}. ${item.words}.`);
                  }}
                  className="p-2.5 rounded-full bg-slate-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-2xs"
                  title="Hear pronunciation"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Action to Practice */}
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setActiveTab('recognition')}
              className="py-3 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xs transition-all cursor-pointer kid-button"
            >
              Start Practice: Number Recognition →
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. PRACTICE A: NUMBER RECOGNITION                                         */}
      {/* See numeral -> choose correctly written English name (4 choices)          */}
      {/* Green on correct, Orange on error (NOT red). 2nd chance then reveal.      */}
      {/* ========================================================================= */}
      {activeTab === 'recognition' && (
        <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 text-center">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span>Question {recIndex + 1}</span>
            <button
              onClick={() => setActiveTab('learn')}
              className="text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Learning</span>
            </button>
          </div>

          {/* Big Numeral Display */}
          <div className="p-8 rounded-3xl bg-indigo-50/70 border border-indigo-200">
            <div className="text-6xl sm:text-7xl font-black text-slate-900 font-mono tracking-tight">
              {currentRecQ.numeral}
            </div>
            <p className="text-xs text-indigo-800 font-semibold mt-2">
              Select the correct written English name:
            </p>
          </div>

          {/* 4 Age-Appropriate Answer Choices */}
          <div className="space-y-3">
            {currentRecQ.options.map((opt) => {
              const isSelected = recSelected === opt;
              const isCorrectOpt = opt === currentRecQ.correct;

              let btnClass = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-indigo-50 hover:border-indigo-300';

              if (recFeedback) {
                if (recFeedback.type === 'correct' && isCorrectOpt) {
                  // Green for correct
                  btnClass = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                } else if (recFeedback.type === 'try-again' && isSelected) {
                  // Orange for 1st incorrect (NOT red!)
                  btnClass = 'bg-amber-50 border-orange-400 text-orange-950 font-bold';
                } else if (recFeedback.type === 'revealed') {
                  if (isCorrectOpt) {
                    btnClass = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                  } else if (isSelected) {
                    btnClass = 'bg-amber-50 border-orange-300 text-orange-900 opacity-70';
                  } else {
                    btnClass = 'bg-slate-50 border-slate-200 text-slate-400 opacity-50';
                  }
                }
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleSelectRecognition(opt)}
                  disabled={recFeedback?.type === 'correct' || recFeedback?.type === 'revealed'}
                  className={`w-full p-4 rounded-2xl border-2 text-base font-bold transition-all cursor-pointer flex items-center justify-between ${btnClass}`}
                >
                  <span className="capitalize">{opt}</span>
                  {recFeedback?.type === 'correct' && isCorrectOpt && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback Banner */}
          {recFeedback && (
            <div
              className={`p-4 rounded-2xl text-xs font-bold ${
                recFeedback.type === 'correct'
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                  : recFeedback.type === 'try-again'
                  ? 'bg-amber-50 border border-orange-300 text-orange-900'
                  : 'bg-indigo-50 border border-indigo-200 text-indigo-900'
              }`}
            >
              {recFeedback.message}
            </div>
          )}

          {/* Next Button */}
          {(recFeedback?.type === 'correct' || recFeedback?.type === 'revealed') && (
            <button
              onClick={handleNextRecognition}
              className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xs transition-all cursor-pointer kid-button"
            >
              Next Number →
            </button>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. PRACTICE B: NUMBER DICTATION                                           */}
      {/* Listen to spoken number -> select NUMERAL from 4 clickable cards          */}
      {/* NO typing required! Replay audio anytime.                                  */}
      {/* ========================================================================= */}
      {activeTab === 'dictation' && (
        <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 text-center">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span>Listening Challenge {dictIndex + 1}</span>
            <button
              onClick={() => setActiveTab('learn')}
              className="text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Learning</span>
            </button>
          </div>

          {/* Audio Speaker Box with Replay Button */}
          <div className="p-8 rounded-3xl bg-indigo-50/70 border border-indigo-200 space-y-3">
            <div className="w-16 h-16 rounded-full bg-indigo-600 text-white mx-auto flex items-center justify-center shadow-md">
              <Headphones className="w-8 h-8" />
            </div>
            <p className="text-xs text-indigo-900 font-bold">
              Listen to the spoken number, then tap the matching card:
            </p>
            <button
              onClick={handlePlayDictationAudio}
              className="py-2.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs inline-flex items-center gap-2 shadow-xs transition-all cursor-pointer kid-button"
            >
              <Volume2 className="w-4 h-4" />
              <span>Listen Again</span>
            </button>
          </div>

          {/* 4 Numeral Option Cards (NO typing!) */}
          <div className="grid grid-cols-2 gap-4">
            {currentDictQ.options.map((num) => {
              const isSelected = dictSelected === num;
              const isCorrect = num === currentDictQ.numeral;

              let btnClass = 'bg-slate-50 border-slate-200 text-slate-900 hover:bg-indigo-50 hover:border-indigo-300';

              if (dictFeedback) {
                if (dictFeedback.type === 'correct' && isCorrect) {
                  btnClass = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                } else if (dictFeedback.type === 'try-again' && isSelected) {
                  btnClass = 'bg-amber-50 border-orange-400 text-orange-950 font-bold';
                } else if (dictFeedback.type === 'revealed') {
                  if (isCorrect) {
                    btnClass = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                  } else if (isSelected) {
                    btnClass = 'bg-amber-50 border-orange-300 text-orange-900 opacity-70';
                  } else {
                    btnClass = 'bg-slate-50 border-slate-200 text-slate-400 opacity-50';
                  }
                }
              }

              return (
                <button
                  key={num}
                  onClick={() => handleSelectDictation(num)}
                  disabled={dictFeedback?.type === 'correct' || dictFeedback?.type === 'revealed'}
                  className={`p-6 rounded-2xl border-2 text-3xl font-black font-mono transition-all cursor-pointer flex items-center justify-center gap-2 ${btnClass}`}
                >
                  <span>{num}</span>
                  {dictFeedback?.type === 'correct' && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback banner */}
          {dictFeedback && (
            <div
              className={`p-4 rounded-2xl text-xs font-bold ${
                dictFeedback.type === 'correct'
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                  : dictFeedback.type === 'try-again'
                  ? 'bg-amber-50 border border-orange-300 text-orange-900'
                  : 'bg-indigo-50 border border-indigo-200 text-indigo-900'
              }`}
            >
              {dictFeedback.message}
            </div>
          )}

          {/* Next Button */}
          {(dictFeedback?.type === 'correct' || dictFeedback?.type === 'revealed') && (
            <button
              onClick={handleNextDictation}
              className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xs transition-all cursor-pointer kid-button"
            >
              Next Spoken Number →
            </button>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. SMART REVIEW                                                           */}
      {/* Automatically collects numbers that needed a second chance                */}
      {/* ========================================================================= */}
      {activeTab === 'smart-review' && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">
                Numbers Smart Review
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Numbers that you recently practiced or needed help with are stored here for focused reinforcement.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('learn')}
              className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Learning</span>
            </button>
          </div>

          {smartReviewNumbers.length === 0 ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <div className="text-sm font-bold text-emerald-950">All Numbers Mastered!</div>
              <p className="text-xs text-emerald-700">
                You have answered all number challenges accurately and independently!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-700">
                Numbers in Review Pool ({smartReviewNumbers.length}):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {smartReviewNumbers.map((num) => {
                  const words = numberToAmericanWords(num);
                  return (
                    <div
                      key={num}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-black text-xl text-indigo-900 w-12 text-center">
                          {num}
                        </span>
                        <span className="text-xs font-bold text-slate-800 capitalize">
                          {words}
                        </span>
                      </div>
                      <button
                        onClick={() => handleSpeak(`${num}. ${words}.`)}
                        className="p-2 rounded-xl bg-white border border-slate-200 text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                        title="Hear pronunciation"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
