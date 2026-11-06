import React, { useState } from 'react';
import { TeacherAccount, ClassRoom, Student } from '../../types';
import { storageService } from '../../services/storageService';
import { downloadStudentLoginCardsPdf } from '../../services/pdfService';
import {
  Users,
  Search,
  Download,
  Trash2,
  KeyRound,
  FileText,
  Plus,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface StudentsViewProps {
  teacher: TeacherAccount;
  classes: ClassRoom[];
  onAddStudentsModal: () => void;
  onViewStudentReport: (student: Student) => void;
}

export const StudentsView: React.FC<StudentsViewProps> = ({
  teacher,
  classes,
  onAddStudentsModal,
  onViewStudentReport
}) => {
  const [selectedClassId, setSelectedClassId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteCandidate, setDeleteCandidate] = useState<Student | null>(null);

  const allStudents = storageService.getTeacherStudents(
    teacher.id,
    selectedClassId === 'all' ? undefined : selectedClassId
  );

  const filteredStudents = allStudents.filter(s =>
    s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentClassForDownload = classes.find(c => c.id === selectedClassId) || classes[0];

  const handleDownloadClassPasses = () => {
    if (!currentClassForDownload) return;
    const studentsToDownload = storageService.getTeacherStudents(teacher.id, currentClassForDownload.id);
    downloadStudentLoginCardsPdf(currentClassForDownload, teacher, studentsToDownload);
  };

  const handleConfirmDelete = () => {
    if (!deleteCandidate) return;
    storageService.deleteStudent(teacher.id, deleteCandidate.id);
    setDeleteCandidate(null);
  };

  const isReadOnly = storageService.isTeacherSubscriptionExpired(teacher.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            My Students Roster
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage student credentials, access passes, and individual learning records.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            disabled={allStudents.length === 0}
            onClick={handleDownloadClassPasses}
            className="py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer disabled:opacity-40"
          >
            <Download className="w-4 h-4 text-sky-600" />
            <span>Download Login Passes (PDF)</span>
          </button>

          <button
            disabled={isReadOnly || classes.length === 0}
            onClick={onAddStudentsModal}
            className="py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all kid-button disabled:opacity-40 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Enroll Students</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500">Filter Class:</span>
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="all">All Classes ({storageService.getTeacherStudents(teacher.id).length})</option>
            {classes.map(c => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.classCode})
              </option>
            ))}
          </select>
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student or username..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 grid grid-cols-12 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <span className="col-span-4">Student Name</span>
          <span className="col-span-3">Class &amp; Code</span>
          <span className="col-span-2">Username</span>
          <span className="col-span-1">Private PIN</span>
          <span className="col-span-2 text-right">Actions</span>
        </div>

        {filteredStudents.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            No students found matching your criteria.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredStudents.map((s) => {
              const studentClass = classes.find(c => c.id === s.classId);
              return (
                <div
                  key={s.id}
                  className="p-4 grid grid-cols-12 items-center hover:bg-slate-50/80 transition-colors text-xs"
                >
                  <div className="col-span-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-xs shrink-0">
                      {s.fullName.charAt(0)}
                    </span>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{s.fullName}</div>
                      <div className="text-[11px] text-slate-400">Enrolled: {new Date(s.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>

                  <div className="col-span-3">
                    <span className="font-semibold text-slate-800 block truncate">
                      {studentClass?.name || 'Class'}
                    </span>
                    <span className="font-mono text-sky-600 font-bold text-[11px]">
                      {studentClass?.classCode}
                    </span>
                  </div>

                  <div className="col-span-2 font-mono font-semibold text-slate-700">
                    @{s.username}
                  </div>

                  <div className="col-span-1 font-mono font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded inline-block text-center w-fit">
                    {s.pin}
                  </div>

                  <div className="col-span-2 flex items-center justify-end gap-2">
                    <button
                      onClick={() => onViewStudentReport(s)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-sky-600 hover:bg-sky-50 transition-colors cursor-pointer"
                      title="View Student Report"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                    <button
                      disabled={isReadOnly}
                      onClick={() => setDeleteCandidate(s)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-30 cursor-pointer"
                      title="Delete Student"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 border border-slate-200 shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-900">Confirm Deletion</h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to remove <span className="font-bold text-slate-800">{deleteCandidate.fullName}</span>? This student will no longer be able to log in.
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setDeleteCandidate(null)}
                className="flex-1 py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold"
              >
                Delete Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
