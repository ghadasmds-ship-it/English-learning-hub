import { TOP_GOAL_2_TARGET_VOCABULARY } from './topGoal2TargetVocabulary';

/** Curriculum-driven activity sequence; all activities use only the approved target list. */
export type VocabularyActivityKind =
  | 'learn'
  | 'listen-and-choose'
  | 'picture-match'
  | 'spell'
  | 'write'
  | 'pronounce'
  | 'review'
  | 'story';

export interface VocabularyActivityPlan {
  unitId: string;
  targetWords: readonly string[];
  steps: readonly VocabularyActivityKind[];
  repeatIncorrectLater: true;
  storyRequirements: {
    originalChildFriendlyStory: true;
    sentenceAudio: true;
    targetWordHighlighting: true;
    pageTurning: true;
    listeningPractice: true;
    writingPractice: true;
    speakingPractice: true;
  };
}

const STANDARD_STEPS: readonly VocabularyActivityKind[] = [
  'learn', 'listen-and-choose', 'picture-match', 'spell',
  'write', 'pronounce', 'review', 'story',
];

/**
 * This is an activity specification, not a working microphone, image, or story implementation.
 * A scoring service must verify completion; UI-only progress must not be treated as trusted.
 */
export const TOP_GOAL_2_ACTIVITY_PLANS: readonly VocabularyActivityPlan[] =
  TOP_GOAL_2_TARGET_VOCABULARY.map(unit => ({
    unitId: unit.id,
    targetWords: unit.teachingOf,
    steps: STANDARD_STEPS,
    repeatIncorrectLater: true,
    storyRequirements: {
      originalChildFriendlyStory: true,
      sentenceAudio: true,
      targetWordHighlighting: true,
      pageTurning: true,
      listeningPractice: true,
      writingPractice: true,
      speakingPractice: true,
    },
  }));
