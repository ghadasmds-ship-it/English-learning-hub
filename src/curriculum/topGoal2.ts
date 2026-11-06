import type { Curriculum, Term, LearningUnit } from './catalog';

/**
 * Editorial starting point, NOT an official verified textbook index.
 * Semester 2 stays empty until its units are checked against the source book.
 * No textbook passages or exercises are reproduced.
 */
export const TOP_GOAL_2_CURRICULUM: Curriculum = {
  id: 'sa-top-goal-2',
  country: 'SA',
  gradeId: 'sa-intermediate-02',
  title: 'Top Goal 2',
  academicYear: '2026-2027',
  status: 'draft',
};

export const TOP_GOAL_2_TERMS: readonly Term[] = [
  { id: 'sa-top-goal-2-term-1', curriculumId: TOP_GOAL_2_CURRICULUM.id, semester: 1 },
  { id: 'sa-top-goal-2-term-2', curriculumId: TOP_GOAL_2_CURRICULUM.id, semester: 2 },
];

export const TOP_GOAL_2_TERM_1_UNITS: readonly LearningUnit[] = [
  'Welcome',
  'Personal Interests',
  'House Designs',
  'Job Paths',
  'Glorious Food',
].map((title, index) => ({
  id: `sa-top-goal-2-t1-u${index}`,
  termId: TOP_GOAL_2_TERMS[0].id,
  order: index + 1,
  title,
  status: 'draft' as const,
}));

/** Add verified semester-2 units here after reviewing the textbook. */
export const TOP_GOAL_2_TERM_2_UNITS: readonly LearningUnit[] = [];

export const TOP_GOAL_2_UNITS: readonly LearningUnit[] = [
  ...TOP_GOAL_2_TERM_1_UNITS,
  ...TOP_GOAL_2_TERM_2_UNITS,
];
