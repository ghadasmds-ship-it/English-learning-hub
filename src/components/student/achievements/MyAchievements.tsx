import React from 'react';
import { Student, ClassRoom, StudentProgress, TeacherAccount, Achievement } from '../../../types';
import { ACHIEVEMENTS_DATA } from '../../../data/welcomeUnitData';
import { downloadStudentAchievementsPdf } from '../../../services/pdfService';
import { GoldStoryMasterTrophy } from '../../../data/illustrations';
import {
  Trophy,
  Award,
  Star,
  Download,
  Lock,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  Calendar,
  Hash,
  Mic,
  BookOpen
} from 'lucide-react';

interface MyAchievementsProps {
  student: Student;
  classRoom: ClassRoom;
  teacher: TeacherAccount;
  progress: StudentProgress;
  onBack: () => void;
}

export const MyAchievements: React.FC<MyAchievementsProps> = ({
  student,
  classRoom,
  teacher,
  progress,
  onBack
}) => {
  const earnedCount = progress.earnedAchievementIds.length;
  const totalCount = ACHIEVEMENTS_DATA.length;

  const handleDownloadPdf = () => {
    downloadStudentAchievementsPdf(student, classRoom, teacher, progress);
  };

  const renderBadgeIcon = (icon: string, isEarned: boolean) => {
    switch (icon) {
      case 'trophy-gold':
        return <GoldStoryMasterTrophy className="w-10 h-10" />;
      case 'calendar':
        return <Calendar className={`w-8 h-8 ${isEarned ? 'text-sky-600' : 'text-slate-400'}`} />;
      case 'hash':
        return <Hash className={`w-8 h-8 ${isEarned ? 'text-indigo-600' : 'text-slate-400'}`} />;
      case 'mic':
        return <Mic className={`w-8 h-8 ${isEarned ? 'text-emerald-600' : 'text-slate-400'}`} />;
      case 'spell':
        return <BookOpen className={`w-8 h-8 ${isEarned ? 'text-amber-600' : 'text-slate-400'}`} />;
      case 'trophy':
        return <Trophy className={`w-8 h-8 ${isEarned ? 'text-amber-500' : 'text-slate-400'}`} />;
      case 'award':
        return <Award className={`w-8 h-8 ${isEarned ? 'text-purple-600' : 'text-slate-400'}`} />;
      default:
        return <Star className={`w-8 h-8 ${isEarned ? 'text-amber-400 fill-amber-400' : 'text-slate-400'}`} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBack}
            className="text-xs font-semibold text-slate-500 hover:text-sky-600 flex items-center gap-1.5 transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Learning Hub</span>
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              My Achievements
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
              {earnedCount} / {totalCount} Earned
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Genuine accomplishments based on verified learning performance, spelling accuracy, and story reading.
          </p>
        </div>

        {/* Real PDF Portfolio Download Button */}
        <button
          onClick={handleDownloadPdf}
          className="py-3 px-6 rounded-2xl bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-sky-600/20 transition-all kid-button cursor-pointer self-start sm:self-center"
        >
          <Download className="w-4 h-4" />
          <span>Download Portfolio PDF</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xl">
            ⭐
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Total Stars</div>
            <div className="text-2xl font-black text-slate-900 font-mono tabular-nums">{progress.totalStars}</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Scholar Level</div>
            <div className="text-2xl font-black text-slate-900 font-mono tabular-nums">Level {progress.level}</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Earned Badges</div>
            <div className="text-2xl font-black text-slate-900 font-mono tabular-nums">{earnedCount}</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Story Trophy</div>
            <div className="text-sm font-bold text-slate-900">
              {progress.storyMasterTrophyAwarded ? '🏆 Unlocked' : 'In Progress'}
            </div>
          </div>
        </div>
      </div>

      {/* Skills Mastery Breakdown Strip */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 font-display">
          Learning Skills Competency Matrix
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { label: 'Vocabulary', val: progress.skills.vocabularyRecognition },
            { label: 'Meaning', val: progress.skills.meaning },
            { label: 'Listening', val: progress.skills.listening },
            { label: 'Spelling', val: progress.skills.spellingWriting },
            { label: 'Pronunciation', val: progress.skills.pronunciation },
            { label: 'Reading Fluency', val: progress.skills.readingFluency }
          ].map(s => (
            <div key={s.label} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <div className="text-xs text-slate-500 font-medium">{s.label}</div>
              <div className="text-lg font-bold font-mono text-slate-900 my-1">{s.val}%</div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${s.val}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Gallery: Earned vs Unearned */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 font-display">
          My Achievement Gallery
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ACHIEVEMENTS_DATA.map((ach) => {
            const isEarned = progress.earnedAchievementIds.includes(ach.id);
            return (
              <div
                key={ach.id}
                className={`rounded-3xl p-5 border transition-all flex flex-col justify-between ${
                  isEarned
                    ? ach.isSpecialGoldTrophy
                      ? 'bg-amber-50/70 border-amber-300 shadow-sm'
                      : 'bg-white border-slate-200 shadow-2xs'
                    : 'bg-slate-50/60 border-slate-200/80 opacity-70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center p-1 border border-slate-100 shadow-inner">
                      {renderBadgeIcon(ach.icon, isEarned)}
                    </div>
                    {isEarned ? (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Earned
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Locked
                      </span>
                    )}
                  </div>

                  <h3 className={`text-base font-bold ${isEarned ? 'text-slate-900' : 'text-slate-600'} font-display`}>
                    {ach.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {ach.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Requirement:
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5 font-medium">
                    {ach.requirement}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
