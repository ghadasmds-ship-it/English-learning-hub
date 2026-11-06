import React, { useState } from 'react';
import { TeacherAccount, ClassRoom } from '../../types';
import { storageService } from '../../services/storageService';
import { X, Plus, GraduationCap, AlertCircle } from 'lucide-react';

interface AddClassModalProps {
  teacher: TeacherAccount;
  isOpen: boolean;
  onClose: () => void;
  onClassAdded: (newClass: ClassRoom) => void;
}

export const AddClassModal: React.FC<AddClassModalProps> = ({
  teacher,
  isOpen,
  onClose,
  onClassAdded
}) => {
  const [name, setName] = useState('');
  const [stageLevel, setStageLevel] = useState('Primary / Elementary');
  const [grade, setGrade] = useState('Grade 4');
  const [section, setSection] = useState('Section A');
  const [academicYear, setAcademicYear] = useState('2026-2027');
  const [classCode, setClassCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please provide a class name.');
      return;
    }

    const code = classCode.trim() ? classCode.trim().toUpperCase() : `ENG-${Math.floor(100 + Math.random() * 900)}`;

    const res = storageService.addClass(teacher.id, {
      name: name.trim(),
      stageLevel,
      grade,
      section,
      academicYear,
      classCode: code
    });

    if (res.success && res.classRoom) {
      onClassAdded(res.classRoom);
      onClose();
    } else {
      setError(res.error || 'Failed to create class.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-xl relative animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">Add New Class</h2>
              <p className="text-xs text-slate-500">Create a dedicated class workspace with its own student roster</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Class Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Grade 4 - Diamond Group"
              required
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Stage / Level
              </label>
              <select
                value={stageLevel}
                onChange={(e) => setStageLevel(e.target.value)}
                className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
              >
                <option value="Primary / Elementary">Primary / Elementary</option>
                <option value="Kindergarten / Early">Kindergarten / Early</option>
                <option value="Intermediate">Intermediate</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Grade
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
              >
                <option value="Grade 1">Grade 1</option>
                <option value="Grade 2">Grade 2</option>
                <option value="Grade 3">Grade 3</option>
                <option value="Grade 4">Grade 4</option>
                <option value="Grade 5">Grade 5</option>
                <option value="Grade 6">Grade 6</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Section / Division
              </label>
              <input
                type="text"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                placeholder="e.g. Section A"
                className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Academic Year
              </label>
              <input
                type="text"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                placeholder="e.g. 2026-2027"
                className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Class Code (Students use this to log in)
            </label>
            <input
              type="text"
              value={classCode}
              onChange={(e) => setClassCode(e.target.value.toUpperCase())}
              placeholder="e.g. ENG-4C (leave empty to auto-generate)"
              className="w-full px-4 py-2.5 text-sm uppercase font-mono rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2.5 px-5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-xs transition-all kid-button cursor-pointer"
            >
              Create Class Workspace
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
