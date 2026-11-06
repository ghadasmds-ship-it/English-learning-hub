import React from 'react';
import { TeacherAccount, ClassRoom } from '../../types';
import { storageService } from '../../services/storageService';
import { GraduationCap, Plus, Users, ArrowRight, Calendar, Hash } from 'lucide-react';

interface ClassesViewProps {
  teacher: TeacherAccount;
  onAddClassModal: () => void;
  onSelectClassStudents: (classId: string) => void;
}

export const ClassesView: React.FC<ClassesViewProps> = ({
  teacher,
  onAddClassModal,
  onSelectClassStudents
}) => {
  const classes = storageService.getTeacherClasses(teacher.id);
  const isReadOnly = storageService.isTeacherSubscriptionExpired(teacher.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            My Classes
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Unlimited class workspaces. Each class holds an independent roster and leaderboard.
          </p>
        </div>

        <button
          disabled={isReadOnly}
          onClick={onAddClassModal}
          className="py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all kid-button disabled:opacity-40 cursor-pointer self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Class</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((c) => {
          const classStudents = storageService.getTeacherStudents(teacher.id, c.id);
          return (
            <div
              key={c.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-6"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-xl bg-sky-100 text-sky-900 font-mono font-bold text-xs">
                    {c.classCode}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 font-display">
                  {c.name}
                </h3>
                <div className="text-xs text-slate-500 mt-1">
                  {c.stageLevel} · {c.grade} ({c.section})
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Academic Year:</span>
                    <span className="font-semibold text-slate-800">{c.academicYear}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Enrolled Students:</span>
                    <span className="font-bold text-slate-900 font-mono">{classStudents.length} Students</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onSelectClassStudents(c.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Users className="w-4 h-4 text-slate-500" />
                  <span>Manage Student Roster</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
