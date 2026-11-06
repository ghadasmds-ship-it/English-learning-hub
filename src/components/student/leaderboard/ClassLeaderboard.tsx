import React, { useState } from 'react';
import { Student, ClassRoom, StudentProgress } from '../../../types';
import { storageService } from '../../../services/storageService';
import { Trophy, Medal, ArrowLeft, Star, Sparkles, Award, Shield } from 'lucide-react';

interface ClassLeaderboardProps {
  student: Student;
  classRoom: ClassRoom;
  progress: StudentProgress;
  onBack: () => void;
}

export const ClassLeaderboard: React.FC<ClassLeaderboardProps> = ({
  student,
  classRoom,
  progress,
  onBack
}) => {
  const [boardType, setBoardType] = useState<'unit' | 'overall'>('unit');
  const leaderboard = storageService.getClassLeaderboard(classRoom.id, 10);

  // Check if current student is in Top 10
  const myRankEntry = leaderboard.find(e => e.student.id === student.id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
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
              Class Leaderboard
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800">
              {classRoom.name}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Fair rankings based on genuine learning achievements, spelling accuracy, and story reading.
          </p>
        </div>

        {/* View Switcher: Unit Leaderboard vs Class Leaderboard */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl text-xs font-semibold self-start sm:self-center">
          <button
            onClick={() => setBoardType('unit')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              boardType === 'unit'
                ? 'bg-white text-sky-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Welcome Unit Top 10
          </button>
          <button
            onClick={() => setBoardType('overall')}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              boardType === 'overall'
                ? 'bg-white text-indigo-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Overall Class Top 10
          </button>
        </div>
      </div>

      {/* Podium Cards for Top 3 */}
      {leaderboard.length >= 3 && (
        <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 pb-2 items-end">
          {/* Rank 2 (Silver) */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs text-center flex flex-col items-center">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm shadow-inner mb-2">
              🥈 2nd
            </div>
            <div className="font-bold text-sm text-slate-900 truncate max-w-full">
              {leaderboard[1].student.fullName}
            </div>
            <div className="text-xs text-slate-500 font-mono mt-0.5">
              ⭐ {leaderboard[1].stars} Stars
            </div>
          </div>

          {/* Rank 1 (Gold) */}
          <div className="bg-gradient-to-b from-amber-50 to-white rounded-3xl p-5 sm:p-6 border-2 border-amber-300 shadow-sm text-center flex flex-col items-center scale-105 z-10">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-bold text-lg shadow-sm mb-2">
              🥇 1st
            </div>
            <div className="font-black text-base text-slate-900 truncate max-w-full">
              {leaderboard[0].student.fullName}
            </div>
            <div className="text-xs font-bold text-amber-800 font-mono mt-0.5">
              ⭐ {leaderboard[0].stars} Stars · Level {leaderboard[0].level}
            </div>
          </div>

          {/* Rank 3 (Bronze) */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs text-center flex flex-col items-center">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-sm shadow-inner mb-2">
              🥉 3rd
            </div>
            <div className="font-bold text-sm text-slate-900 truncate max-w-full">
              {leaderboard[2].student.fullName}
            </div>
            <div className="text-xs text-slate-500 font-mono mt-0.5">
              ⭐ {leaderboard[2].stars} Stars
            </div>
          </div>
        </div>
      )}

      {/* Detailed Top 10 Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
          <span>Rank &amp; Student</span>
          <div className="flex items-center gap-6">
            <span>Scholar Level</span>
            <span>Unit Mastery</span>
            <span>Total Stars</span>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {leaderboard.map((entry) => {
            const isMe = entry.student.id === student.id;
            return (
              <div
                key={entry.student.id}
                className={`p-4 flex items-center justify-between transition-colors ${
                  isMe ? 'bg-sky-50/70 font-semibold' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${
                    entry.rank === 1 ? 'bg-amber-100 text-amber-900' :
                    entry.rank === 2 ? 'bg-slate-200 text-slate-800' :
                    entry.rank === 3 ? 'bg-amber-50 text-amber-800' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    #{entry.rank}
                  </span>
                  <div>
                    <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span>{entry.student.fullName}</span>
                      {isMe && (
                        <span className="text-[10px] bg-sky-200 text-sky-900 px-2 py-0.5 rounded-full font-bold">
                          You
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400">
                      @{entry.student.username}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm font-mono">
                  <span className="text-slate-600">Level {entry.level}</span>
                  <div className="w-20 text-right">
                    <span className="font-bold text-emerald-600">{entry.unitMasteryPercent}%</span>
                  </div>
                  <div className="w-16 text-right font-bold text-amber-600 flex items-center justify-end gap-1">
                    <span>{entry.stars}</span>
                    <span>⭐</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Security Privacy Note */}
      <div className="text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
        <Shield className="w-3.5 h-3.5" />
        <span>Restricted strictly to students enrolled in {classRoom.name}. Multi-tenant isolated.</span>
      </div>
    </div>
  );
};
