import React from 'react';
import { UserRole, TeacherAccount, Student } from '../../types';
import { Sparkles, GraduationCap, ShieldCheck, User, LogOut } from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeTeacher?: TeacherAccount;
  activeStudent?: Student;
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  activeTeacher,
  activeStudent,
  currentView,
  onNavigate,
  onLogout
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate(currentRole === 'teacher' ? 'teacher-dashboard' : 'student-home')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-sky-500/20 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-slate-900 block font-display leading-tight">
                  English Learning Hub
                </span>
                <span className="text-xs text-sky-600 font-semibold block leading-none">
                  Welcome Unit Pilot
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (single-line, clean unboxed) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            {currentRole === 'student' && (
              <>
                <button
                  onClick={() => onNavigate('student-home')}
                  className={`hover:text-sky-600 transition-colors whitespace-nowrap shrink-0 ${currentView === 'student-home' || currentView === 'welcome-unit' ? 'text-sky-600 font-semibold' : ''}`}
                >
                  Learning Units
                </button>
                <button
                  onClick={() => onNavigate('my-achievements')}
                  className={`hover:text-sky-600 transition-colors whitespace-nowrap shrink-0 ${currentView === 'my-achievements' ? 'text-sky-600 font-semibold' : ''}`}
                >
                  My Achievements
                </button>
                <button
                  onClick={() => onNavigate('class-leaderboard')}
                  className={`hover:text-sky-600 transition-colors whitespace-nowrap shrink-0 ${currentView === 'class-leaderboard' ? 'text-sky-600 font-semibold' : ''}`}
                >
                  Leaderboards
                </button>
              </>
            )}

            {currentRole === 'teacher' && (
              <>
                <button
                  onClick={() => onNavigate('teacher-dashboard')}
                  className={`hover:text-sky-600 transition-colors whitespace-nowrap shrink-0 ${currentView === 'teacher-dashboard' ? 'text-sky-600 font-semibold' : ''}`}
                >
                  My Teaching Dashboard
                </button>
                <button
                  onClick={() => onNavigate('my-classes')}
                  className={`hover:text-sky-600 transition-colors whitespace-nowrap shrink-0 ${currentView === 'my-classes' ? 'text-sky-600 font-semibold' : ''}`}
                >
                  My Classes
                </button>
                <button
                  onClick={() => onNavigate('my-students')}
                  className={`hover:text-sky-600 transition-colors whitespace-nowrap shrink-0 ${currentView === 'my-students' ? 'text-sky-600 font-semibold' : ''}`}
                >
                  My Students
                </button>
                <button
                  onClick={() => onNavigate('reports-analytics')}
                  className={`hover:text-sky-600 transition-colors whitespace-nowrap shrink-0 ${currentView === 'reports-analytics' ? 'text-sky-600 font-semibold' : ''}`}
                >
                  Reports &amp; Analytics
                </button>
                <button
                  onClick={() => onNavigate('subscription')}
                  className={`hover:text-sky-600 transition-colors whitespace-nowrap shrink-0 ${currentView === 'subscription' ? 'text-sky-600 font-semibold' : ''}`}
                >
                  Subscription
                </button>
              </>
            )}

            {currentRole === 'admin' && (
              <>
                <button
                  onClick={() => onNavigate('admin-dashboard')}
                  className="text-amber-700 font-semibold hover:text-amber-900 transition-colors whitespace-nowrap shrink-0"
                >
                  Platform Licensing Management
                </button>
              </>
            )}
          </nav>

          {/* Zone 3: Primary Action & Role Switcher for seamless testability */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick Role Tester Selector */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-xs font-medium">
              <span className="text-slate-500 px-2 hidden lg:inline">Role:</span>
              <button
                onClick={() => onRoleChange('student')}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${currentRole === 'student' ? 'bg-white text-sky-700 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Student
              </button>
              <button
                onClick={() => onRoleChange('teacher')}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${currentRole === 'teacher' ? 'bg-white text-indigo-700 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Teacher
              </button>
              <button
                onClick={() => onRoleChange('admin')}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${currentRole === 'admin' ? 'bg-white text-amber-700 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Owner
              </button>
            </div>

            {/* User Info / Action */}
            {currentRole === 'student' && activeStudent && (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <span className="w-8 h-8 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center font-bold text-xs">
                  {activeStudent.fullName.charAt(0)}
                </span>
                <span className="text-sm font-semibold text-slate-800 hidden sm:inline whitespace-nowrap">
                  {activeStudent.fullName.split(' ')[0]}
                </span>
              </div>
            )}

            {currentRole === 'teacher' && activeTeacher && (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                  {activeTeacher.fullName.charAt(0)}
                </span>
                <span className="text-sm font-semibold text-slate-800 hidden sm:inline whitespace-nowrap">
                  {activeTeacher.fullName}
                </span>
              </div>
            )}

            <button
              onClick={onLogout}
              title="Sign Out / Switch User"
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
