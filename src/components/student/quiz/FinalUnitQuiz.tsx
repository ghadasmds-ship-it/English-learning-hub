import React, { useState } from 'react';
import { Student, StudentProgress } from '../../../types';
import { audioService } from '../../../services/audioService';
import { storageService } from '../../../services/storageService';
import {
  Volume2,
  CheckCircle2,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Award,
  Calendar,
  Hash,
  BookOpen,
  MessageSquare,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface FinalUnitQuizProps {
  student: Student;
  progress: StudentProgress;
  onBack: () => void;
  onProgressUpdated: (updated: StudentProgress) => void;
}

interface QuizItem {
  id: number;
  skill: 'months' | 'numbers' | 'vocabulary' | 'story';
  skillName: string;
  question: string;
  audioPrompt?: string;
  options: string[];
  correct: string;
}

export const FinalUnitQuiz: React.FC<FinalUnitQuizProps> = ({
  student,
  progress,
  onBack,
  onProgressUpdated
}) => {
  const quizItems: QuizItem[] = [
    // 1 & 2: Months Sequence
    {
      id: 1,
      skill: 'months',
      skillName: 'Months Sequence',
      question: 'Which month comes immediately after April?',
      options: ['May', 'March', 'June', 'July'],
      correct: 'May'
    },
    {
      id: 2,
      skill: 'months',
      skillName: 'Months Sequence',
      question: 'What is the very first month of the calendar year?',
      options: ['January', 'February', 'December', 'March'],
      correct: 'January'
    },
    // 3 & 4: Number Recognition
    {
      id: 3,
      skill: 'numbers',
      skillName: 'Number Reading',
      question: 'Which is the correct written English name for 308?',
      options: [
        'three hundred eight',
        'three hundred eighty',
        'three hundred eighteen',
        'thirty-eight'
      ],
      correct: 'three hundred eight'
    },
    {
      id: 4,
      skill: 'numbers',
      skillName: 'Number Reading',
      question: 'Which numeral corresponds to "one thousand"?',
      options: ['1000', '100', '10000', '10'],
      correct: '1000'
    },
    // 5: Listening to Numbers
    {
      id: 5,
      skill: 'numbers',
      skillName: 'Listening to Numbers',
      question: 'Listen to the audio. Which numeral was spoken?',
      audioPrompt: 'four hundred seventy',
      options: ['470', '417', '740', '407'],
      correct: '470'
    },
    // 6 & 7: Vocabulary Recognition & Meaning
    {
      id: 6,
      skill: 'vocabulary',
      skillName: 'Vocabulary Meaning',
      question: 'What is the Arabic meaning of the English word "Calendar"?',
      options: ['تقويم / روزنامة', 'مهرجان', 'كتاب مصور', 'جبل'],
      correct: 'تقويم / روزنامة'
    },
    {
      id: 7,
      skill: 'vocabulary',
      skillName: 'Vocabulary Recognition',
      question: 'Which word means waking up or arriving before time?',
      options: ['early', 'late', 'ago', 'tired'],
      correct: 'early'
    },
    // 8: Vocabulary Listening
    {
      id: 8,
      skill: 'vocabulary',
      skillName: 'Vocabulary Listening',
      question: 'Listen to the audio. Which word is spoken?',
      audioPrompt: 'festival',
      options: ['festival', 'calendar', 'rainbow', 'mountain'],
      correct: 'festival'
    },
    // 9 & 10: Mona's Fun Festival Comprehension
    {
      id: 9,
      skill: 'story',
      skillName: 'Story Comprehension',
      question: 'What date did Mona check on her calendar for the school festival?',
      options: ['May 10', 'June 1', 'April 5', 'July 15'],
      correct: 'May 10'
    },
    {
      id: 10,
      skill: 'story',
      skillName: 'Story Comprehension',
      question: 'What did Mona’s friend say to encourage her during the lion puppet show?',
      options: [
        '“Have no fear, Mona!”',
        '“Time to go home!”',
        '“Check the calendar!”',
        '“Look at the snail!”'
      ],
      correct: '“Have no fear, Mona!”'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [skillBreakdown, setSkillBreakdown] = useState<Record<string, { correct: number; total: number }>>({});

  const currentItem = quizItems[currentIndex];

  const handleSelectAnswer = (option: string) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentItem.id]: option
    }));
  };

  const handlePlayPromptAudio = () => {
    if (currentItem.audioPrompt) {
      audioService.speak(currentItem.audioPrompt);
    }
  };

  const handleSubmitQuiz = () => {
    // Check answered count
    const answeredCount = Object.keys(selectedAnswers).length;
    if (answeredCount < quizItems.length) {
      const confirmSubmit = window.confirm(
        `You have answered ${answeredCount} of ${quizItems.length} questions. Submit anyway?`
      );
      if (!confirmSubmit) return;
    }

    // Calculate score
    let scoreCount = 0;
    const breakdown: Record<string, { correct: number; total: number }> = {
      months: { correct: 0, total: 0 },
      numbers: { correct: 0, total: 0 },
      vocabulary: { correct: 0, total: 0 },
      story: { correct: 0, total: 0 }
    };

    quizItems.forEach(item => {
      breakdown[item.skill].total += 1;
      const studentAnswer = selectedAnswers[item.id];
      if (studentAnswer && studentAnswer.toLowerCase() === item.correct.toLowerCase()) {
        scoreCount += 1;
        breakdown[item.skill].correct += 1;
      }
    });

    const finalPercent = Math.round((scoreCount / quizItems.length) * 100);
    setQuizScore(finalPercent);
    setSkillBreakdown(breakdown);
    setIsSubmitted(true);

    if (finalPercent >= 70) {
      audioService.playGrandFanfare();
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    } else {
      audioService.playEncouragingTone();
    }

    // Record quiz attempt to storage
    storageService.recordLearningAttempt({
      studentId: student.id,
      classId: student.classId,
      teacherId: student.teacherId,
      section: 'quiz',
      activityId: 'welcome_unit_final_quiz',
      score: finalPercent,
      maxScore: 100,
      isCorrect: finalPercent >= 70,
      details: {
        totalQuestions: quizItems.length,
        correctCount: scoreCount,
        breakdown: {
          months: Math.round((breakdown.months.correct / breakdown.months.total) * 100),
          numbers: Math.round((breakdown.numbers.correct / breakdown.numbers.total) * 100),
          vocabulary: Math.round((breakdown.vocabulary.correct / breakdown.vocabulary.total) * 100),
          story: Math.round((breakdown.story.correct / breakdown.story.total) * 100)
        }
      }
    });

    onProgressUpdated(storageService.getStudentProgress(student.id));
  };

  const handleRetakeQuiz = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIndex(0);
    setQuizScore(0);
  };

  const answeredTotal = Object.keys(selectedAnswers).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
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
              Final Unit Quiz
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800">
              Welcome Pilot Assessment
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Assess your knowledge across months, numbers, vocabulary, and Mona’s story.
          </p>
        </div>

        {progress.finalQuizScore !== undefined && (
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-indigo-50 border border-indigo-200 shadow-2xs">
            <Award className="w-5 h-5 text-indigo-600" />
            <div>
              <div className="text-xs font-bold text-indigo-950">High Score: {progress.finalQuizScore}%</div>
              <div className="text-[11px] text-indigo-700">
                {progress.finalQuizPassed ? 'Passed with Star Mastery' : 'Practice & Retake'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* QUIZ INTERFACE OR RESULTS */}
      {!isSubmitted ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          {/* Question Counter Bar */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs">
            <span className="font-bold text-indigo-600 uppercase tracking-wider">
              {currentItem.skillName}
            </span>
            <span className="font-semibold text-slate-400">
              Question {currentIndex + 1} of {quizItems.length} ({answeredTotal} Answered)
            </span>
          </div>

          {/* Question Prompt */}
          <div className="space-y-3 py-2 text-center">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
              {currentItem.question}
            </h2>

            {/* Audio Button for listening questions */}
            {currentItem.audioPrompt && (
              <button
                type="button"
                onClick={handlePlayPromptAudio}
                className="py-2.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs inline-flex items-center gap-2 shadow-xs transition-all cursor-pointer kid-button"
              >
                <Volume2 className="w-4 h-4" />
                <span>Play Spoken Audio</span>
              </button>
            )}
          </div>

          {/* 4 Clickable Answer Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            {currentItem.options.map((opt) => {
              const isSelected = selectedAnswers[currentItem.id] === opt;
              return (
                <button
                  key={opt}
                  onClick={() => handleSelectAnswer(opt)}
                  className={`p-4 rounded-2xl border-2 text-base font-bold transition-all cursor-pointer flex items-center justify-between text-left ${
                    isSelected
                      ? 'bg-indigo-50 border-indigo-600 text-indigo-950 shadow-xs ring-1 ring-indigo-500'
                      : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <span>{opt}</span>
                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              className="py-2.5 px-5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {/* Question Quick-Selector Dots */}
            <div className="hidden sm:flex items-center gap-1.5">
              {quizItems.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-7 h-7 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                    currentIndex === idx
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : selectedAnswers[item.id]
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {item.id}
                </button>
              ))}
            </div>

            {currentIndex < quizItems.length - 1 ? (
              <button
                onClick={() => setCurrentIndex(prev => Math.min(quizItems.length - 1, prev + 1))}
                className="py-2.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer kid-button"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                className="py-2.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-1.5 cursor-pointer kid-button"
              >
                <span>Submit Final Quiz</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* RESULTS SCREEN */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-8 text-center">
          <div className="space-y-3">
            <div className="w-20 h-20 rounded-full bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center shadow-inner">
              <Award className="w-10 h-10" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display">
              {quizScore >= 90
                ? 'Outstanding Achievement! 🌟'
                : quizScore >= 70
                ? 'Great Job! Quiz Passed! 🎉'
                : 'Keep Practicing! 💪'}
            </h2>

            <div className="text-6xl font-black text-indigo-600 font-mono tracking-tight">
              {quizScore}%
            </div>

            <p className="text-sm text-slate-600 max-w-md mx-auto">
              {quizScore >= 70
                ? 'You have demonstrated strong understanding of the Welcome Unit learning objectives!'
                : 'Review the areas below and take another attempt to improve your mastery score.'}
            </p>
          </div>

          {/* Skill-Level Strengths & Weaknesses Breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-sky-800">
                <Calendar className="w-4 h-4" />
                <span>Months Order</span>
              </div>
              <div className="text-2xl font-black text-slate-900 mt-2 font-mono">
                {skillBreakdown.months ? Math.round((skillBreakdown.months.correct / skillBreakdown.months.total) * 100) : 0}%
              </div>
              <div className="text-[11px] text-slate-500">
                {skillBreakdown.months?.correct} of {skillBreakdown.months?.total} correct
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-800">
                <Hash className="w-4 h-4" />
                <span>Numbers 0-1,000</span>
              </div>
              <div className="text-2xl font-black text-slate-900 mt-2 font-mono">
                {skillBreakdown.numbers ? Math.round((skillBreakdown.numbers.correct / skillBreakdown.numbers.total) * 100) : 0}%
              </div>
              <div className="text-[11px] text-slate-500">
                {skillBreakdown.numbers?.correct} of {skillBreakdown.numbers?.total} correct
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                <BookOpen className="w-4 h-4" />
                <span>Vocabulary</span>
              </div>
              <div className="text-2xl font-black text-slate-900 mt-2 font-mono">
                {skillBreakdown.vocabulary ? Math.round((skillBreakdown.vocabulary.correct / skillBreakdown.vocabulary.total) * 100) : 0}%
              </div>
              <div className="text-[11px] text-slate-500">
                {skillBreakdown.vocabulary?.correct} of {skillBreakdown.vocabulary?.total} correct
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
                <MessageSquare className="w-4 h-4" />
                <span>Story Time</span>
              </div>
              <div className="text-2xl font-black text-slate-900 mt-2 font-mono">
                {skillBreakdown.story ? Math.round((skillBreakdown.story.correct / skillBreakdown.story.total) * 100) : 0}%
              </div>
              <div className="text-[11px] text-slate-500">
                {skillBreakdown.story?.correct} of {skillBreakdown.story?.total} correct
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={handleRetakeQuiz}
              className="py-3 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>
            <button
              onClick={onBack}
              className="py-3 px-8 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xs transition-all cursor-pointer kid-button"
            >
              Back to Welcome Unit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
