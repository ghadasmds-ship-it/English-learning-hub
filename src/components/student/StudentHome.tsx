import React from 'react';
import { Student, ClassRoom, StudentProgress } from '../../types';
import { Trophy, ChevronRight } from 'lucide-react';
import {
  UnitIconWelcome,
  UnitIconPersonalInterest,
  UnitIconHouseDesigns,
  UnitIconJobPaths,
  UnitIconGloriousFood
} from '../../data/illustrations';

interface StudentHomeProps {
  student: Student;
  classRoom: ClassRoom;
  progress: StudentProgress;
  onSelectUnit: (unitId: string) => void;
  onNavigate: (view: string) => void;
}

export const StudentHome: React.FC<StudentHomeProps> = ({
  student,
  classRoom,
  progress,
  onSelectUnit,
  onNavigate
}) => {
  const units = [
    {
      id: 'welcome',
      title: 'Welcome',
      Illustration: UnitIconWelcome,
      bgColor: 'bg-sky-50/70 hover:bg-sky-50 border-sky-200',
      isAvailable: true
    },
    {
      id: 'personal_interest',
      title: 'Personal Interest',
      Illustration: UnitIconPersonalInterest,
      bgColor: 'bg-emerald-50/50 hover:bg-emerald-50 border-emerald-200',
      isAvailable: false
    },
    {
      id: 'house_designs',
      title: 'House Designs',
      Illustration: UnitIconHouseDesigns,
      bgColor: 'bg-amber-50/50 hover:bg-amber-50 border-amber-200',
      isAvailable: false
    },
    {
      id: 'job_paths',
      title: 'Job Paths',
      Illustration: UnitIconJobPaths,
      bgColor: 'bg-purple-50/50 hover:bg-purple-50 border-purple-200',
      isAvailable: false
    },
    {
      id: 'glorious_food',
      title: 'Glorious Food',
      Illustration: UnitIconGloriousFood,
      bgColor: 'bg-rose-50/50 hover:bg-rose-50 border-rose-200',
      isAvailable: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Student Greeting & Stats Strip */}
      <div className="bg-gradient-to-r from-sky-500 via-indigo-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sky-200 text-xs font-semibold uppercase tracking-wider">
              <span>{classRoom.name}</span>
              <span aria-hidden="true">·</span>
              <span>Class Code: {classRoom.classCode}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
              Welcome back, {student.fullName}!
            </h1>
            <p className="text-sm text-sky-100 max-w-xl">
              Choose a unit to start your English adventure!
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-3">
            <div className="bg-white/15 backdrop-blur-md rounded-2xl px-4 py-3 flex items-center gap-3 border border-white/20">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-bold shadow-xs text-lg">
                ⭐
              </div>
              <div>
                <div className="text-xs text-sky-100 font-medium">Total Stars</div>
                <div className="text-xl font-bold font-mono tabular-nums leading-tight">{progress.totalStars}</div>
              </div>
            </div>

            <div className="bg-white/15 backdrop-blur-md rounded-2xl px-4 py-3 flex items-center gap-3 border border-white/20">
              <div className="w-10 h-10 rounded-xl bg-indigo-300 text-indigo-950 flex items-center justify-center font-bold shadow-xs">
                <Trophy className="w-5 h-5 text-indigo-900" />
              </div>
              <div>
                <div className="text-xs text-sky-100 font-medium">Level</div>
                <div className="text-xl font-bold font-mono tabular-nums leading-tight">Level {progress.level}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Units Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 font-display">English Units</h2>
          <button
            onClick={() => onNavigate('my-achievements')}
            className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 cursor-pointer"
          >
            <span>My Achievements</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 5 Clean, Attractive Unit Cards - ONLY Illustration and Unit Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {units.map((unit) => {
            const UnitIcon = unit.Illustration;
            return (
              <div
                key={unit.id}
                onClick={() => {
                  if (unit.isAvailable) {
                    onSelectUnit(unit.id);
                  }
                }}
                className={`rounded-3xl border ${unit.bgColor} p-6 flex flex-col items-center justify-center text-center transition-all group ${
                  unit.isAvailable
                    ? 'shadow-xs hover:shadow-lg hover:-translate-y-1.5 cursor-pointer bg-white'
                    : 'opacity-70 cursor-not-allowed'
                }`}
              >
                {/* One attractive cartoon illustration */}
                <div className="w-28 h-28 sm:w-32 sm:h-32 mb-4 flex items-center justify-center transition-transform group-hover:scale-105">
                  <UnitIcon className="w-full h-full drop-shadow-xs" />
                </div>

                {/* ONLY The Unit Name */}
                <h3 className="text-lg font-extrabold text-slate-900 font-display group-hover:text-sky-600 transition-colors">
                  {unit.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
