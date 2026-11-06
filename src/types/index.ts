export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

export interface License {
  id: string;
  code: string; // e.g. "TEACH-2026-X89K"
  teacherId?: string;
  teacherEmail?: string;
  durationMonths: number;
  createdAt: string;
  activatedAt?: string;
  expiresAt?: string;
  status: 'available' | 'active' | 'expired' | 'revoked';
  priceUsd: number;
}

export interface TeacherAccount {
  id: string;
  email: string;
  fullName: string;
  schoolName: string;
  createdAt: string;
  licenseId?: string;
  licenseExpiresAt?: string;
  isReadOnly: boolean; // True when license expired
}

export interface ClassRoom {
  id: string;
  teacherId: string;
  name: string;
  stageLevel: string; // e.g. "Primary / Elementary"
  grade: string;      // e.g. "Grade 4"
  section: string;    // e.g. "Section A"
  academicYear: string; // e.g. "2026-2027"
  classCode: string;  // e.g. "ENG-4A"
  createdAt: string;
  studentCount?: number;
}

export interface Student {
  id: string;
  classId: string;
  teacherId: string;
  fullName: string;
  username: string; // Generated e.g. "mona401"
  pin: string;      // 4-digit PIN e.g. "1234"
  avatarId: string;
  createdAt: string;
}

export interface VocabularyWord {
  id: string;
  word: string;
  arabicMeaning: string;
  group: 1 | 2 | 3 | 4;
  groupName: string;
  exampleSentence: string;
  audioText: string;
  illustrationKey: string;
}

export interface MonthInfo {
  number: number;
  name: string;
  season?: 'Winter' | 'Spring' | 'Summer' | 'Autumn';
  seasonDescription?: string;
  funFact?: string;
  illustrationKey: string;
}

export interface StoryPage {
  pageNumber: number;
  title: string;
  text: string;
  highlightWords: string[];
  illustrationKey: string;
  audioPrompt: string;
}

export interface StudentProgress {
  studentId: string;
  classId: string;
  teacherId: string;
  totalStars: number;
  level: number;
  updatedAt: string;
  
  // Section A: Months
  monthsRecognitionMastered: boolean;
  monthsSequenceMastered: boolean; // Critical rule: 12 months ordered correctly
  monthsPronunciationScore: number; // 0-100
  monthsSpellingMastered: boolean;
  monthsFullMastery: boolean;

  // Section B: Numbers
  numbersRecognitionMastered: boolean;
  numbersReadingMastered: boolean;
  numbersWritingMastered: boolean;
  numbersDictationMastered: boolean;
  numbersFullMastery: boolean;

  // Section C: Vocabulary (keyed by word id)
  wordMastery: Record<string, {
    learned: boolean;
    matchCorrect: boolean;
    listenCorrect: boolean;
    spellingCorrect: boolean;
    sentenceCorrect: boolean;
    challengeScore: number;
    mastered: boolean;
    needsReview: boolean;
  }>;

  // Story Time
  storyPagesRead: number[];
  storyReadingScores: Record<number, number>; // page -> score
  storyMasterTrophyAwarded: boolean; // Prestigious gold trophy

  // Unit Review & Final Quiz
  unitReviewCompleted?: boolean;
  finalQuizScore?: number;
  finalQuizPassed?: boolean;
  finalQuizCompleted?: boolean;
  finalQuizDate?: string;
  finalQuizBreakdown?: {
    months: number;
    numbers: number;
    vocabulary: number;
    story: number;
  };

  // Skill percentages (0-100)
  skills: {
    vocabularyRecognition: number;
    meaning: number;
    listening: number;
    pronunciation: number;
    spellingWriting: number;
    readingFluency: number;
  };

  // Achievement IDs earned
  earnedAchievementIds: string[];
}

export interface LearningAttempt {
  id: string;
  studentId: string;
  classId: string;
  teacherId: string;
  section: 'months' | 'numbers' | 'vocabulary' | 'story' | 'review' | 'quiz';
  activityId: string;
  score: number; // 0-100
  maxScore: number;
  isCorrect: boolean;
  details?: Record<string, any>;
  timestamp: string;
  flaggedForTeacherReview?: boolean;
  teacherReviewNotes?: string;
}

export interface Achievement {
  id: string;
  title: string;
  category: 'star' | 'badge' | 'trophy';
  icon: string;
  description: string;
  requirement: string;
  isSpecialGoldTrophy?: boolean;
}

export interface ParentReportLink {
  id: string;
  token: string;
  studentId: string;
  teacherId: string;
  classId: string;
  createdAt: string;
  expiresAt: string;
  isRevoked: boolean;
}

export interface PlatformSettings {
  subscriptionPriceYearly: number;
  currency: string;
  defaultDurationMonths: number;
  allowedMaxClassesPerTeacher: number;
}
