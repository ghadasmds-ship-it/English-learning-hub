import React, { useState, useEffect } from 'react';
import { Student, StudentProgress } from '../../../types';
import { MONTHS_DATA } from '../../../data/welcomeUnitData';
import { ILLUSTRATION_MAP } from '../../../data/illustrations';
import { audioService } from '../../../services/audioService';
import { storageService } from '../../../services/storageService';
import {
  Volume2,
  CheckCircle2,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  ArrowRight,
  GripVertical
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MonthsHubProps {
  student: Student;
  progress: StudentProgress;
  onBack: () => void;
  onProgressUpdated: (updated: StudentProgress) => void;
}

export const MonthsHub: React.FC<MonthsHubProps> = ({
  student,
  progress,
  onBack,
  onProgressUpdated
}) => {
  // Two clean views: 'learn' (Learning screen) and 'practice' (Arrange the Months)
  const [activeView, setActiveView] = useState<'learn' | 'practice'>('learn');

  // English pronunciation
  const handleSpeakMonth = (monthName: string) => {
    audioService.speak(monthName);
  };

  // =========================================================================
  // PRACTICE ACTIVITY: ARRANGE THE MONTHS
  // 12 Draggable/Swappable cards directly in sequence (no empty answer boxes)
  // Green for correct, Orange for incorrect
  // =========================================================================
  const correctOrder = MONTHS_DATA.map(m => m.name);
  const [currentSequence, setCurrentSequence] = useState<string[]>([]);
  const [selectedCardIdx, setSelectedCardIdx] = useState<number | null>(null);
  const [draggedCardIdx, setDraggedCardIdx] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Scramble the months initially
  const initPracticeSequence = () => {
    let scrambled = [...correctOrder];
    // Keep scrambling until it's not accidentally already solved
    while (scrambled.every((m, idx) => m === correctOrder[idx])) {
      scrambled = [...correctOrder].sort(() => Math.random() - 0.5);
    }
    setCurrentSequence(scrambled);
    setSelectedCardIdx(null);
    setDraggedCardIdx(null);
    setIsCompleted(false);
  };

  useEffect(() => {
    if (activeView === 'practice') {
      initPracticeSequence();
    }
  }, [activeView]);

  // Swap two cards in the sequence
  const swapCards = (fromIdx: number, toIdx: number) => {
    if (fromIdx === toIdx) return;
    const nextSeq = [...currentSequence];
    const temp = nextSeq[fromIdx];
    nextSeq[fromIdx] = nextSeq[toIdx];
    nextSeq[toIdx] = temp;
    setCurrentSequence(nextSeq);
    setSelectedCardIdx(null);
    setDraggedCardIdx(null);
    audioService.playStarPop();

    // Check if fully in chronological order
    const allCorrect = nextSeq.every((m, idx) => m === correctOrder[idx]);
    if (allCorrect) {
      setIsCompleted(true);
      audioService.playGrandFanfare();
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });

      storageService.recordLearningAttempt({
        studentId: student.id,
        classId: student.classId,
        teacherId: student.teacherId,
        section: 'months',
        activityId: 'order',
        score: 100,
        maxScore: 100,
        isCorrect: true,
        details: { sequence: nextSeq }
      });
      onProgressUpdated(storageService.getStudentProgress(student.id));
    }
  };

  // Card click/tap logic (support mobile touch and keyboard)
  const handleCardClick = (idx: number) => {
    if (isCompleted) return;

    if (selectedCardIdx === null) {
      // Select this card to move
      setSelectedCardIdx(idx);
    } else if (selectedCardIdx === idx) {
      // Deselect
      setSelectedCardIdx(null);
    } else {
      // Swap selected card with this card
      swapCards(selectedCardIdx, idx);
    }
  };

  // HTML5 Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent, idx: number) => {
    if (isCompleted) return;
    setDraggedCardIdx(idx);
    e.dataTransfer.setData('text/plain', idx.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIdx: number) => {
    e.preventDefault();
    if (draggedCardIdx !== null && draggedCardIdx !== targetIdx) {
      swapCards(draggedCardIdx, targetIdx);
    }
  };

  const correctCount = currentSequence.filter((m, idx) => m === correctOrder[idx]).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header and Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBack}
            className="text-xs font-semibold text-slate-500 hover:text-sky-600 flex items-center gap-1.5 transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Welcome</span>
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Months of the Year
            </h1>
            {progress.monthsSequenceMastered && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Mastered
              </span>
            )}
          </div>
        </div>

        {/* View Toggle / Navigation */}
        <div className="flex items-center gap-2">
          {activeView === 'learn' ? (
            <button
              onClick={() => setActiveView('practice')}
              className="py-2.5 px-5 rounded-xl bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer kid-button"
            >
              <span>Practice: Arrange the Months</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setActiveView('learn')}
              className="py-2.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Learning</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SCREEN 1: LEARNING SCREEN                                                 */}
      {/* All 12 months together on ONE screen in chronological order (Jan to Dec)  */}
      {/* English name + seasonal atmosphere cartoon + click-to-pronounce           */}
      {/* NO numbers, NO written season explanations, NO descriptions               */}
      {/* ========================================================================= */}
      {activeView === 'learn' && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {MONTHS_DATA.map((month) => {
              const MonthCueIcon = ILLUSTRATION_MAP[month.illustrationKey];
              return (
                <div
                  key={month.name}
                  onClick={() => handleSpeakMonth(month.name)}
                  className="bg-white rounded-3xl border border-sky-100 p-6 flex flex-col items-center justify-between text-center shadow-xs hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group hover:border-sky-300"
                >
                  {/* English Name ONLY */}
                  <h3 className="text-xl font-extrabold text-slate-900 font-display group-hover:text-sky-600 transition-colors mb-3">
                    {month.name}
                  </h3>

                  {/* Attractive Cartoon Illustration Representing Typical Seasonal Atmosphere */}
                  <div className="w-20 h-20 mb-4 flex items-center justify-center transition-transform group-hover:scale-110">
                    {MonthCueIcon ? <MonthCueIcon className="w-full h-full drop-shadow-xs" /> : null}
                  </div>

                  {/* Click-to-play English pronunciation */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeakMonth(month.name);
                    }}
                    className="p-2.5 rounded-full bg-sky-50 text-sky-600 group-hover:bg-sky-500 group-hover:text-white transition-all shadow-2xs cursor-pointer"
                    title={`Hear pronunciation of ${month.name}`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Direct CTA to Practice */}
          <div className="flex justify-center pt-2">
            <button
              onClick={() => setActiveView('practice')}
              className="py-3.5 px-8 rounded-2xl bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white font-bold text-sm shadow-md shadow-sky-600/20 transition-all kid-button cursor-pointer flex items-center gap-2"
            >
              <span>Ready to Practice? Arrange the Months</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN 2: ONLY ONE PRACTICE ACTIVITY: ARRANGE THE MONTHS                  */}
      {/* 12 month-name cards on one screen in scrambled order                      */}
      {/* Draggable/tappable directly in sequence - NO empty answer boxes           */}
      {/* Correct = Green, Incorrect = Orange (NOT red)                             */}
      {/* Encouraging feedback ("Great job!" / "Try again!")                        */}
      {/* Allows correcting individual mistakes without restarting                  */}
      {/* Touchscreen & mouse dragging support + Back to Learning button            */}
      {/* ========================================================================= */}
      {activeView === 'practice' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">
                Arrange the Months
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Drag or tap to swap cards into chronological sequence from January to December.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={initPracticeSequence}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Shuffle Again</span>
              </button>

              <button
                onClick={() => setActiveView('learn')}
                className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 transition-colors cursor-pointer"
              >
                <span>Back to Learning</span>
              </button>
            </div>
          </div>

          {/* Feedback banner */}
          <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div className="flex items-center gap-2">
              {isCompleted ? (
                <span className="font-extrabold text-emerald-700 flex items-center gap-1.5 text-sm">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Great job! All 12 months are in the correct chronological order!
                </span>
              ) : correctCount > 0 ? (
                <span className="font-bold text-orange-700">
                  Try again! {correctCount} of 12 months in position. Swap the orange cards into place!
                </span>
              ) : (
                <span className="text-slate-600">
                  Tap any card to select it, then tap another card to swap their positions.
                </span>
              )}
            </div>

            <div className="font-mono font-bold text-slate-700 text-xs shrink-0">
              {correctCount} / 12 Correct
            </div>
          </div>

          {/* 12 Draggable/Swappable Cards directly on screen (NO empty answer boxes) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentSequence.map((monthName, idx) => {
              const isCorrectPosition = monthName === correctOrder[idx];
              const isSelected = selectedCardIdx === idx;

              // Color requirements:
              // Correct placements turn green (#10B981)
              // Incorrect placements turn orange (#F97316), NOT red!
              let cardClasses = '';
              if (isCorrectPosition) {
                cardClasses = 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-xs ring-1 ring-emerald-300';
              } else {
                cardClasses = 'bg-amber-50/80 border-orange-300 text-orange-950 hover:border-orange-400';
              }

              if (isSelected) {
                cardClasses += ' ring-3 ring-sky-500 scale-102';
              }

              return (
                <div
                  key={`${monthName}-${idx}`}
                  draggable={!isCompleted}
                  onDragStart={(e) => handleDragStart(e, idx)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, idx)}
                  onClick={() => handleCardClick(idx)}
                  className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer select-none ${cardClasses} active:scale-98`}
                >
                  <div className="flex items-center gap-3">
                    <GripVertical className={`w-4 h-4 ${isCorrectPosition ? 'text-emerald-400' : 'text-orange-400'}`} />
                    <span className="text-base font-extrabold font-display">
                      {monthName}
                    </span>
                  </div>

                  {isCorrectPosition ? (
                    <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                      ✓
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-orange-600 bg-orange-100/70 px-2 py-0.5 rounded-md">
                      Swap
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Encouraging completion message */}
          {isCompleted && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-center space-y-3">
              <div className="text-lg font-extrabold text-emerald-900 font-display">
                🎉 Great job! Perfect 12-Month Sequence!
              </div>
              <p className="text-xs text-emerald-700">
                You correctly arranged all 12 months from January to December!
              </p>
              <div className="flex justify-center gap-3 pt-1">
                <button
                  onClick={() => setActiveView('learn')}
                  className="py-2.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-all kid-button cursor-pointer"
                >
                  Back to Learning
                </button>
                <button
                  onClick={initPracticeSequence}
                  className="py-2.5 px-6 rounded-xl bg-white border border-emerald-300 text-emerald-800 font-bold text-xs hover:bg-emerald-50 transition-all cursor-pointer"
                >
                  Practice Again
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
