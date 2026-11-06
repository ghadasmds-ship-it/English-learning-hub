import React, { useState } from 'react';
import { Student, StudentProgress } from '../../../types';
import { audioService } from '../../../services/audioService';
import { storageService } from '../../../services/storageService';
import {
  ArrowLeft,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  ArrowRight,
  BookOpen,
  Calendar,
  Hash,
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface UnitReviewProps {
  student: Student;
  progress: StudentProgress;
  onBack: () => void;
  onStartFinalQuiz: () => void;
  onProgressUpdated: (updated: StudentProgress) => void;
}

interface ReviewQuestion {
  id: string;
  category: 'months' | 'numbers' | 'vocabulary' | 'story';
  categoryLabel: string;
  icon: any;
  prompt: string;
  options: string[];
  correct: string;
  explanation: string;
}

export const UnitReview: React.FC<UnitReviewProps> = ({
  student,
  progress,
  onBack,
  onStartFinalQuiz,
  onProgressUpdated
}) => {
  const reviewQuestions: ReviewQuestion[] = [
    // 1. Month Sequencing
    {
      id: 'rev_month_1',
      category: 'months',
      categoryLabel: 'Months Sequence',
      icon: Calendar,
      prompt: 'Which month comes immediately after July in the calendar sequence?',
      options: ['August', 'June', 'September', 'October'],
      correct: 'August',
      explanation: 'August directly follows July in the 12-month calendar order.'
    },
    {
      id: 'rev_month_2',
      category: 'months',
      categoryLabel: 'Months Sequence',
      icon: Calendar,
      prompt: 'What are the first and last months of the calendar year?',
      options: [
        'January and December',
        'February and November',
        'March and October',
        'January and November'
      ],
      correct: 'January and December',
      explanation: 'January is the opening month and December is the concluding twelfth month.'
    },
    // 2. Numbers Reading
    {
      id: 'rev_num_1',
      category: 'numbers',
      categoryLabel: 'Number Reading',
      icon: Hash,
      prompt: 'How is the numeral 348 correctly written in English words?',
      options: [
        'three hundred forty-eight',
        'three hundred and forty-eight',
        'thirty-four eight',
        'three thousand forty-eight'
      ],
      correct: 'three hundred forty-eight',
      explanation: 'In American English number writing, we write "three hundred forty-eight" consistently.'
    },
    {
      id: 'rev_num_2',
      category: 'numbers',
      categoryLabel: 'Number Reading',
      icon: Hash,
      prompt: 'What English word represents the number 1,000?',
      options: ['one thousand', 'one hundred', 'ten thousand', 'ten hundred'],
      correct: 'one thousand',
      explanation: 'The number 1,000 is written and read as "one thousand".'
    },
    // 3. Vocabulary Meaning & Listening
    {
      id: 'rev_vocab_1',
      category: 'vocabulary',
      categoryLabel: 'Vocabulary',
      icon: BookOpen,
      prompt: 'What is the meaning of the English word "Calendar"?',
      options: ['تقويم / روزنامة', 'ساعة حائط', 'كتاب مصور', 'خريطة'],
      correct: 'تقويم / روزنامة',
      explanation: 'A calendar (تقويم) displays the 12 months, dates, and days of the year.'
    },
    {
      id: 'rev_vocab_2',
      category: 'vocabulary',
      categoryLabel: 'Vocabulary',
      icon: BookOpen,
      prompt: 'Which word describes waking up before the usual time?',
      options: ['early', 'late', 'tired', 'ago'],
      correct: 'early',
      explanation: 'Waking up or arriving before time is "early" (مبكراً).'
    },
    // 4. Story Time Comprehension
    {
      id: 'rev_story_1',
      category: 'story',
      categoryLabel: 'Story Time: Mona',
      icon: MessageSquare,
      prompt: 'In Mona’s Fun Festival, what date did Mona check on the calendar?',
      options: ['May 10', 'June 1', 'April 5', 'July 15'],
      correct: 'May 10',
      explanation: 'Mona checked her calendar on May 10, the exciting day of the school festival!'
    },
    {
      id: 'rev_story_2',
      category: 'story',
      categoryLabel: 'Story Time: Mona',
      icon: MessageSquare,
      prompt: 'How did Mona feel at the end of the festival?',
      options: [
        'Tired but happy and brave',
        'Afraid and worried',
        'Angry and lonely',
        'Sick in bed'
      ],
      correct: 'Tired but happy and brave',
      explanation: 'After watching the friendly lion puppet and having fun with friends, Mona was tired but happy and brave.'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQ = reviewQuestions[currentIndex];
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [attemptCount, setAttemptCount] = useState<number>(0);
  const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);
  const [completedCount, setCompletedCount] = useState(0);

  const handleSelectOption = (opt: string) => {
    if (feedback?.isCorrect) return;
    setSelectedOpt(opt);
    const newAttempt = attemptCount + 1;
    setAttemptCount(newAttempt);

    const isMatch = opt.toLowerCase() === currentQ.correct.toLowerCase() || opt.replace(/\s+/g, ' ').toLowerCase() === currentQ.correct.toLowerCase();

    if (isMatch) {
      audioService.playSuccessChime();
      setFeedback({
        message: 'Great job! ' + currentQ.explanation,
        isCorrect: true
      });
      setCompletedCount(prev => prev + 1);

      // Record review attempt
      storageService.recordLearningAttempt({
        studentId: student.id,
        classId: student.classId,
        teacherId: student.teacherId,
        section: 'review',
        activityId: currentQ.id,
        score: newAttempt === 1 ? 100 : 80,
        maxScore: 100,
        isCorrect: true,
        details: { question: currentQ.prompt, category: currentQ.category }
      });
      onProgressUpdated(storageService.getStudentProgress(student.id));
    } else {
      audioService.playEncouragingTone();
      setFeedback({
        message: 'Try again! Look closely at the hint: ' + currentQ.explanation,
        isCorrect: false
      });
    }
  };

  const handleNextQuestion = () => {
    setSelectedOpt(null);
    setAttemptCount(0);
    setFeedback(null);
    if (currentIndex < reviewQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const isAllReviewFinished = completedCount >= reviewQuestions.length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
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
              Welcome Unit Review
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800">
              Low-Pressure Practice
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Review month order, number reading, vocabulary meanings, and Mona’s festival story before the Final Quiz!
          </p>
        </div>

        {/* Quick Quiz Shortcut */}
        <button
          onClick={onStartFinalQuiz}
          className="py-2.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer kid-button self-start sm:self-center"
        >
          <span>Take Final Unit Quiz</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive Review Question Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between text-xs font-bold border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-sky-700">
            <currentQ.icon className="w-4 h-4" />
            <span>{currentQ.categoryLabel}</span>
          </div>
          <span className="text-slate-400">
            Review {currentIndex + 1} of {reviewQuestions.length}
          </span>
        </div>

        {/* Question Prompt */}
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display text-center py-2">
          {currentQ.prompt}
        </h2>

        {/* 4 Clickable Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
          {currentQ.options.map((opt) => {
            const isSelected = selectedOpt === opt;
            const isMatch = opt.toLowerCase() === currentQ.correct.toLowerCase() || opt.replace(/\s+/g, ' ').toLowerCase() === currentQ.correct.toLowerCase();

            let btnClass = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-sky-50 hover:border-sky-300';

            if (feedback) {
              if (feedback.isCorrect && isMatch) {
                // Green for correct
                btnClass = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
              } else if (!feedback.isCorrect && isSelected) {
                // Orange for mistake (NOT red!)
                btnClass = 'bg-amber-50 border-orange-400 text-orange-950 font-bold';
              }
            }

            return (
              <button
                key={opt}
                onClick={() => handleSelectOption(opt)}
                disabled={feedback?.isCorrect}
                className={`p-4 rounded-2xl border-2 text-sm font-semibold transition-all cursor-pointer flex items-center justify-between text-left ${btnClass}`}
              >
                <span>{opt}</span>
                {feedback?.isCorrect && isMatch && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Supportive Feedback with Explanation */}
        {feedback && (
          <div
            className={`p-4 rounded-2xl text-xs font-semibold ${
              feedback.isCorrect
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border border-orange-300 text-orange-950'
            }`}
          >
            {feedback.message}
          </div>
        )}

        {/* Next / Finished Controls */}
        <div className="pt-2 flex justify-between items-center">
          <div className="text-xs text-slate-500 font-medium">
            {completedCount} of {reviewQuestions.length} skills reviewed
          </div>

          {feedback?.isCorrect && currentIndex < reviewQuestions.length - 1 && (
            <button
              onClick={handleNextQuestion}
              className="py-3 px-6 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-xs transition-all cursor-pointer kid-button"
            >
              Next Review Question →
            </button>
          )}

          {isAllReviewFinished && (
            <button
              onClick={onStartFinalQuiz}
              className="py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all cursor-pointer kid-button flex items-center gap-2"
            >
              <span>Ready! Proceed to Final Unit Quiz</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
