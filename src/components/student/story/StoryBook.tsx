import React, { useState, useEffect } from 'react';
import { Student, StudentProgress } from '../../../types';
import { STORY_PAGES } from '../../../data/welcomeUnitData';
import { StorySceneIllustration, GoldStoryMasterTrophy } from '../../../data/illustrations';
import { audioService } from '../../../services/audioService';
import { speechService, SpeechAssessmentResult } from '../../../services/speechRecognitionService';
import { storageService } from '../../../services/storageService';
import {
  Volume2,
  Mic,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  StopCircle,
  AlertCircle,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface StoryBookProps {
  student: Student;
  progress: StudentProgress;
  onBack: () => void;
  onProgressUpdated: (updated: StudentProgress) => void;
}

export const StoryBook: React.FC<StoryBookProps> = ({
  student,
  progress,
  onBack,
  onProgressUpdated
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const currentPage = STORY_PAGES[currentPageIndex];

  // Read-along synchronized word tracking
  const [isReadingAlong, setIsReadingAlong] = useState(false);
  const [currentSpokenWordIndex, setCurrentSpokenWordIndex] = useState<number | null>(null);

  // Recording & Genuine Speech Assessment state
  const [isRecording, setIsRecording] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState<string>('');
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const [readingResult, setReadingResult] = useState<SpeechAssessmentResult | null>(null);

  // Stop audio and recording when page changes
  useEffect(() => {
    audioService.stop();
    speechService.stopRecording();
    setIsReadingAlong(false);
    setCurrentSpokenWordIndex(null);
    setIsRecording(false);
    setLiveTranscript('');
    setRecordingError(null);
    setReadingResult(null);
  }, [currentPageIndex]);

  // Clean word for tapping single word
  const handleTapWordAudio = (rawWord: string) => {
    const clean = rawWord.replace(/[^a-zA-Z0-9]/g, '');
    if (clean) audioService.speak(clean);
  };

  // Synchronized Read-Along: Spoken word-by-word tracking
  const handlePlayPageAudio = () => {
    if (isReadingAlong) {
      audioService.stop();
      setIsReadingAlong(false);
      setCurrentSpokenWordIndex(null);
      return;
    }

    setIsReadingAlong(true);
    setCurrentSpokenWordIndex(0);

    audioService.speak(
      currentPage.text,
      () => {
        setIsReadingAlong(false);
        setCurrentSpokenWordIndex(null);
      },
      0.82, // Age-appropriate steady reading rate
      (wordIdx) => {
        setCurrentSpokenWordIndex(wordIdx);
      }
    );
  };

  // Genuine Speech Recording with Web Speech API
  const handleStartPageRecording = async () => {
    audioService.stop();
    setIsReadingAlong(false);
    setRecordingError(null);
    setReadingResult(null);
    setLiveTranscript('');
    setIsRecording(true);

    try {
      await speechService.startRecording(
        currentPage.text,
        (result) => {
          setIsRecording(false);
          setReadingResult(result);

          if (result.isAvailable && result.overallScore >= 70) {
            audioService.playSuccessChime();
          } else if (result.isAvailable) {
            audioService.playEncouragingTone();
          }

          if (result.isAvailable) {
            const res = storageService.recordLearningAttempt({
              studentId: student.id,
              classId: student.classId,
              teacherId: student.teacherId,
              section: 'story',
              activityId: `page_${currentPage.pageNumber}`,
              score: result.overallScore,
              maxScore: 100,
              isCorrect: result.overallScore >= 70,
              flaggedForTeacherReview: false,
              details: {
                pageNumber: currentPage.pageNumber,
                transcript: result.transcript,
                accuracy: result.accuracyScore
              }
            });

            // Check if Story Master Trophy was genuinely earned (all 5 pages read >= 70)
            if (res.newAchievements.includes('story_master')) {
              audioService.playGrandFanfare();
              confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
            }

            onProgressUpdated(storageService.getStudentProgress(student.id));
          }
        },
        (errMsg) => {
          setIsRecording(false);
          setRecordingError(errMsg);
        },
        (interim) => {
          setLiveTranscript(interim);
        }
      );
    } catch (e: any) {
      setIsRecording(false);
      setRecordingError('Microphone could not be started.');
    }
  };

  const handleStopPageRecording = () => {
    speechService.stopRecording();
    setIsRecording(false);
  };

  // Flatten words across text to map to global word index for synchronized highlighting
  const allStoryWords = currentPage.text.split(/\s+/).filter(Boolean);

  // Render paragraphs with interactive words and synchronized highlighting
  const renderInteractiveStoryText = () => {
    const paragraphs = currentPage.text.split('\n\n');
    let globalWordCounter = 0;

    return (
      <div className="space-y-4">
        {paragraphs.map((p, pIdx) => {
          const tokens = p.split(/\s+/).filter(Boolean);

          return (
            <p key={pIdx} className="text-lg sm:text-xl text-slate-800 leading-relaxed font-display">
              {tokens.map((token, tIdx) => {
                const wordIndex = globalWordCounter++;
                const isCurrentlySpoken = isReadingAlong && currentSpokenWordIndex === wordIndex;

                const match = token.match(/^([^a-zA-Z0-9]*)(.*?)([^a-zA-Z0-9]*)$/);
                const leading = match ? match[1] : '';
                const core = match ? match[2] : token;
                const trailing = match ? match[3] : '';

                return (
                  <span key={tIdx} className="inline-block mr-1.5 my-0.5">
                    {leading && <span className="text-slate-700">{leading}</span>}
                    <button
                      type="button"
                      onClick={() => handleTapWordAudio(core)}
                      title={`Tap to hear "${core}"`}
                      className={`inline-block px-1.5 py-0.5 rounded-lg transition-all cursor-pointer font-medium active:scale-95 ${
                        isCurrentlySpoken
                          ? 'bg-amber-300 text-amber-950 font-black shadow-sm scale-105 ring-2 ring-amber-400'
                          : 'text-slate-800 hover:bg-rose-50 hover:text-rose-700'
                      }`}
                    >
                      {core}
                    </button>
                    {trailing && <span className="text-slate-700">{trailing}</span>}
                  </span>
                );
              })}
            </p>
          );
        })}
      </div>
    );
  };

  const isStoryMaster = progress.storyMasterTrophyAwarded;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBack}
            className="text-xs font-semibold text-slate-500 hover:text-rose-600 flex items-center gap-1.5 transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Welcome</span>
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Mona’s Fun Festival
            </h1>
          </div>
        </div>

        {/* Prestigious Trophy Showcase */}
        <div
          className={`p-3 rounded-2xl border flex items-center gap-3 transition-all ${
            isStoryMaster
              ? 'bg-amber-50 border-amber-300 shadow-sm'
              : 'bg-slate-50 border-slate-200 opacity-80'
          }`}
        >
          <div className="w-10 h-12 shrink-0">
            <GoldStoryMasterTrophy />
          </div>
          <div className="text-left">
            <div className="text-xs font-extrabold text-slate-900 leading-tight">
              {isStoryMaster ? 'Gold Story Master Trophy Earned! 🏆' : 'Gold Story Trophy'}
            </div>
            <div className="text-[11px] text-slate-500">
              {isStoryMaster
                ? 'All 5 pages read and verified with genuine fluency'
                : 'Read all 5 pages out loud to earn'}
            </div>
          </div>
        </div>
      </div>

      {/* Picture Book Frame with Consistent Story Scene Illustration */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
        {/* Left: Consistent Mona Story Illustration */}
        <div className="md:w-1/2 p-6 bg-slate-50/60 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-100">
          <div className="w-full max-w-md aspect-[16/10] rounded-2xl overflow-hidden shadow-xs border border-slate-200 bg-white">
            <StorySceneIllustration pageNumber={currentPage.pageNumber} className="w-full h-full" />
          </div>
        </div>

        {/* Right: Interactive Text (Word-by-word read-along) & Controls */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                Page {currentPage.pageNumber} of {STORY_PAGES.length}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                {currentPage.title}
              </span>
            </div>

            {/* Formatted Text with Synchronized Read-Along Highlighting */}
            {renderInteractiveStoryText()}
          </div>

          {/* Audio Narration and Real Voice Recording */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-2">
              {/* Synchronized Listen to Page button */}
              <button
                onClick={handlePlayPageAudio}
                className={`py-2.5 px-4 rounded-xl font-bold text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer ${
                  isReadingAlong
                    ? 'bg-amber-500 hover:bg-amber-600 text-white animate-pulse'
                    : 'bg-rose-600 hover:bg-rose-500 text-white kid-button'
                }`}
              >
                <Volume2 className="w-4 h-4" />
                <span>{isReadingAlong ? 'Stop Listening' : 'Listen to Page'}</span>
              </button>

              {/* Genuine Voice Recording controls */}
              {!isRecording ? (
                <button
                  onClick={handleStartPageRecording}
                  className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Mic className="w-4 h-4 text-rose-600" />
                  <span>Record Myself Reading</span>
                </button>
              ) : (
                <button
                  onClick={handleStopPageRecording}
                  className="py-2.5 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center gap-2 animate-pulse cursor-pointer"
                >
                  <StopCircle className="w-4 h-4 text-red-500" />
                  <span>Stop &amp; Assess Reading</span>
                </button>
              )}
            </div>

            {/* Live recording indicator */}
            {isRecording && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs space-y-1.5">
                <div className="flex items-center gap-2 text-rose-900 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                  <span>Listening... Read the page out loud clearly into your microphone!</span>
                </div>
                {liveTranscript && (
                  <div className="text-slate-600 italic bg-white/70 p-2 rounded-lg font-mono text-[11px]">
                    &quot;{liveTranscript}&quot;
                  </div>
                )}
              </div>
            )}

            {/* Error banner if mic fails or permission denied */}
            {recordingError && (
              <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-200 text-xs text-orange-900 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-orange-600 shrink-0" />
                <span>{recordingError}</span>
              </div>
            )}

            {/* Genuine Speech Assessment Feedback (No fake scores!) */}
            {readingResult && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-left space-y-2">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Reading Assessment:</span>
                  {readingResult.isAvailable ? (
                    <span className="font-mono text-sm px-2.5 py-0.5 rounded-lg bg-white border border-slate-200 text-indigo-700">
                      Score: {readingResult.overallScore}%
                    </span>
                  ) : (
                    <span className="text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md text-[11px]">
                      Assessment Unavailable
                    </span>
                  )}
                </div>

                <p className="text-slate-700">
                  {readingResult.feedback}
                </p>

                {readingResult.transcript && (
                  <div className="text-[11px] text-slate-500">
                    Recognized speech: <span className="font-semibold text-slate-800">&quot;{readingResult.transcript}&quot;</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Page Navigation */}
      <div className="flex items-center justify-between pt-2">
        <button
          disabled={currentPageIndex === 0}
          onClick={() => {
            setCurrentPageIndex(prev => Math.max(0, prev - 1));
          }}
          className="py-2.5 px-5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Page</span>
        </button>

        <div className="flex items-center gap-2">
          {STORY_PAGES.map((p, idx) => (
            <button
              key={p.pageNumber}
              onClick={() => {
                setCurrentPageIndex(idx);
              }}
              className={`w-8 h-8 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                currentPageIndex === idx
                  ? 'bg-rose-600 text-white shadow-xs scale-110'
                  : progress.storyPagesRead.includes(p.pageNumber)
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              {p.pageNumber}
            </button>
          ))}
        </div>

        <button
          disabled={currentPageIndex === STORY_PAGES.length - 1}
          onClick={() => {
            setCurrentPageIndex(prev => Math.min(STORY_PAGES.length - 1, prev + 1));
          }}
          className="py-2.5 px-5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5 cursor-pointer"
        >
          <span>Next Page</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
