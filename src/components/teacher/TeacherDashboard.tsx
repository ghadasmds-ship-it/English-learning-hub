import React from 'react';
import { TeacherAccount, ClassRoom, Student } from '../../types';
import { storageService } from '../../services/storageService';
import {
  Users,
  GraduationCap,
  Award,
  TrendingUp,
  AlertTriangle,
  Plus,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Lock,
  ChevronRight
} from 'lucide-react';

interface TeacherDashboardProps {
  teacher: TeacherAccount;
  onNavigate: (view: string) => void;
  onAddClassModal: () => void;
  onAddStudentModal: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  teacher,
  onNavigate,
  onAddClassModal,
  onAddStudentModal
}) => {
  const analytics = storageService.getTeacherAnalytics(teacher.id);
  const classes = storageService.getTeacherClasses(teacher.id);
  const isReadOnly = storageService.isTeacherSubscriptionExpired(teacher.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Expired Subscription Warning Banner (if read-only) */}
      {isReadOnly && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 flex items-center justify-between text-amber-900">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-amber-700 shrink-0" />
            <div>
              <div className="font-bold text-sm">Account is currently in Read-Only Mode</div>
              <div className="text-xs text-amber-800">
                Your 12-month teacher license has expired. All classes, records, and reports remain safely preserved. Renew to unlock adding new classes, students, and activities.
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigate('subscription')}
            className="py-2 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shrink-0 cursor-pointer"
          >
            Renew Subscription
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {teacher.schoolName}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            My Teaching Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time mastery tracking, class rosters, diagnostic skill breakdowns, and student reports.
          </p>
        </div>

        {/* Quick Teacher Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            disabled={isReadOnly}
            onClick={onAddClassModal}
            className="py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all kid-button disabled:opacity-40 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Class</span>
          </button>
          <button
            disabled={isReadOnly || classes.length === 0}
            onClick={onAddStudentModal}
            className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-black text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all kid-button disabled:opacity-40 cursor-pointer"
          >
            <Users className="w-4 h-4" />
            <span>Add Students</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards (Generated strictly from saved records) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Total Classes</span>
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono tabular-nums">
            {analytics.totalClasses}
          </div>
          <div className="text-xs text-slate-400 mt-1">Active class workspaces</div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Total Enrolled</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono tabular-nums">
            {analytics.totalStudents}
          </div>
          <div className="text-xs text-slate-400 mt-1">Student roster total</div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Average Mastery</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-600 font-mono tabular-nums">
            {analytics.averageMastery}%
          </div>
          <div className="text-xs text-slate-400 mt-1">Across all assessed skills</div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Support Needed</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-600 font-mono tabular-nums">
            {analytics.studentsNeedingSupport.length}
          </div>
          <div className="text-xs text-slate-400 mt-1">Flagged for extra practice</div>
        </div>
      </div>

      {/* Two-Column Diagnostic Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Strongest & Weakest Learning Skills */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Skills Competency Diagnostic
              </h2>
              <p className="text-xs text-slate-500">
                Calculated directly from student attempts in Months, Numbers, and Vocabulary
              </p>
            </div>
            <button
              onClick={() => onNavigate('reports-analytics')}
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
            >
              <span>Full Analytics</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {analytics.skillAverages.map((skill, idx) => (
              <div key={skill.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-slate-700 font-semibold">{skill.name}</span>
                  <span className="font-mono font-bold text-slate-900">{skill.score}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      skill.score >= 85 ? 'bg-emerald-500' :
                      skill.score >= 70 ? 'bg-sky-500' :
                      'bg-amber-500'
                    }`}
                    style={{ width: `${skill.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 font-semibold block">Strongest Skill:</span>
              <span className="font-bold text-emerald-700 text-sm">{analytics.strongestSkill}</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold block">Needs Improvement:</span>
              <span className="font-bold text-amber-700 text-sm">{analytics.weakestSkill}</span>
            </div>
          </div>
        </div>

        {/* Right Col: Students Needing Support */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>Students Needing Support</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Automated diagnostic alerts based on recent learning sessions
            </p>

            <div className="mt-4 space-y-3">
              {analytics.studentsNeedingSupport.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400">
                  All enrolled students currently meet or exceed mastery benchmarks!
                </div>
              ) : (
                analytics.studentsNeedingSupport.map(({ student, reason, weakSkill }) => (
                  <div
                    key={student.id}
                    className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{student.fullName}</span>
                      <span className="text-[10px] bg-amber-200/80 text-amber-900 font-bold px-2 py-0.5 rounded">
                        {weakSkill}
                      </span>
                    </div>
                    <p className="text-[11px] text-amber-800 leading-snug">
                      {reason}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          <button
            onClick={() => onNavigate('my-students')}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
          >
            Manage Student Roster
          </button>
        </div>
      </div>

      {/* My Classes Quick Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-display">My Enrolled Classes</h2>
            <p className="text-xs text-slate-500">Each class maintains a fully isolated student roster and leaderboard</p>
          </div>
          <button
            onClick={() => onNavigate('my-classes')}
            className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Classes</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((c) => {
            const classStudents = storageService.getTeacherStudents(teacher.id, c.id);
            return (
              <div
                key={c.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:border-sky-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 font-bold font-mono text-xs">
                      {c.classCode}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {c.academicYear}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 font-display group-hover:text-sky-600 transition-colors">
                    {c.name}
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {c.stageLevel} · {c.grade} ({c.section})
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-600 font-medium font-mono">
                    {classStudents.length} Students Enrolled
                  </span>
                  <button
                    onClick={() => onNavigate('my-students')}
                    className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Roster</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
