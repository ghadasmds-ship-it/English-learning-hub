import React, { useState, useEffect } from 'react';
import { UserRole, TeacherAccount, Student, ClassRoom, StudentProgress } from './types';
import { storageService } from './services/storageService';
import { Navbar } from './components/common/Navbar';
import { StaffLogin } from './components/common/StaffLogin';
import { observeStaffSession, signOutStaff, type StaffSession } from './services/staffAuthService';
import { StudentHome } from './components/student/StudentHome';
import { StudentLogin } from './components/student/StudentLogin';
import { UnitOverview } from './components/student/UnitOverview';
import { MonthsHub } from './components/student/months/MonthsHub';
import { NumbersHub } from './components/student/numbers/NumbersHub';
import { VocabularyHub } from './components/student/vocabulary/VocabularyHub';
import { StoryBook } from './components/student/story/StoryBook';
import { UnitReview } from './components/student/review/UnitReview';
import { FinalUnitQuiz } from './components/student/quiz/FinalUnitQuiz';
import { MyAchievements } from './components/student/achievements/MyAchievements';
import { ClassLeaderboard } from './components/student/leaderboard/ClassLeaderboard';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { ClassesView } from './components/teacher/ClassesView';
import { StudentsView } from './components/teacher/StudentsView';
import { TeacherReportsView } from './components/teacher/TeacherReportsView';
import { SubscriptionView } from './components/teacher/SubscriptionView';
import { AddClassModal } from './components/teacher/AddClassModal';
import { AddStudentsModal } from './components/teacher/AddStudentsModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ParentReportView } from './components/parent/ParentReportView';
import { Sparkles, Shield, UserCheck, CheckCircle2, RefreshCw } from 'lucide-react';

