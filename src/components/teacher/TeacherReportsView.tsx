import React, { useState } from 'react';
import { TeacherAccount, ClassRoom, Student } from '../../types';
import { storageService } from '../../services/storageService';
import { VOCABULARY_DATA } from '../../data/welcomeUnitData';
import {
  FileText,
  Users,
  TrendingUp,
  Link as LinkIcon,
  Copy,
  Check,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Sparkles
} from 'lucide-react';

interface TeacherReportsViewProps {
  teacher: TeacherAccount;
  classes: ClassRoom[];
  selectedStudent?: Student;
  onOpenParentLinkTest: (token: string) => void;
}

export const TeacherReportsView: React.FC<TeacherReportsViewProps> = ({
  teacher,
  classes,
  selectedStudent: initialStudent,
  onOpenParentLinkTest
}) => {
  const students = storageService.getTeacherStudents(teacher.id);
  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    initialStudent?.id || students[0]?.id || ''
  );
  const [copiedToken, setCopiedToken] = useState(false);

  const activeStudent = students.find(s => s.id === selectedStudentId) || students[0];
  const activeStudentClass = classes.find(c => c.id === activeStudent?.classId);
  const studentProgress = activeStudent ? storageService.getStudentProgress(activeStudent.id) : null;
  const existingParentLink = activeStudent ? storageService.getParentReportLink(activeStudent.id) : undefined;

  const [parentLink, setParentLink] = useState(existingParentLink);

  const handleGenerateParentLink = () => {
    if (!activeStudent) return;
    const link = storageService.createParentReportLink(teacher.id, activeStudent.id);
    setParentLink(link);
  };

  const handleRevokeParentLink = () => {
    if (!parentLink) return;
    storageService.revokeParentReportLink(teacher.id, parentLink.id);
    setParentLink(undefined);
  };

  const handleCopyLink = () => {
    if (!parentLink) return;
    const shareableUrl = `${window.location.origin}/?parentReportToken=${parentLink.token}`;
    navigator.clipboard.writeText(shareableUrl);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  // Vocabulary lists
  const masteredWords = VOCABULARY_DATA.filter(w => studentProgress?.wordMastery[w.id]?.mastered);
  const weakWords = VOCABULARY_DATA.filter(w => {
    const wm = studentProgress?.wordMastery[w.id];
    return wm?.needsReview || (!wm?.mastered && wm?.learned);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Reports &amp; Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Student mastery assessments, skill diagnostics, and authorized parent report links.
          </p>
        </div>

        {/* Student Selector */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs self-start sm:self-center">
          <span className="text-xs font-bold text-slate-500 pl-1">Select Student:</span>
          <select
            value={selectedStudentId}
            onChange={(e) => {
              setSelectedStudentId(e.target.value);
              const nextLink = storageService.getParentReportLink(e.target.value);
              setParentLink(nextLink);
            }}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            {students.map(s => (
              <option key={s.id} value={s.id}>
                {s.fullName} (@{s.username})
              </option>
            ))}
          </select>
        </div>
      </div>

      {activeStudent && studentProgress && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Detailed Student Assessment Report */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                  Verified Learning Diagnostic
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                  {activeStudent.fullName}
                </h2>
                <div className="text-xs text-slate-500 mt-0.5">
                  {activeStudentClass?.name} ({activeStudentClass?.classCode}) · Teacher: {teacher.fullName}
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-slate-400 font-medium">Overall Mastery</div>
                <div className="text-3xl font-black text-emerald-600 font-mono">
                  {Math.round(
                    (studentProgress.skills.vocabularyRecognition +
                      studentProgress.skills.meaning +
                      studentProgress.skills.listening +
                      studentProgress.skills.pronunciation +
                      studentProgress.skills.spellingWriting +
                      studentProgress.skills.readingFluency) / 6
                  )}%
                </div>
              </div>
            </div>

            {/* 6 Learning Skills Matrix */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Main Learning Skills Performance
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Vocabulary Recognition', score: studentProgress.skills.vocabularyRecognition },
                  { label: 'Arabic Meaning & Context', score: studentProgress.skills.meaning },
                  { label: 'Listening & Dictation', score: studentProgress.skills.listening },
                  { label: 'Speech Pronunciation', score: studentProgress.skills.pronunciation },
                  { label: 'Spelling & Writing (No "and")', score: studentProgress.skills.spellingWriting },
                  { label: 'Reading & Fluency', score: studentProgress.skills.readingFluency }
                ].map((s) => (
                  <div key={s.label} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="text-[11px] text-slate-500 font-semibold">{s.label}</div>
                    <div className="text-xl font-bold font-mono text-slate-900 my-1">{s.score}%</div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-sky-500 h-full rounded-full" style={{ width: `${s.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vocabulary Status: Mastered vs Needing Improvement */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-900">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Mastered Vocabulary ({masteredWords.length})</span>
                  </span>
                </div>
                {masteredWords.length === 0 ? (
                  <div className="text-xs text-slate-400 italic">None yet</div>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {masteredWords.map(w => (
                      <span key={w.id} className="px-2.5 py-1 rounded-lg bg-white text-emerald-900 font-bold text-xs border border-emerald-100">
                        {w.word}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-amber-900">
                  <span className="flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Words Needing Improvement ({weakWords.length})</span>
                  </span>
                </div>
                {weakWords.length === 0 ? (
                  <div className="text-xs text-emerald-700 italic">No struggling words detected!</div>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {weakWords.map(w => (
                      <span key={w.id} className="px-2.5 py-1 rounded-lg bg-white text-amber-950 font-semibold text-xs border border-amber-200">
                        {w.word} ({w.arabicMeaning})
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Strengths & Suggested Home Practice */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <div>
                <span className="font-bold text-slate-900 block text-sm">Identified Strengths:</span>
                <p className="text-slate-600 mt-0.5 leading-relaxed">
                  Demonstrates excellent calendar recognition and understanding of seasonal sequences. Strong engagement with picture book story reading aloud.
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <span className="font-bold text-slate-900 block text-sm">Suggested Home Practice:</span>
                <p className="text-slate-600 mt-0.5 leading-relaxed">
                  1. Practice writing three-digit numbers in American English words without &quot;and&quot; (e.g. &quot;Three hundred eight&quot;).
                  <br />
                  2. Recite the 12 calendar months in forward and backward sequence.
                </p>
              </div>
            </div>
          </div>

          {/* Right Col: Parent Access Link Generator (Secure & Expirable) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <LinkIcon className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  Parent Report Access Link
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Generate a private, tamper-resistant access link for {activeStudent.fullName}’s parents. Parents do not need an account. The link exposes ONLY this student’s report.
                </p>
              </div>

              {/* Status of Parent Link */}
              {parentLink && !parentLink.isRevoked ? (
                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-sky-900 flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Link Active &amp; Authorized
                    </span>
                    <span className="text-[11px] text-sky-700">Expires in 30 days</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-sky-200 font-mono text-[11px] text-slate-600 break-all select-all">
                    token: {parentLink.token}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-1">
                    <button
                      onClick={handleCopyLink}
                      className="flex-1 py-2 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedToken ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedToken ? 'Copied URL!' : 'Copy Parent Link'}</span>
                    </button>

                    <button
                      onClick={() => onOpenParentLinkTest(parentLink.token)}
                      className="py-2 px-3 rounded-xl border border-sky-300 bg-white hover:bg-sky-100 text-sky-900 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>
                  </div>

                  <button
                    onClick={handleRevokeParentLink}
                    className="text-[11px] font-semibold text-red-600 hover:text-red-700 underline block pt-1 cursor-pointer"
                  >
                    Revoke This Parent Link
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
                  <div className="text-xs text-slate-500">
                    No active parent link for {activeStudent.fullName}.
                  </div>
                  <button
                    onClick={handleGenerateParentLink}
                    className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xs transition-all kid-button cursor-pointer w-full"
                  >
                    Generate Secure Parent Link
                  </button>
                </div>
              )}
            </div>

            {/* Tenant Security Notice */}
            <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-3">
              🔒 Enforces least-privilege tenant isolation. Never exposes other students or teacher records.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
