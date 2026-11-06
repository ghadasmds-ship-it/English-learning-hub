import React from 'react';
import { storageService } from '../../services/storageService';
import { downloadStudentAchievementsPdf } from '../../services/pdfService';
import { VOCABULARY_DATA } from '../../data/welcomeUnitData';
import {
  GraduationCap,
  ShieldCheck,
  Download,
  CheckCircle2,
  AlertTriangle,
  Award,
  Sparkles,
  BookOpen,
  Calendar,
  Lock
} from 'lucide-react';

interface ParentReportViewProps {
  token: string;
  onExit: () => void;
}

export const ParentReportView: React.FC<ParentReportViewProps> = ({ token, onExit }) => {
  const reportData = storageService.getStudentReportByToken(token);

  if (!reportData) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7 text-amber-700" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 font-display">
            Report Access Expired or Revoked
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            This secure parent report link is no longer valid. Please request an updated report access link from your child&apos;s teacher.
          </p>
          <button
            onClick={onExit}
            className="py-2.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer"
          >
            Return to Learning Hub
          </button>
        </div>
      </div>
    );
  }

  const { student, classRoom, progress, teacher } = reportData;

  const handleDownloadPdf = () => {
    downloadStudentAchievementsPdf(student, classRoom, teacher, progress);
  };

  const masteredWords = VOCABULARY_DATA.filter(w => progress.wordMastery[w.id]?.mastered);
  const weakWords = VOCABULARY_DATA.filter(w => {
    const wm = progress.wordMastery[w.id];
    return wm?.needsReview || (!wm?.mastered && wm?.learned);
  });

  const overallMastery = Math.round(
    (progress.skills.vocabularyRecognition +
      progress.skills.meaning +
      progress.skills.listening +
      progress.skills.pronunciation +
      progress.skills.spellingWriting +
      progress.skills.readingFluency) / 6
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-sky-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-200 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Official Parent Progress Report · {classRoom.name}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
              {student.fullName}
            </h1>
            <p className="text-xs text-sky-100">
              Teacher: {teacher.fullName} · {teacher.schoolName}
            </p>
          </div>

          <button
            onClick={handleDownloadPdf}
            className="py-3 px-6 rounded-2xl bg-white text-sky-900 hover:bg-sky-50 font-bold text-xs flex items-center gap-2 shadow-xs transition-all kid-button cursor-pointer self-start sm:self-center shrink-0"
          >
            <Download className="w-4 h-4 text-sky-700" />
            <span>Download Official PDF Portfolio</span>
          </button>
        </div>
      </div>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-slate-200 text-center shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Overall Mastery</div>
          <div className="text-3xl font-black text-emerald-600 font-mono my-1">{overallMastery}%</div>
          <div className="text-[11px] text-slate-400">Welcome Unit Pilot</div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 text-center shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Stars Earned</div>
          <div className="text-3xl font-black text-amber-500 font-mono my-1">⭐ {progress.totalStars}</div>
          <div className="text-[11px] text-slate-400">Verified attempts</div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 text-center shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Scholar Level</div>
          <div className="text-3xl font-black text-indigo-600 font-mono my-1">Lvl {progress.level}</div>
          <div className="text-[11px] text-slate-400">Continuous Growth</div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-200 text-center shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Story Reading</div>
          <div className="text-lg font-bold text-slate-900 my-2">
            {progress.storyMasterTrophyAwarded ? '🏆 Trophy Master' : '5 Pages Active'}
          </div>
          <div className="text-[11px] text-slate-400">Mona’s Fun Festival</div>
        </div>
      </div>

      {/* Skills Matrix */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 font-display">
          Learning Skills Assessment
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: 'Vocabulary Recognition', score: progress.skills.vocabularyRecognition },
            { label: 'Arabic Meaning & Context', score: progress.skills.meaning },
            { label: 'Listening & Dictation', score: progress.skills.listening },
            { label: 'Speech Pronunciation', score: progress.skills.pronunciation },
            { label: 'Spelling & Writing (No "and")', score: progress.skills.spellingWriting },
            { label: 'Reading Fluency', score: progress.skills.readingFluency }
          ].map((s) => (
            <div key={s.label} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-xs text-slate-500 font-semibold">{s.label}</div>
              <div className="text-xl font-bold font-mono text-slate-900 my-1">{s.score}%</div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-sky-500 h-full rounded-full" style={{ width: `${s.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vocabulary Mastery Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-3xl bg-emerald-50/70 border border-emerald-200 space-y-2">
          <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Mastered Target Vocabulary ({masteredWords.length})</span>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {masteredWords.map(w => (
              <span key={w.id} className="px-2.5 py-1 rounded-lg bg-white text-emerald-900 font-bold text-xs border border-emerald-100">
                {w.word}
              </span>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-amber-50/70 border border-amber-200 space-y-2">
          <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Vocabulary for Home Reinforcement ({weakWords.length})</span>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {weakWords.length === 0 ? (
              <span className="text-xs text-emerald-700 italic">No struggling words!</span>
            ) : (
              weakWords.map(w => (
                <span key={w.id} className="px-2.5 py-1 rounded-lg bg-white text-amber-950 font-semibold text-xs border border-amber-200">
                  {w.word} ({w.arabicMeaning})
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Home Support Recommendations */}
      <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 text-xs leading-relaxed">
        <h3 className="font-bold text-slate-900 text-sm">
          Recommended Practice at Home with Parents:
        </h3>
        <p className="text-slate-600">
          • Listen to the recorded story of &quot;Mona’s Fun Festival&quot; together and encourage reading aloud.
          <br />
          • Practice writing numbers from 1 to 1,000 using the American English format without &quot;and&quot; (for example: &quot;Three hundred eight&quot;).
          <br />
          • Recite the 12 calendar months and celebrate milestones achieved in the classroom!
        </p>
      </div>

      <div className="text-center pt-4">
        <button
          onClick={onExit}
          className="text-xs font-bold text-slate-500 hover:text-slate-800 underline underline-offset-4 cursor-pointer"
        >
          Exit Parent Report View
        </button>
      </div>
    </div>
  );
};