export function App() {
  const demoMode = import.meta.env.DEV && import.meta.env.VITE_ENABLE_DEMO === 'true';
  const [staffSession, setStaffSession] = useState<StaffSession | null>(null);
  const [showStaffLogin, setShowStaffLogin] = useState(false);
  const [staffError, setStaffError] = useState('');

  useEffect(() => {
    if (demoMode) return;
    try {
      return observeStaffSession(session => {
        setStaffSession(session);
        if (session) {
          setShowStaffLogin(false);
          setCurrentRole(session.role);
          setCurrentView(session.role === 'admin' ? 'admin-dashboard' : 'teacher-dashboard');
        }
      }, error => setStaffError(error.message));
    } catch (error) {
      setStaffError(error instanceof Error ? error.message : String(error));
    }
  }, [demoMode]);

  // Roles & Authentication State
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  const [teachers, setTeachers] = useState<TeacherAccount[]>(storageService.getTeachers());
  const [activeTeacherIndex, setActiveTeacherIndex] = useState(0);
  const activeTeacher = demoMode ? (teachers[activeTeacherIndex] || teachers[0]) : (staffSession?.role === 'teacher' ? staffSession.teacher : undefined);

  // Active Student State (Default Mona)
  const defaultStudent = storageService.getStudentById('student_mona') || storageService.getTeacherStudents(activeTeacher?.id || '')[0];
  const [activeStudent, setActiveStudent] = useState<Student | undefined>(defaultStudent);
  const [studentLoggedIn, setStudentLoggedIn] = useState(demoMode);

  // Active Class State
  const teacherClasses = activeTeacher ? storageService.getTeacherClasses(activeTeacher.id) : [];
  const activeStudentClass = activeStudent ? teacherClasses.find(c => c.id === activeStudent.classId) || teacherClasses[0] : teacherClasses[0];

  // Student Progress State
  const [studentProgress, setStudentProgress] = useState<StudentProgress>(
    activeStudent ? storageService.getStudentProgress(activeStudent.id) : ({} as any)
  );

  // Views Navigation
  const [currentView, setCurrentView] = useState<string>('student-home');
  const [parentReportToken, setParentReportToken] = useState<string | null>(null);

  // Modals
  const [isAddClassModalOpen, setIsAddClassModalOpen] = useState(false);
  const [isAddStudentsModalOpen, setIsAddStudentsModalOpen] = useState(false);
  const [selectedStudentForReport, setSelectedStudentForReport] = useState<Student | undefined>(undefined);

  // Check URL query parameters for parent report link (?parentReportToken=...)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('parentReportToken');
      if (token) {
        setParentReportToken(token);
        setCurrentRole('parent');
      }
    }
  }, []);

  // Sync progress when active student changes
  useEffect(() => {
    if (activeStudent) {
      setStudentProgress(storageService.getStudentProgress(activeStudent.id));
    }
  }, [activeStudent]);

  // Handler for role changes
  const handleRoleChange = (role: UserRole) => {
    if (!demoMode && (role === 'teacher' || role === 'admin') && staffSession?.role !== role) {
      setShowStaffLogin(true);
      return;
    }
    setCurrentRole(role);
    if (role === 'teacher') {
      setCurrentView('teacher-dashboard');
    } else if (role === 'admin') {
      setCurrentView('admin-dashboard');
    } else if (role === 'student') {
      setCurrentView('student-home');
    }
  };

  const handleStudentLoginSuccess = (student: Student, classRoom: ClassRoom) => {
    setActiveStudent(student);
    setStudentLoggedIn(true);
    setStudentProgress(storageService.getStudentProgress(student.id));
    setCurrentView('student-home');
  };

  const handleLogout = () => {
    if (!demoMode && (currentRole === 'teacher' || currentRole === 'admin')) {
      void signOutStaff().catch(error => setStaffError(String(error)));
      setStaffSession(null);
      setCurrentRole('student');
      setStudentLoggedIn(false);
      return;
    }
    if (currentRole === 'student') {
      setStudentLoggedIn(false);
    } else {
      // Toggle teacher or switch role
      handleRoleChange('student');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-sky-100 selection:text-sky-900">
      {/* Top Bar Navigation (Strict 3-zone contract) */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        activeTeacher={activeTeacher}
        activeStudent={activeStudent}
        currentView={currentView}
        onNavigate={setCurrentView}
        onLogout={handleLogout}
      />

      {!demoMode && staffError && <div role="alert" className="bg-amber-50 p-3 text-amber-900 text-sm">Staff authentication: {staffError}</div>}
      {demoMode && <div className="bg-amber-100 text-amber-950 text-center p-2 text-xs font-semibold">LOCAL DEMO ONLY — Sample data and accounts are not secure or production-ready.</div>}
      {/* Tenant Isolation Switcher Banner for Testing Multi-Tenancy */}
      {demoMode && currentRole === 'teacher' && teachers.length > 1 && (
        <div className="bg-indigo-900 text-indigo-100 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-indigo-800">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="font-semibold">Tenant Isolation Verification:</span>
            <span>Switch teacher account to verify separate classrooms &amp; rosters:</span>
          </div>
          <div className="flex items-center gap-2">
            {teachers.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTeacherIndex(idx);
                  setCurrentView('teacher-dashboard');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeTeacherIndex === idx
                    ? 'bg-sky-500 text-white shadow-xs'
                    : 'bg-indigo-800 text-indigo-200 hover:bg-indigo-700'
                }`}
              >
                {t.fullName} ({storageService.getTeacherClasses(t.id).length} classes)
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Experience Body */}
      <main className="flex-1">
        {showStaffLogin && !demoMode && <StaffLogin onSuccess={session => {
          setStaffSession(session);
          setShowStaffLogin(false);
          setCurrentRole(session.role);
          setCurrentView(session.role === 'admin' ? 'admin-dashboard' : 'teacher-dashboard');
        }} onCancel={() => setShowStaffLogin(false)} />}
        {!demoMode && staffSession && (currentRole === 'teacher' || currentRole === 'admin') && !showStaffLogin && (
          <section className="max-w-2xl mx-auto my-12 p-6 bg-white rounded-2xl border" role="status">
            <h2 className="text-xl font-bold">Account verified</h2>
            <p className="mt-2 text-slate-600">Your identity is authenticated. The legacy browser-local teacher dashboards are disabled until their data operations are migrated to Firestore. This protects other teachers' records.</p>
          </section>
        )}
        {/* ================= PARENT REPORT EXPERIENCE ================= */}
        {demoMode && currentRole === 'parent' && parentReportToken && (
          <ParentReportView
            token={parentReportToken}
            onExit={() => {
              setParentReportToken(null);
              handleRoleChange('student');
            }}
          />
        )}

        {/* ================= PLATFORM ADMIN / OWNER ================= */}
        {demoMode && currentRole === 'admin' && (
          <AdminDashboard />
        )}

        {/* ================= TEACHER EXPERIENCE ================= */}
        {demoMode && currentRole === 'teacher' && (
          <>
            {currentView === 'teacher-dashboard' && (
              <TeacherDashboard
                teacher={activeTeacher}
                onNavigate={setCurrentView}
                onAddClassModal={() => setIsAddClassModalOpen(true)}
                onAddStudentModal={() => setIsAddStudentsModalOpen(true)}
              />
            )}

            {currentView === 'my-classes' && (
              <ClassesView
                teacher={activeTeacher}
                onAddClassModal={() => setIsAddClassModalOpen(true)}
                onSelectClassStudents={() => setCurrentView('my-students')}
              />
            )}

            {currentView === 'my-students' && (
              <StudentsView
                teacher={activeTeacher}
                classes={teacherClasses}
                onAddStudentsModal={() => setIsAddStudentsModalOpen(true)}
                onViewStudentReport={(s) => {
                  setSelectedStudentForReport(s);
                  setCurrentView('reports-analytics');
                }}
              />
            )}

            {currentView === 'reports-analytics' && (
              <TeacherReportsView
                teacher={activeTeacher}
                classes={teacherClasses}
                selectedStudent={selectedStudentForReport}
                onOpenParentLinkTest={(token) => {
                  setParentReportToken(token);
                  setCurrentRole('parent');
                }}
              />
            )}

            {currentView === 'subscription' && (
              <SubscriptionView
                teacher={activeTeacher}
                onRefresh={() => setTeachers(storageService.getTeachers())}
              />
            )}
          </>
        )}

        {/* ================= STUDENT EXPERIENCE ================= */}
        {!showStaffLogin && currentRole === 'student' && (
          <>
            {!studentLoggedIn || !activeStudent ? (
              <StudentLogin
                onSuccess={handleStudentLoginSuccess}
                onSwitchToTeacher={() => handleRoleChange('teacher')}
              />
            ) : (
              <>
                {currentView === 'student-home' && activeStudentClass && (
                  <StudentHome
                    student={activeStudent}
                    classRoom={activeStudentClass}
                    progress={studentProgress}
                    onSelectUnit={() => setCurrentView('welcome-unit')}
                    onNavigate={setCurrentView}
                  />
                )}

                {currentView === 'welcome-unit' && activeStudentClass && (
                  <UnitOverview
                    student={activeStudent}
                    classRoom={activeStudentClass}
                    progress={studentProgress}
                    onBackToUnits={() => setCurrentView('student-home')}
                    onSelectSection={(sec) => {
                      if (sec === 'months') setCurrentView('months-hub');
                      else if (sec === 'numbers') setCurrentView('numbers-hub');
                      else if (sec === 'vocabulary') setCurrentView('vocabulary-hub');
                      else if (sec === 'story') setCurrentView('story-book');
                      else if (sec === 'review') setCurrentView('unit-review');
                      else if (sec === 'quiz') setCurrentView('final-quiz');
                    }}
                  />
                )}

                {currentView === 'months-hub' && (
                  <MonthsHub
                    student={activeStudent}
                    progress={studentProgress}
                    onBack={() => setCurrentView('welcome-unit')}
                    onProgressUpdated={setStudentProgress}
                  />
                )}

                {currentView === 'numbers-hub' && (
                  <NumbersHub
                    student={activeStudent}
                    progress={studentProgress}
                    onBack={() => setCurrentView('welcome-unit')}
                    onProgressUpdated={setStudentProgress}
                  />
                )}

                {currentView === 'vocabulary-hub' && (
                  <VocabularyHub
                    student={activeStudent}
                    progress={studentProgress}
                    onBack={() => setCurrentView('welcome-unit')}
                    onProgressUpdated={setStudentProgress}
                  />
                )}

                {currentView === 'story-book' && (
                  <StoryBook
                    student={activeStudent}
                    progress={studentProgress}
                    onBack={() => setCurrentView('welcome-unit')}
                    onProgressUpdated={setStudentProgress}
                  />
                )}

                {currentView === 'unit-review' && (
                  <UnitReview
                    student={activeStudent}
                    progress={studentProgress}
                    onBack={() => setCurrentView('welcome-unit')}
                    onStartFinalQuiz={() => setCurrentView('final-quiz')}
                    onProgressUpdated={setStudentProgress}
                  />
                )}

                {currentView === 'final-quiz' && (
                  <FinalUnitQuiz
                    student={activeStudent}
                    progress={studentProgress}
                    onBack={() => setCurrentView('welcome-unit')}
                    onProgressUpdated={setStudentProgress}
                  />
                )}

                {currentView === 'my-achievements' && activeStudentClass && activeTeacher && (
                  <MyAchievements
                    student={activeStudent}
                    classRoom={activeStudentClass}
                    teacher={activeTeacher}
                    progress={studentProgress}
                    onBack={() => setCurrentView('student-home')}
                  />
                )}

                {currentView === 'class-leaderboard' && activeStudentClass && (
                  <ClassLeaderboard
                    student={activeStudent}
                    classRoom={activeStudentClass}
                    progress={studentProgress}
                    onBack={() => setCurrentView('student-home')}
                  />
                )}
              </>
            )}
          </>
        )}
      </main>

      {/* Global Modals */}
      {demoMode && activeTeacher && (
        <>
          <AddClassModal
            teacher={activeTeacher}
            isOpen={isAddClassModalOpen}
            onClose={() => setIsAddClassModalOpen(false)}
            onClassAdded={() => {
              // Trigger view refresh
              setCurrentView('my-classes');
            }}
          />

          <AddStudentsModal
            teacher={activeTeacher}
            classes={teacherClasses}
            isOpen={isAddStudentsModalOpen}
            onClose={() => setIsAddStudentsModalOpen(false)}
            onStudentsAdded={() => {
              // Refresh roster
              setCurrentView('my-students');
            }}
          />
        </>
      )}

      {/* Quiet Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            English Learning Hub © 2026. Welcome Unit Pilot Edition.
          </div>
          {demoMode && <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Multi-Tenant Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Firestore Rules Configured</span>
            <span aria-hidden="true">·</span>
            <span>Zero-PII Isolation</span>
          </div>}
        </div>
      </footer>
    </div>
  );
}
export default App;
