import {
  TeacherAccount,
  ClassRoom,
  Student,
  StudentProgress,
  LearningAttempt,
  License,
  ParentReportLink,
  PlatformSettings
} from '../types';
import { ACHIEVEMENTS_DATA, VOCABULARY_DATA } from '../data/welcomeUnitData';

const STORAGE_KEYS = {
  TEACHERS: 'elh_teachers_v1',
  CLASSES: 'elh_classes_v1',
  STUDENTS: 'elh_students_v1',
  PROGRESS: 'elh_progress_v1',
  ATTEMPTS: 'elh_attempts_v1',
  LICENSES: 'elh_licenses_v1',
  PARENT_LINKS: 'elh_parent_links_v1',
  SETTINGS: 'elh_settings_v1',
  CURRENT_USER: 'elh_current_user_v1'
};

class StorageService {
  constructor() {
    this.ensureInitialized();
  }

  private getItem<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  private setItem<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('LocalStorage write error:', e);
    }
  }

  // Initial Seed Data Setup
  private ensureInitialized(): void {
    if (typeof window === 'undefined') return;

    const existingTeachers = this.getItem<TeacherAccount[]>(STORAGE_KEYS.TEACHERS, []);
    if (existingTeachers.length > 0) return; // Already seeded

    // 1. Licenses
    const initialLicenses: License[] = [
      {
        id: 'lic_sarah_2026',
        code: 'TEACH-2026-X89K',
        teacherId: 'teacher_sarah',
        teacherEmail: 'sarah.johnson@school.edu',
        durationMonths: 12,
        createdAt: '2026-01-15T08:00:00.000Z',
        activatedAt: '2026-01-15T08:00:00.000Z',
        expiresAt: '2027-01-15T08:00:00.000Z',
        status: 'active',
        priceUsd: 149
      },
      {
        id: 'lic_david_2026',
        code: 'TEACH-2026-D94A',
        teacherId: 'teacher_david',
        teacherEmail: 'david.miller@school.edu',
        durationMonths: 12,
        createdAt: '2026-02-01T08:00:00.000Z',
        activatedAt: '2026-02-01T08:00:00.000Z',
        expiresAt: '2027-02-01T08:00:00.000Z',
        status: 'active',
        priceUsd: 149
      },
      {
        id: 'lic_spare_code_1',
        code: 'TEACH-2026-NEW1',
        durationMonths: 12,
        createdAt: '2026-03-01T08:00:00.000Z',
        status: 'available',
        priceUsd: 149
      },
      {
        id: 'lic_spare_code_2',
        code: 'TEACH-2026-NEW2',
        durationMonths: 12,
        createdAt: '2026-03-01T08:00:00.000Z',
        status: 'available',
        priceUsd: 149
      }
    ];

    // 2. Teachers
    const initialTeachers: TeacherAccount[] = [
      {
        id: 'teacher_sarah',
        email: 'sarah.johnson@school.edu',
        fullName: 'Mrs. Sarah Johnson',
        schoolName: 'Al-Noor International Academy',
        createdAt: '2026-01-15T08:00:00.000Z',
        licenseId: 'lic_sarah_2026',
        licenseExpiresAt: '2027-01-15T08:00:00.000Z',
        isReadOnly: false
      },
      {
        id: 'teacher_david',
        email: 'david.miller@school.edu',
        fullName: 'Mr. David Miller',
        schoolName: 'Riyadh Pioneer School',
        createdAt: '2026-02-01T08:00:00.000Z',
        licenseId: 'lic_david_2026',
        licenseExpiresAt: '2027-02-01T08:00:00.000Z',
        isReadOnly: false
      }
    ];

    // 3. Classes (Strict Tenant Isolation: Sarah owns class_4a & class_4b; David owns class_david_5a)
    const initialClasses: ClassRoom[] = [
      {
        id: 'class_4a',
        teacherId: 'teacher_sarah',
        name: 'Grade 4 - Emerald Section',
        stageLevel: 'Primary / Elementary',
        grade: 'Grade 4',
        section: 'Section A',
        academicYear: '2026-2027',
        classCode: 'ENG-4A',
        createdAt: '2026-01-16T09:00:00.000Z'
      },
      {
        id: 'class_4b',
        teacherId: 'teacher_sarah',
        name: 'Grade 4 - Sapphire Section',
        stageLevel: 'Primary / Elementary',
        grade: 'Grade 4',
        section: 'Section B',
        academicYear: '2026-2027',
        classCode: 'ENG-4B',
        createdAt: '2026-01-16T10:00:00.000Z'
      },
      {
        id: 'class_david_5a',
        teacherId: 'teacher_david',
        name: 'Grade 5 - Falcon Pioneers',
        stageLevel: 'Primary / Elementary',
        grade: 'Grade 5',
        section: 'Section A',
        academicYear: '2026-2027',
        classCode: 'ENG-5A',
        createdAt: '2026-02-02T09:00:00.000Z'
      }
    ];

    // 4. Students
    const initialStudents: Student[] = [
      {
        id: 'student_mona',
        classId: 'class_4a',
        teacherId: 'teacher_sarah',
        fullName: 'Mona Al-Mansoor',
        username: 'mona401',
        pin: '1234',
        avatarId: 'avatar_1',
        createdAt: '2026-01-20T10:00:00.000Z'
      },
      {
        id: 'student_tariq',
        classId: 'class_4a',
        teacherId: 'teacher_sarah',
        fullName: 'Tariq Khalid',
        username: 'tariq402',
        pin: '2345',
        avatarId: 'avatar_2',
        createdAt: '2026-01-20T10:05:00.000Z'
      },
      {
        id: 'student_layla',
        classId: 'class_4a',
        teacherId: 'teacher_sarah',
        fullName: 'Layla Omar',
        username: 'layla403',
        pin: '3456',
        avatarId: 'avatar_3',
        createdAt: '2026-01-20T10:10:00.000Z'
      },
      {
        id: 'student_yousef',
        classId: 'class_4a',
        teacherId: 'teacher_sarah',
        fullName: 'Yousef Fahad',
        username: 'yousef404',
        pin: '4567',
        avatarId: 'avatar_4',
        createdAt: '2026-01-20T10:15:00.000Z'
      },
      {
        id: 'student_reem',
        classId: 'class_4a',
        teacherId: 'teacher_sarah',
        fullName: 'Reem Bandar',
        username: 'reem405',
        pin: '5678',
        avatarId: 'avatar_5',
        createdAt: '2026-01-20T10:20:00.000Z'
      },
      // Student in David's class
      {
        id: 'student_omar_david',
        classId: 'class_david_5a',
        teacherId: 'teacher_david',
        fullName: 'Omar Al-Ghamdi',
        username: 'omar501',
        pin: '9876',
        avatarId: 'avatar_6',
        createdAt: '2026-02-05T10:00:00.000Z'
      }
    ];

    // 5. Initial Student Progress (Realistic recorded achievements for Mona)
    const initialProgressMap: Record<string, StudentProgress> = {
      student_mona: {
        studentId: 'student_mona',
        classId: 'class_4a',
        teacherId: 'teacher_sarah',
        totalStars: 42,
        level: 4,
        updatedAt: '2026-11-05T14:30:00.000Z',
        monthsRecognitionMastered: true,
        monthsSequenceMastered: true,
        monthsPronunciationScore: 92,
        monthsSpellingMastered: true,
        monthsFullMastery: true,
        numbersRecognitionMastered: true,
        numbersReadingMastered: true,
        numbersWritingMastered: true,
        numbersDictationMastered: true,
        numbersFullMastery: true,
        wordMastery: {
          ago: { learned: true, matchCorrect: true, listenCorrect: true, spellingCorrect: true, sentenceCorrect: true, challengeScore: 95, mastered: true, needsReview: false },
          calendar: { learned: true, matchCorrect: true, listenCorrect: true, spellingCorrect: true, sentenceCorrect: true, challengeScore: 100, mastered: true, needsReview: false },
          date: { learned: true, matchCorrect: true, listenCorrect: true, spellingCorrect: true, sentenceCorrect: true, challengeScore: 90, mastered: true, needsReview: false },
          how_long: { learned: true, matchCorrect: true, listenCorrect: true, spellingCorrect: true, sentenceCorrect: true, challengeScore: 88, mastered: true, needsReview: false },
          early: { learned: true, matchCorrect: true, listenCorrect: true, spellingCorrect: true, sentenceCorrect: true, challengeScore: 92, mastered: true, needsReview: false },
          late: { learned: true, matchCorrect: true, listenCorrect: true, spellingCorrect: true, sentenceCorrect: true, challengeScore: 94, mastered: true, needsReview: false },
          time: { learned: true, matchCorrect: true, listenCorrect: true, spellingCorrect: true, sentenceCorrect: true, challengeScore: 100, mastered: true, needsReview: false },
          year: { learned: true, matchCorrect: true, listenCorrect: true, spellingCorrect: true, sentenceCorrect: true, challengeScore: 95, mastered: true, needsReview: false },
          festival: { learned: true, matchCorrect: true, listenCorrect: true, spellingCorrect: true, sentenceCorrect: true, challengeScore: 90, mastered: true, needsReview: false },
          have_no_fear: { learned: true, matchCorrect: true, listenCorrect: true, spellingCorrect: true, sentenceCorrect: true, challengeScore: 92, mastered: true, needsReview: false },
          prepare: { learned: true, matchCorrect: true, listenCorrect: true, spellingCorrect: true, sentenceCorrect: true, challengeScore: 85, mastered: true, needsReview: false },
          comic_book: { learned: true, matchCorrect: true, listenCorrect: true, spellingCorrect: true, sentenceCorrect: true, challengeScore: 95, mastered: true, needsReview: false },
          lion: { learned: true, matchCorrect: true, listenCorrect: true, spellingCorrect: true, sentenceCorrect: true, challengeScore: 100, mastered: true, needsReview: false },
          mountain: { learned: true, matchCorrect: true, listenCorrect: true, spellingCorrect: true, sentenceCorrect: true, challengeScore: 90, mastered: true, needsReview: false },
          rainbow: { learned: true, matchCorrect: true, listenCorrect: true, spellingCorrect: true, sentenceCorrect: true, challengeScore: 96, mastered: true, needsReview: false },
          snail: { learned: true, matchCorrect: true, listenCorrect: true, spellingCorrect: true, sentenceCorrect: true, challengeScore: 92, mastered: true, needsReview: false },
          tall: { learned: true, matchCorrect: true, listenCorrect: true, spellingCorrect: true, sentenceCorrect: true, challengeScore: 88, mastered: true, needsReview: false },
          tired: { learned: true, matchCorrect: true, listenCorrect: true, spellingCorrect: true, sentenceCorrect: true, challengeScore: 85, mastered: true, needsReview: false }
        },
        storyPagesRead: [1, 2, 3, 4, 5],
        storyReadingScores: { 1: 95, 2: 90, 3: 92, 4: 94, 5: 96 },
        storyMasterTrophyAwarded: true,
        skills: {
          vocabularyRecognition: 94,
          meaning: 92,
          listening: 90,
          pronunciation: 89,
          spellingWriting: 93,
          readingFluency: 91
        },
        earnedAchievementIds: [
          'first_step',
          'calendar_scholar',
          'number_wizard',
          'perfect_speller',
          'speaking_champion',
          'vocabulary_champion',
          'story_master',
          'unit_master'
        ]
      },
      student_tariq: {
        studentId: 'student_tariq',
        classId: 'class_4a',
        teacherId: 'teacher_sarah',
        totalStars: 31,
        level: 3,
        updatedAt: '2026-11-05T11:00:00.000Z',
        monthsRecognitionMastered: true,
        monthsSequenceMastered: true,
        monthsPronunciationScore: 84,
        monthsSpellingMastered: true,
        monthsFullMastery: true,
        numbersRecognitionMastered: true,
        numbersReadingMastered: true,
        numbersWritingMastered: false,
        numbersDictationMastered: true,
        numbersFullMastery: false,
        wordMastery: {
          ago: { learned: true, matchCorrect: true, listenCorrect: true, spellingCorrect: true, sentenceCorrect: true, challengeScore: 85, mastered: true, needsReview: false },
          calendar: { learned: true, matchCorrect: true, listenCorrect: true, spellingCorrect: false, sentenceCorrect: true, challengeScore: 70, mastered: false, needsReview: true }
        },
        storyPagesRead: [1, 2, 3],
        storyReadingScores: { 1: 85, 2: 80, 3: 82 },
        storyMasterTrophyAwarded: false,
        skills: {
          vocabularyRecognition: 82,
          meaning: 80,
          listening: 85,
          pronunciation: 78,
          spellingWriting: 72,
          readingFluency: 75
        },
        earnedAchievementIds: ['first_step', 'calendar_scholar', 'speaking_champion']
      },
      student_layla: {
        studentId: 'student_layla',
        classId: 'class_4a',
        teacherId: 'teacher_sarah',
        totalStars: 24,
        level: 2,
        updatedAt: '2026-11-04T09:00:00.000Z',
        monthsRecognitionMastered: true,
        monthsSequenceMastered: false, // Needs order mastery!
        monthsPronunciationScore: 78,
        monthsSpellingMastered: true,
        monthsFullMastery: false,
        numbersRecognitionMastered: true,
        numbersReadingMastered: true,
        numbersWritingMastered: false,
        numbersDictationMastered: false,
        numbersFullMastery: false,
        wordMastery: {},
        storyPagesRead: [1, 2],
        storyReadingScores: { 1: 80, 2: 75 },
        storyMasterTrophyAwarded: false,
        skills: {
          vocabularyRecognition: 74,
          meaning: 70,
          listening: 78,
          pronunciation: 75,
          spellingWriting: 68,
          readingFluency: 70
        },
        earnedAchievementIds: ['first_step']
      }
    };

    // 6. Parent Report Link for Mona
    const initialParentLinks: ParentReportLink[] = [
      {
        id: 'link_mona_parent',
        token: 'rpt_mona_welcome_pilot_token',
        studentId: 'student_mona',
        teacherId: 'teacher_sarah',
        classId: 'class_4a',
        createdAt: '2026-11-01T08:00:00.000Z',
        expiresAt: '2026-12-01T08:00:00.000Z',
        isRevoked: false
      }
    ];

    // 7. Platform Settings
    const initialSettings: PlatformSettings = {
      subscriptionPriceYearly: 149,
      currency: 'USD',
      defaultDurationMonths: 12,
      allowedMaxClassesPerTeacher: 20
    };

    this.setItem(STORAGE_KEYS.LICENSES, initialLicenses);
    this.setItem(STORAGE_KEYS.TEACHERS, initialTeachers);
    this.setItem(STORAGE_KEYS.CLASSES, initialClasses);
    this.setItem(STORAGE_KEYS.STUDENTS, initialStudents);
    this.setItem(STORAGE_KEYS.PROGRESS, initialProgressMap);
    this.setItem(STORAGE_KEYS.PARENT_LINKS, initialParentLinks);
    this.setItem(STORAGE_KEYS.SETTINGS, initialSettings);
  }

  // Multi-Tenant Isolation: Teachers
  public getTeachers(): TeacherAccount[] {
    return this.getItem<TeacherAccount[]>(STORAGE_KEYS.TEACHERS, []);
  }

  public getTeacher(teacherId: string): TeacherAccount | undefined {
    return this.getTeachers().find(t => t.id === teacherId);
  }

  public updateTeacher(updated: TeacherAccount): void {
    const list = this.getTeachers();
    const idx = list.findIndex(t => t.id === updated.id);
    if (idx !== -1) {
      list[idx] = updated;
    } else {
      list.push(updated);
    }
    this.setItem(STORAGE_KEYS.TEACHERS, list);
  }

  // Licensing & Subscription Checks
  public getLicenses(): License[] {
    return this.getItem<License[]>(STORAGE_KEYS.LICENSES, []);
  }

  public saveLicenses(licenses: License[]): void {
    this.setItem(STORAGE_KEYS.LICENSES, licenses);
  }

  public activateLicense(teacherId: string, code: string): { success: boolean; message: string; expiresAt?: string } {
    const licenses = this.getLicenses();
    const license = licenses.find(l => l.code.trim().toUpperCase() === code.trim().toUpperCase());

    if (!license) {
      return { success: false, message: 'Invalid activation code. Please check your purchase receipt.' };
    }

    if (license.status === 'revoked') {
      return { success: false, message: 'This activation code has been revoked by administration.' };
    }

    if (license.status === 'active' && license.teacherId && license.teacherId !== teacherId) {
      return { success: false, message: 'This activation code has already been registered to another teacher account.' };
    }

    const now = new Date();
    const expires = new Date();
    expires.setMonth(now.getMonth() + (license.durationMonths || 12));
    const expiresAt = expires.toISOString();

    license.status = 'active';
    license.teacherId = teacherId;
    license.activatedAt = now.toISOString();
    license.expiresAt = expiresAt;
    this.saveLicenses(licenses);

    const teacher = this.getTeacher(teacherId);
    if (teacher) {
      teacher.licenseId = license.id;
      teacher.licenseExpiresAt = expiresAt;
      teacher.isReadOnly = false;
      this.updateTeacher(teacher);
    }

    return { success: true, message: 'License successfully activated! Valid for 12 months.', expiresAt };
  }

  public isTeacherSubscriptionExpired(teacherId: string): boolean {
    const teacher = this.getTeacher(teacherId);
    if (!teacher || !teacher.licenseExpiresAt) return true;
    return new Date(teacher.licenseExpiresAt).getTime() < Date.now();
  }

  // Tenant Isolation: Classes
  public getTeacherClasses(teacherId: string): ClassRoom[] {
    const classes = this.getItem<ClassRoom[]>(STORAGE_KEYS.CLASSES, []);
    return classes.filter(c => c.teacherId === teacherId);
  }

  public addClass(teacherId: string, classData: Omit<ClassRoom, 'id' | 'teacherId' | 'createdAt'>): { success: boolean; classRoom?: ClassRoom; error?: string } {
    if (this.isTeacherSubscriptionExpired(teacherId)) {
      return { success: false, error: 'Subscription expired. Teacher account is in read-only mode.' };
    }

    const classes = this.getItem<ClassRoom[]>(STORAGE_KEYS.CLASSES, []);
    const newClass: ClassRoom = {
      ...classData,
      id: `class_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      teacherId,
      createdAt: new Date().toISOString()
    };
    classes.push(newClass);
    this.setItem(STORAGE_KEYS.CLASSES, classes);
    return { success: true, classRoom: newClass };
  }

  // Tenant Isolation: Students
  public getTeacherStudents(teacherId: string, classId?: string): Student[] {
    const students = this.getItem<Student[]>(STORAGE_KEYS.STUDENTS, []);
    let filtered = students.filter(s => s.teacherId === teacherId);
    if (classId) {
      filtered = filtered.filter(s => s.classId === classId);
    }
    return filtered;
  }

  public getStudentById(studentId: string): Student | undefined {
    const students = this.getItem<Student[]>(STORAGE_KEYS.STUDENTS, []);
    return students.find(s => s.id === studentId);
  }

  public addStudents(teacherId: string, classId: string, studentNames: string[]): { success: boolean; added: Student[]; duplicates: string[]; error?: string } {
    if (this.isTeacherSubscriptionExpired(teacherId)) {
      return { success: false, added: [], duplicates: [], error: 'Subscription expired. Creation of students is disabled.' };
    }

    const allStudents = this.getItem<Student[]>(STORAGE_KEYS.STUDENTS, []);
    const classStudents = allStudents.filter(s => s.classId === classId);

    const added: Student[] = [];
    const duplicates: string[] = [];

    studentNames.forEach((rawName, index) => {
      const name = rawName.trim();
      if (!name) return;

      const isDup = classStudents.some(s => s.fullName.toLowerCase() === name.toLowerCase());
      if (isDup) {
        duplicates.push(name);
        return;
      }

      // Generate unique username e.g. "mona123"
      const firstName = name.split(/\s+/)[0].toLowerCase().replace(/[^a-z0-9]/g, '');
      const uniqueSuffix = Math.floor(100 + Math.random() * 900);
      const username = `${firstName || 'student'}${uniqueSuffix}`;

      // Generate private 4-digit PIN e.g. "4821"
      const pin = String(Math.floor(1000 + Math.random() * 9000));

      const newStudent: Student = {
        id: `student_${Date.now()}_${index}_${Math.random().toString(36).substring(2, 6)}`,
        classId,
        teacherId,
        fullName: name,
        username,
        pin,
        avatarId: `avatar_${((index + 1) % 8) + 1}`,
        createdAt: new Date().toISOString()
      };

      added.push(newStudent);
      allStudents.push(newStudent);
      classStudents.push(newStudent);
    });

    this.setItem(STORAGE_KEYS.STUDENTS, allStudents);
    return { success: true, added, duplicates };
  }

  public deleteStudent(teacherId: string, studentId: string): { success: boolean; error?: string } {
    if (this.isTeacherSubscriptionExpired(teacherId)) {
      return { success: false, error: 'Subscription expired. Modifying students is restricted.' };
    }

    let allStudents = this.getItem<Student[]>(STORAGE_KEYS.STUDENTS, []);
    const student = allStudents.find(s => s.id === studentId);
    if (!student || student.teacherId !== teacherId) {
      return { success: false, error: 'Unauthorized or student not found.' };
    }

    allStudents = allStudents.filter(s => s.id !== studentId);
    this.setItem(STORAGE_KEYS.STUDENTS, allStudents);
    return { success: true };
  }

  // Student Authentication via Class Code + Username + PIN
  public studentLogin(classCode: string, username: string, pin: string): { success: boolean; student?: Student; classRoom?: ClassRoom; error?: string } {
    const classes = this.getItem<ClassRoom[]>(STORAGE_KEYS.CLASSES, []);
    const classRoom = classes.find(c => c.classCode.trim().toUpperCase() === classCode.trim().toUpperCase());

    if (!classRoom) {
      return { success: false, error: 'Class code not found. Please verify with your teacher.' };
    }

    const students = this.getItem<Student[]>(STORAGE_KEYS.STUDENTS, []);
    const student = students.find(s =>
      s.classId === classRoom.id &&
      s.username.trim().toLowerCase() === username.trim().toLowerCase() &&
      s.pin.trim() === pin.trim()
    );

    if (!student) {
      return { success: false, error: 'Invalid Student Username or Private PIN.' };
    }

    return { success: true, student, classRoom };
  }

  // Progress & Mastery
  public getStudentProgress(studentId: string): StudentProgress {
    const map = this.getItem<Record<string, StudentProgress>>(STORAGE_KEYS.PROGRESS, {});
    if (map[studentId]) return map[studentId];

    const student = this.getStudentById(studentId);
    const newProgress: StudentProgress = {
      studentId,
      classId: student?.classId || '',
      teacherId: student?.teacherId || '',
      totalStars: 0,
      level: 1,
      updatedAt: new Date().toISOString(),
      monthsRecognitionMastered: false,
      monthsSequenceMastered: false,
      monthsPronunciationScore: 0,
      monthsSpellingMastered: false,
      monthsFullMastery: false,
      numbersRecognitionMastered: false,
      numbersReadingMastered: false,
      numbersWritingMastered: false,
      numbersDictationMastered: false,
      numbersFullMastery: false,
      wordMastery: {},
      storyPagesRead: [],
      storyReadingScores: {},
      storyMasterTrophyAwarded: false,
      skills: {
        vocabularyRecognition: 0,
        meaning: 0,
        listening: 0,
        pronunciation: 0,
        spellingWriting: 0,
        readingFluency: 0
      },
      earnedAchievementIds: []
    };

    map[studentId] = newProgress;
    this.setItem(STORAGE_KEYS.PROGRESS, map);
    return newProgress;
  }

  public saveStudentProgress(progress: StudentProgress): void {
    const map = this.getItem<Record<string, StudentProgress>>(STORAGE_KEYS.PROGRESS, {});
    progress.updatedAt = new Date().toISOString();
    map[progress.studentId] = progress;
    this.setItem(STORAGE_KEYS.PROGRESS, map);
  }

  // Record an actual learning attempt and recalculate progress & rewards
  public recordLearningAttempt(attempt: Omit<LearningAttempt, 'id' | 'timestamp'>): { attempt: LearningAttempt; newAchievements: string[] } {
    const attempts = this.getItem<LearningAttempt[]>(STORAGE_KEYS.ATTEMPTS, []);
    const fullAttempt: LearningAttempt = {
      ...attempt,
      id: `att_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString()
    };
    attempts.push(fullAttempt);
    this.setItem(STORAGE_KEYS.ATTEMPTS, attempts);

    // Update Student Progress
    const progress = this.getStudentProgress(attempt.studentId);
    const newAchievements: string[] = [];

    // Award stars based on actual score (no clicks reward)
    if (attempt.score >= 90) {
      progress.totalStars += 3;
    } else if (attempt.score >= 70) {
      progress.totalStars += 2;
    } else if (attempt.score >= 50) {
      progress.totalStars += 1;
    }

    // First Step Explorer Achievement
    if (!progress.earnedAchievementIds.includes('first_step')) {
      progress.earnedAchievementIds.push('first_step');
      newAchievements.push('first_step');
    }

    // Section Specific updates
    if (attempt.section === 'months') {
      if (attempt.activityId === 'order' && attempt.isCorrect && attempt.score === 100) {
        progress.monthsSequenceMastered = true; // Critical requirement!
        if (!progress.earnedAchievementIds.includes('calendar_scholar')) {
          progress.earnedAchievementIds.push('calendar_scholar');
          newAchievements.push('calendar_scholar');
        }
      }
      if (attempt.activityId === 'quiz' && attempt.score >= 80) {
        progress.monthsRecognitionMastered = true;
      }
      if (attempt.activityId === 'speech' && attempt.score >= 75) {
        progress.monthsPronunciationScore = Math.max(progress.monthsPronunciationScore, attempt.score);
        if (!progress.earnedAchievementIds.includes('speaking_champion')) {
          progress.earnedAchievementIds.push('speaking_champion');
          newAchievements.push('speaking_champion');
        }
      }
      if (attempt.activityId === 'spelling' && attempt.score >= 80) {
        progress.monthsSpellingMastered = true;
      }

      // Check Full Months Mastery: ALL 4 components required
      if (
        progress.monthsSequenceMastered &&
        progress.monthsRecognitionMastered &&
        progress.monthsSpellingMastered &&
        progress.monthsPronunciationScore >= 75
      ) {
        progress.monthsFullMastery = true;
      }
    }

    if (attempt.section === 'numbers') {
      if (attempt.activityId === 'read' && attempt.score >= 80) progress.numbersReadingMastered = true;
      if (attempt.activityId === 'write_words' && attempt.isCorrect) progress.numbersWritingMastered = true;
      if (attempt.activityId === 'dictation' && attempt.score >= 80) progress.numbersDictationMastered = true;
      if (attempt.activityId === 'challenge' && attempt.score >= 90) {
        progress.numbersRecognitionMastered = true;
        if (!progress.earnedAchievementIds.includes('number_wizard')) {
          progress.earnedAchievementIds.push('number_wizard');
          newAchievements.push('number_wizard');
        }
      }

      if (progress.numbersReadingMastered && progress.numbersWritingMastered && progress.numbersDictationMastered && progress.numbersRecognitionMastered) {
        progress.numbersFullMastery = true;
      }
    }

    if (attempt.section === 'vocabulary') {
      const wordId = attempt.details?.wordId;
      if (wordId) {
        if (!progress.wordMastery[wordId]) {
          progress.wordMastery[wordId] = {
            learned: false,
            matchCorrect: false,
            listenCorrect: false,
            spellingCorrect: false,
            sentenceCorrect: false,
            challengeScore: 0,
            mastered: false,
            needsReview: false
          };
        }
        const wm = progress.wordMastery[wordId];
        if (attempt.activityId === 'learn') wm.learned = true;
        if (attempt.activityId === 'match' && attempt.isCorrect) wm.matchCorrect = true;
        if (attempt.activityId === 'listen' && attempt.isCorrect) wm.listenCorrect = true;
        if (attempt.activityId === 'spell' && attempt.isCorrect) {
          wm.spellingCorrect = true;
          if (!progress.earnedAchievementIds.includes('perfect_speller')) {
            progress.earnedAchievementIds.push('perfect_speller');
            newAchievements.push('perfect_speller');
          }
        }
        if (attempt.activityId === 'sentence' && attempt.isCorrect) wm.sentenceCorrect = true;
        if (attempt.activityId === 'challenge') wm.challengeScore = Math.max(wm.challengeScore, attempt.score);

        // Word is mastered after successful match, listen, and spelling activities
        if (wm.matchCorrect && wm.listenCorrect && wm.spellingCorrect) {
          wm.mastered = true;
          wm.needsReview = false;
        } else if (!attempt.isCorrect) {
          wm.needsReview = true;
        }
      }

      // Check if all 18 vocabulary words are mastered
      const allMastered = VOCABULARY_DATA.every(w => progress.wordMastery[w.id]?.mastered);
      if (allMastered && !progress.earnedAchievementIds.includes('vocabulary_champion')) {
        progress.earnedAchievementIds.push('vocabulary_champion');
        newAchievements.push('vocabulary_champion');
      }
    }

    if (attempt.section === 'review') {
      progress.unitReviewCompleted = true;
    }

    if (attempt.section === 'quiz') {
      progress.finalQuizCompleted = true;
      progress.finalQuizScore = Math.max(progress.finalQuizScore || 0, attempt.score);
      progress.finalQuizPassed = attempt.score >= 70;
      progress.finalQuizDate = new Date().toISOString();
      if (attempt.details?.breakdown) {
        progress.finalQuizBreakdown = attempt.details.breakdown;
      }
      if (attempt.score >= 90 && !progress.earnedAchievementIds.includes('quiz_master')) {
        progress.earnedAchievementIds.push('quiz_master');
        newAchievements.push('quiz_master');
      }
    }

    if (attempt.section === 'story') {
      const pageNum = attempt.details?.pageNumber;
      if (pageNum && !progress.storyPagesRead.includes(pageNum)) {
        progress.storyPagesRead.push(pageNum);
      }
      if (pageNum && attempt.score > 0) {
        progress.storyReadingScores[pageNum] = Math.max(progress.storyReadingScores[pageNum] || 0, attempt.score);
      }

      // Story Master Trophy criteria: Read and recorded reading across all 5 pages with genuine score >= 75
      const all5PagesScored = [1, 2, 3, 4, 5].every(p => (progress.storyReadingScores[p] || 0) >= 75);
      if (all5PagesScored && !progress.earnedAchievementIds.includes('story_master')) {
        progress.storyMasterTrophyAwarded = true;
        progress.earnedAchievementIds.push('story_master');
        newAchievements.push('story_master');
      }
    }

    // Grand Unit Master: Months + Numbers + Vocab + Story
    const allUnitObjectives =
      progress.monthsFullMastery &&
      progress.numbersFullMastery &&
      VOCABULARY_DATA.every(w => progress.wordMastery[w.id]?.mastered) &&
      progress.storyMasterTrophyAwarded;

    if (allUnitObjectives && !progress.earnedAchievementIds.includes('unit_master')) {
      progress.earnedAchievementIds.push('unit_master');
      newAchievements.push('unit_master');
    }

    // Recalculate Skill Percentages
    const vocabWords = Object.values(progress.wordMastery);
    const vocabCount = VOCABULARY_DATA.length;
    const recognizedCount = vocabWords.filter(w => w.matchCorrect).length;
    const meaningCount = vocabWords.filter(w => w.sentenceCorrect).length;
    const listeningCount = vocabWords.filter(w => w.listenCorrect).length;
    const spellingCount = vocabWords.filter(w => w.spellingCorrect).length;

    progress.skills.vocabularyRecognition = Math.min(100, Math.round((recognizedCount / vocabCount) * 100));
    progress.skills.meaning = Math.min(100, Math.round((meaningCount / vocabCount) * 100));
    progress.skills.listening = Math.min(100, Math.round((listeningCount / vocabCount) * 100));
    progress.skills.spellingWriting = Math.min(100, Math.round((spellingCount / vocabCount) * 80 + (progress.numbersWritingMastered ? 20 : 0)));
    progress.skills.pronunciation = Math.round(progress.monthsPronunciationScore * 0.5 + (Object.values(progress.storyReadingScores).reduce((a, b) => a + b, 0) / 5) * 0.5) || 0;
    progress.skills.readingFluency = Math.round(Object.values(progress.storyReadingScores).reduce((a, b) => a + b, 0) / 5) || 0;

    // Calculate level (1 level per 12 stars)
    progress.level = Math.max(1, Math.floor(progress.totalStars / 12) + 1);

    this.saveStudentProgress(progress);
    return { attempt: fullAttempt, newAchievements };
  }

  // Class & Unit Leaderboards (Strict Class Isolation, Top 10, Real Scores)
  public getClassLeaderboard(classId: string, limit: number = 10): Array<{ student: Student; stars: number; rank: number; level: number; unitMasteryPercent: number }> {
    const students = this.getItem<Student[]>(STORAGE_KEYS.STUDENTS, []).filter(s => s.classId === classId);
    const progressMap = this.getItem<Record<string, StudentProgress>>(STORAGE_KEYS.PROGRESS, {});

    const entries = students.map(student => {
      const prog = progressMap[student.id];
      const stars = prog ? prog.totalStars : 0;
      const level = prog ? prog.level : 1;

      // Calculate composite mastery percentage
      let masteryScore = 0;
      if (prog) {
        if (prog.monthsFullMastery) masteryScore += 25;
        if (prog.numbersFullMastery) masteryScore += 25;
        const vocabMasteredCount = Object.values(prog.wordMastery).filter(w => w.mastered).length;
        masteryScore += Math.round((vocabMasteredCount / VOCABULARY_DATA.length) * 25);
        if (prog.storyMasterTrophyAwarded) masteryScore += 25;
      }

      return {
        student,
        stars,
        level,
        unitMasteryPercent: masteryScore,
        rank: 0
      };
    });

    // Sort descending by stars, then unit mastery
    entries.sort((a, b) => {
      if (b.stars !== a.stars) return b.stars - a.stars;
      return b.unitMasteryPercent - a.unitMasteryPercent;
    });

    entries.forEach((e, i) => { e.rank = i + 1; });
    return entries.slice(0, limit);
  }

  // Teacher Analytics & Summary
  public getTeacherAnalytics(teacherId: string) {
    const classes = this.getTeacherClasses(teacherId);
    const students = this.getTeacherStudents(teacherId);
    const progressMap = this.getItem<Record<string, StudentProgress>>(STORAGE_KEYS.PROGRESS, {});

    let totalMasterySum = 0;
    const studentsNeedingSupport: Array<{ student: Student; reason: string; weakSkill: string }> = [];

    const skillSums = {
      vocabularyRecognition: 0,
      meaning: 0,
      listening: 0,
      pronunciation: 0,
      spellingWriting: 0,
      readingFluency: 0
    };

    let evaluatedStudents = 0;

    students.forEach(s => {
      const prog = progressMap[s.id];
      if (prog) {
        evaluatedStudents++;
        const avgSkill = (
          prog.skills.vocabularyRecognition +
          prog.skills.meaning +
          prog.skills.listening +
          prog.skills.pronunciation +
          prog.skills.spellingWriting +
          prog.skills.readingFluency
        ) / 6;

        totalMasterySum += avgSkill;

        skillSums.vocabularyRecognition += prog.skills.vocabularyRecognition;
        skillSums.meaning += prog.skills.meaning;
        skillSums.listening += prog.skills.listening;
        skillSums.pronunciation += prog.skills.pronunciation;
        skillSums.spellingWriting += prog.skills.spellingWriting;
        skillSums.readingFluency += prog.skills.readingFluency;

        // Detect students needing support
        if (avgSkill < 75 || !prog.monthsSequenceMastered || prog.skills.spellingWriting < 70) {
          let reason = '';
          if (!prog.monthsSequenceMastered) reason = 'Struggling with 12 months sequence ordering';
          else if (prog.skills.spellingWriting < 70) reason = 'Spelling accuracy below benchmark';
          else reason = 'Overall vocabulary retention needs home reinforcement';

          studentsNeedingSupport.push({
            student: s,
            reason,
            weakSkill: prog.skills.spellingWriting < 70 ? 'Spelling' : 'Sequence'
          });
        }
      }
    });

    const averageMastery = evaluatedStudents > 0 ? Math.round(totalMasterySum / evaluatedStudents) : 0;

    const skillAverages = [
      { name: 'Vocabulary Recognition', score: evaluatedStudents > 0 ? Math.round(skillSums.vocabularyRecognition / evaluatedStudents) : 0 },
      { name: 'Meaning & Arabic Context', score: evaluatedStudents > 0 ? Math.round(skillSums.meaning / evaluatedStudents) : 0 },
      { name: 'Listening & Dictation', score: evaluatedStudents > 0 ? Math.round(skillSums.listening / evaluatedStudents) : 0 },
      { name: 'Speech Pronunciation', score: evaluatedStudents > 0 ? Math.round(skillSums.pronunciation / evaluatedStudents) : 0 },
      { name: 'Spelling & Writing (No "and")', score: evaluatedStudents > 0 ? Math.round(skillSums.spellingWriting / evaluatedStudents) : 0 },
      { name: 'Reading & Fluency', score: evaluatedStudents > 0 ? Math.round(skillSums.readingFluency / evaluatedStudents) : 0 }
    ].sort((a, b) => b.score - a.score);

    return {
      totalClasses: classes.length,
      totalStudents: students.length,
      averageMastery,
      strongestSkill: skillAverages[0]?.name || 'Vocabulary Recognition',
      weakestSkill: skillAverages[skillAverages.length - 1]?.name || 'Spelling & Writing',
      skillAverages,
      studentsNeedingSupport
    };
  }

  // Parent Report Links (Secure single-student access)
  public createParentReportLink(teacherId: string, studentId: string): ParentReportLink {
    const student = this.getStudentById(studentId);
    if (!student || student.teacherId !== teacherId) {
      throw new Error('Unauthorized');
    }

    const links = this.getItem<ParentReportLink[]>(STORAGE_KEYS.PARENT_LINKS, []);
    const token = `rpt_${Math.random().toString(36).substring(2, 12)}_${Date.now()}`;
    const expires = new Date();
    expires.setDate(expires.getDate() + 30); // 30 days validity

    const newLink: ParentReportLink = {
      id: `link_${Date.now()}`,
      token,
      studentId,
      teacherId,
      classId: student.classId,
      createdAt: new Date().toISOString(),
      expiresAt: expires.toISOString(),
      isRevoked: false
    };

    links.push(newLink);
    this.setItem(STORAGE_KEYS.PARENT_LINKS, links);
    return newLink;
  }

  public getParentReportLink(studentId: string): ParentReportLink | undefined {
    const links = this.getItem<ParentReportLink[]>(STORAGE_KEYS.PARENT_LINKS, []);
    return links.find(l => l.studentId === studentId && !l.isRevoked);
  }

  public revokeParentReportLink(teacherId: string, linkId: string): boolean {
    const links = this.getItem<ParentReportLink[]>(STORAGE_KEYS.PARENT_LINKS, []);
    const link = links.find(l => l.id === linkId && l.teacherId === teacherId);
    if (!link) return false;
    link.isRevoked = true;
    this.setItem(STORAGE_KEYS.PARENT_LINKS, links);
    return true;
  }

  public getStudentReportByToken(token: string): { student: Student; classRoom: ClassRoom; progress: StudentProgress; teacher: TeacherAccount } | null {
    const links = this.getItem<ParentReportLink[]>(STORAGE_KEYS.PARENT_LINKS, []);
    const link = links.find(l => l.token === token);

    if (!link || link.isRevoked || new Date(link.expiresAt).getTime() < Date.now()) {
      return null;
    }

    const student = this.getStudentById(link.studentId);
    if (!student) return null;

    const classes = this.getItem<ClassRoom[]>(STORAGE_KEYS.CLASSES, []);
    const classRoom = classes.find(c => c.id === student.classId);
    const teacher = this.getTeacher(student.teacherId);
    const progress = this.getStudentProgress(student.id);

    if (!classRoom || !teacher) return null;

    return { student, classRoom, progress, teacher };
  }

  // Platform Settings
  public getSettings(): PlatformSettings {
    return this.getItem<PlatformSettings>(STORAGE_KEYS.SETTINGS, {
      subscriptionPriceYearly: 149,
      currency: 'USD',
      defaultDurationMonths: 12,
      allowedMaxClassesPerTeacher: 20
    });
  }

  public updateSettings(settings: PlatformSettings): void {
    this.setItem(STORAGE_KEYS.SETTINGS, settings);
  }
}

export const storageService = new StorageService();
