import React, { useState } from 'react';
import { storageService } from '../../services/storageService';
import { Student, ClassRoom } from '../../types';
import { GraduationCap, KeyRound, User, Hash, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

interface StudentLoginProps {
  onSuccess: (student: Student, classRoom: ClassRoom) => void;
  onSwitchToTeacher: () => void;
}

export const StudentLogin: React.FC<StudentLoginProps> = ({ onSuccess, onSwitchToTeacher }) => {
  const [classCode, setClassCode] = useState('ENG-4A');
  const [username, setUsername] = useState('mona401');
  const [pin, setPin] = useState('1234');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const res = storageService.studentLogin(classCode, username, pin);
      setIsLoading(false);
      if (res.success && res.student && res.classRoom) {
        onSuccess(res.student, res.classRoom);
      } else {
        setError(res.error || 'Login failed. Please check your credentials.');
      }
    }, 250);
  };

  const handleQuickLogin = (demoUser: string, demoPin: string, code: string = 'ENG-4A') => {
    setClassCode(code);
    setUsername(demoUser);
    setPin(demoPin);
    const res = storageService.studentLogin(code, demoUser, demoPin);
    if (res.success && res.student && res.classRoom) {
      onSuccess(res.student, res.classRoom);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        {/* Playful background decorative wave */}
        <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-sky-100/60 blur-xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 rounded-full bg-amber-100/60 blur-xl pointer-events-none" />

        <div className="text-center mb-8 relative">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/25 mb-4">
            <GraduationCap className="w-9 h-9" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 font-display">Student Portal</h2>
          <p className="text-sm text-slate-500 mt-1">Enter your class code, username, and private PIN</p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-sky-600" />
              Class Code
            </label>
            <input
              type="text"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value.toUpperCase())}
              placeholder="e.g. ENG-4A"
              required
              className="w-full px-4 py-3 text-sm font-semibold tracking-wider rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all uppercase"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-sky-600" />
              Student Username / Number
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
              placeholder="e.g. mona401"
              required
              className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all lowercase"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-sky-600" />
              Private PIN
            </label>
            <input
              type="password"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="••••"
              required
              className="w-full px-4 py-3 text-sm tracking-widest rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3.5 px-6 rounded-xl bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white font-semibold text-sm shadow-md shadow-sky-600/20 flex items-center justify-center gap-2 transition-all kid-button cursor-pointer disabled:opacity-50"
          >
            {isLoading ? 'Entering Classroom...' : 'Start Learning Adventure'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Student Selector for Easy Review */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2.5">
            <span className="font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Quick Student Demo Profiles:
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleQuickLogin('mona401', '1234')}
              className="p-2.5 rounded-xl border border-sky-100 bg-sky-50/50 hover:bg-sky-100 text-left transition-colors cursor-pointer"
            >
              <div className="font-bold text-slate-800">Mona Al-Mansoor</div>
              <div className="text-[11px] text-slate-500">42 Stars · Level 4</div>
            </button>
            <button
              onClick={() => handleQuickLogin('tariq402', '2345')}
              className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-left transition-colors cursor-pointer"
            >
              <div className="font-bold text-slate-800">Tariq Khalid</div>
              <div className="text-[11px] text-slate-500">31 Stars · Level 3</div>
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onSwitchToTeacher}
            className="text-xs text-sky-600 hover:text-sky-700 font-semibold underline underline-offset-4"
          >
            Are you a Teacher? Switch to Teacher Portal
          </button>
        </div>
      </div>
    </div>
  );
};
