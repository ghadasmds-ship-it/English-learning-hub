/**
 * Curriculum catalog schema for Saudi English courses.
 * Content is independent from teacher/student private data.
 * Do not infer official textbooks or unit names from grade alone.
 */
export const SAUDI_STAGES = ['primary', 'intermediate', 'secondary'] as const;
export type SaudiStage = typeof SAUDI_STAGES[number];
export type Semester = 1 | 2;
export type Skill = 'vocabulary' | 'listening' | 'speaking' | 'pronunciation' | 'reading' | 'writing';

export interface Grade {
  id: string; // e.g. sa-primary-05, sa-intermediate-01
  stage: SaudiStage;
  level: number; // primary 1-6, intermediate 1-3, secondary 1-3
  labelAr: string;
}

export interface Curriculum {
  id: string; // stable catalog identifier, never teacher-owned
  country: 'SA';
  gradeId: string;
  title: string; // official textbook/course title once verified
  academicYear: string; // editions may change across years
  status: 'draft' | 'verified' | 'published';
}

export interface Term {
  id: string;
  curriculumId: string;
  semester: Semester;
}

export interface LearningUnit {
  id: string;
  termId: string;
  order: number;
  title: string;
  status: 'draft' | 'review' | 'published';
}

export interface LearningObjective {
  id: string;
  unitId: string;
  text: string;
  skills: Skill[];
  difficulty: 'foundation' | 'developing' | 'advanced';
}

export interface LearningActivity {
  id: string;
  objectiveId: string;
  type: 'learn' | 'practice' | 'review' | 'assessment';
  contentRef: string; // points to original platform-authored activity content
  order: number;
}

export interface UnitAssessment {
  id: string;
  unitId: string;
  type: 'review' | 'final';
  objectiveIds: string[];
}

export interface ClassCurriculumAssignment {
  classId: string;
  teacherId: string;
  curriculumId: string;
  termId: string;
}

export interface ObjectiveProgress {
  teacherId: string;
  classId: string;
  studentId: string;
  unitId: string;
  objectiveId: string;
  status: 'not_assessed' | 'in_progress' | 'mastered' | 'needs_practice';
  score?: number; // only present when assessed; zero is not 'not assessed'
  updatedAt: string;
}

/** The catalog is structured, but publication requires verified textbook mapping. */
export const SAUDI_ENGLISH_GRADES: readonly Grade[] = [
  ...Array.from({ length: 6 }, (_, i): Grade => ({
    id: `sa-primary-${String(i + 1).padStart(2, '0')}`,
    stage: 'primary',
    level: i + 1,
    labelAr: `الصف ${['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس'][i]} الابتدائي`,
  })),
  ...Array.from({ length: 3 }, (_, i): Grade => ({
    id: `sa-intermediate-${String(i + 1).padStart(2, '0')}`,
    stage: 'intermediate',
    level: i + 1,
    labelAr: `الصف ${['الأول', 'الثاني', 'الثالث'][i]} المتوسط`,
  })),
  ...Array.from({ length: 3 }, (_, i): Grade => ({
    id: `sa-secondary-${String(i + 1).padStart(2, '0')}`,
    stage: 'secondary',
    level: i + 1,
    labelAr: `الصف ${['الأول', 'الثاني', 'الثالث'][i]} الثانوي`,
  })),
];

export function validateUnit(unit: LearningUnit, objectives: LearningObjective[]): string[] {
  const errors: string[] = [];
  if (!unit.id || !unit.termId || !unit.title.trim() || unit.order < 1) errors.push('Invalid unit identity or ordering');
  if (unit.status === 'published' && !objectives.some(o => o.unitId === unit.id)) errors.push('Published units require objectives');
  for (const objective of objectives.filter(o => o.unitId === unit.id)) {
    if (!objective.text.trim() || objective.skills.length === 0) errors.push(`Incomplete objective: ${objective.id}`);
  }
  return errors;
}
