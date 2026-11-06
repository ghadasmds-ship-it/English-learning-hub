import React from 'react';
import { Student, ClassRoom, StudentProgress } from '../../types';
import { ArrowLeft, ArrowRight, Award, CheckCircle2, RotateCcw } from 'lucide-react';
import {
  SectionIconMonths,
  SectionIconNumbers,
  SectionIconVocabulary,
  SectionIconStory
} from '../../data/illustrations';

interface UnitOverviewProps {
  student: Student;
  classRoom: ClassRoom;
  progress: StudentProgress;
  onBackToUnits: () => void;
  onSelectSection: (section: 'months' | 'numbers' | 'vocabulary' | 'story' | 'review' | 'quiz') => void;
}

export const UnitOverview: React.FC<UnitOverviewProps> = ({
  student,
  classRoom,
  progress,
  onBackToUnits,
  onSelectSection
}) => {
  // 4 Primary Learning Sections (Clean cards: ONLY Icon + Section Title)
  const sections = [
    {
      id: 'months' as const,
      title: 'Months of the Year',
      Illustration: SectionIconMonths,
      bgColor: 'bg-sky-50/70 hover:bg-sky-50 border-sky-200',
      isMastered: progress.monthsSequenceMastered
    },
    {
      id: 'numbers' as const,
      title: 'Numbers',
      Illustration: SectionIconNumbers,
      bgColor: 'bg-indigo-50/70 hover:bg-indigo-50 border-indigo-200',
      isMastered: progress.numbersFullMastery
    },
    {
      id: 'vocabulary' as const,
      title: 'My Vocabulary',
      Illustration: SectionIconVocabulary,
      bgColor: 'bg-amber-50/70 hover:bg-amber-50 border-amber-200',
      isMastered: Object.values(progress.wordMastery || {}).filter(w => w.mastered).length >= 18
    },
    {
      id: 'story' as const,
      title: 'Story Time',
      Illustration: SectionIconStory,
      bgColor: 'bg-rose-50/70 hover:bg-rose-50 border-rose-200',
      isMastered: progress.storyMasterTrophyAwarded
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header and Back navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBackToUnits}
            className="text-xs font-semibold text-slate-500 hover:text-sky-600 flex items-center gap-1.5 transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Units</span>
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Welcome
            </h1>
          </div>
        </div>
      </div>

      {/* 4 Primary Learning Section Cards - ONLY Meaningful Cartoon Icon + Section Title */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sections.map((sec) => {
          const SecIllustration = sec.Illustration;
          return (
            <div
              key={sec.id}
              onClick={() => onSelectSection(sec.id)}
              className={`rounded-3xl border ${sec.bgColor} p-8 flex flex-col items-center justify-center text-center transition-all bg-white shadow-xs hover:shadow-lg hover:-translate-y-1.5 cursor-pointer group relative`}
            >
              {/* Optional small mastery check badge */}
              {sec.isMastered && (
                <span className="absolute top-4 right-4 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Done</span>
                </span>
              )}

              {/* One clear meaningful cartoon icon */}
              <div className="w-32 h-32 mb-5 flex items-center justify-center transition-transform group-hover:scale-105">
                <SecIllustration className="w-full h-full drop-shadow-xs" />
              </div>

              {/* ONLY The Section Title */}
              <h3 className="text-xl font-extrabold text-slate-900 font-display group-hover:text-sky-600 transition-colors">
                {sec.title}
              </h3>
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* Sections 6 & 7: Unit Review & Final Unit Quiz                             */}
      {/* ========================================================================= */}
      <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Unit Review Card */}
        <div
          onClick={() => onSelectSection('review')}
          className="rounded-3xl border border-sky-200 bg-gradient-to-r from-sky-50 to-indigo-50/40 p-6 flex items-center justify-between shadow-xs hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
              <RotateCcw className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-slate-900 font-display group-hover:text-sky-700 transition-colors">
                  Unit Review
                </h3>
                {progress.unitReviewCompleted && (
                  <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md text-[10px] font-bold">
                    Completed
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Practice months, numbers, vocabulary, and story skills before the final quiz.
              </p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-sky-600 shrink-0 group-hover:translate-x-1 transition-transform ml-2" />
        </div>

        {/* Final Unit Quiz Button / Card */}
        <div
          onClick={() => onSelectSection('quiz')}
          className="rounded-3xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50/40 p-6 flex items-center justify-between shadow-xs hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-slate-900 font-display group-hover:text-indigo-700 transition-colors">
                  Final Unit Quiz
                </h3>
                {progress.finalQuizScore !== undefined && (
                  <span className="text-indigo-800 bg-indigo-100 px-2.5 py-0.5 rounded-md text-[11px] font-bold font-mono">
                    {progress.finalQuizScore}%
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Official assessment of months, numbers, vocabulary, and Mona’s story.
              </p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-indigo-600 shrink-0 group-hover:translate-x-1 transition-transform ml-2" />
        </div>
      </div>
    </div>
  );
};
