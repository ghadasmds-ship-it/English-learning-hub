import { MonthInfo, VocabularyWord, StoryPage, Achievement } from '../types';

export const MONTHS_DATA: MonthInfo[] = [
  {
    number: 1,
    name: 'January',
    season: 'Winter',
    seasonDescription: 'Cool winter month with cozy scarves and a fresh new calendar year.',
    funFact: 'Named after Janus, the ancient guardian of beginnings and doors.',
    illustrationKey: 'january'
  },
  {
    number: 2,
    name: 'February',
    season: 'Winter',
    seasonDescription: 'The shortest month of the winter season with 28 or 29 days.',
    funFact: 'February has 29 days every four years during a leap year!',
    illustrationKey: 'february'
  },
  {
    number: 3,
    name: 'March',
    season: 'Spring',
    seasonDescription: 'Spring arrives with gentle breezes and green buds on trees.',
    funFact: 'March signals the beginning of blooming flowers and birds singing.',
    illustrationKey: 'march'
  },
  {
    number: 4,
    name: 'April',
    season: 'Spring',
    seasonDescription: 'Fresh spring rain showers bring colorful flowers everywhere.',
    funFact: 'April showers bring bright spring flowers!',
    illustrationKey: 'april'
  },
  {
    number: 5,
    name: 'May',
    season: 'Spring',
    seasonDescription: 'Warm sunny spring days filled with sweet flowers and outdoor fun.',
    funFact: 'May is celebrated for gardens full of vibrant blossoms.',
    illustrationKey: 'may'
  },
  {
    number: 6,
    name: 'June',
    season: 'Summer',
    seasonDescription: 'Bright sunny days mark the welcome start of warm summer vacation.',
    funFact: 'June has the longest daylight day of the year in the Northern Hemisphere.',
    illustrationKey: 'june'
  },
  {
    number: 7,
    name: 'July',
    season: 'Summer',
    seasonDescription: 'Mid-summer sunshine, swimming pools, and ice cold lemonades.',
    funFact: 'July is often one of the warmest months filled with outdoor adventures.',
    illustrationKey: 'july'
  },
  {
    number: 8,
    name: 'August',
    season: 'Summer',
    seasonDescription: 'Golden summer days before getting ready to return to school.',
    funFact: 'August is known for clear starry summer nights and warm breezes.',
    illustrationKey: 'august'
  },
  {
    number: 9,
    name: 'September',
    season: 'Autumn',
    seasonDescription: 'Autumn begins! Leaves turn golden-orange and school bells ring.',
    funFact: 'September marks the start of the exciting new school academic year.',
    illustrationKey: 'september'
  },
  {
    number: 10,
    name: 'October',
    season: 'Autumn',
    seasonDescription: 'Crisp autumn weather, falling colorful leaves, and cozy sweaters.',
    funFact: 'Leaves turn brilliant shades of red, orange, and yellow in October.',
    illustrationKey: 'october'
  },
  {
    number: 11,
    name: 'November',
    season: 'Autumn',
    seasonDescription: 'Late autumn breezes blow the final leaves from tall trees.',
    funFact: 'November is a peaceful harvest time of gathering with family.',
    illustrationKey: 'november'
  },
  {
    number: 12,
    name: 'December',
    season: 'Winter',
    seasonDescription: 'Winter begins with chilly mornings and celebration of the year end.',
    funFact: 'December wraps up the full calendar cycle before January starts again!',
    illustrationKey: 'december'
  }
];

export const VOCABULARY_DATA: VocabularyWord[] = [
  // Group 1: Time & Calendar
  {
    id: 'ago',
    word: 'Ago',
    arabicMeaning: 'منذ / في الماضي',
    group: 1,
    groupName: 'Time & Calendar',
    exampleSentence: 'Two days ago, we visited our grandparents.',
    audioText: 'Ago. Two days ago, we visited our grandparents.',
    illustrationKey: 'ago'
  },
  {
    id: 'calendar',
    word: 'Calendar',
    arabicMeaning: 'تقويم / روزنامة',
    group: 1,
    groupName: 'Time & Calendar',
    exampleSentence: 'I check the calendar every morning.',
    audioText: 'Calendar. I check the calendar every morning.',
    illustrationKey: 'calendar'
  },
  {
    id: 'date',
    word: 'Date',
    arabicMeaning: 'تاريخ اليوم',
    group: 1,
    groupName: 'Time & Calendar',
    exampleSentence: 'Today\'s date is May 10.',
    audioText: 'Date. Today\'s date is May 10.',
    illustrationKey: 'date'
  },
  {
    id: 'how_long',
    word: 'How long',
    arabicMeaning: 'كم المدة؟',
    group: 1,
    groupName: 'Time & Calendar',
    exampleSentence: 'How long is the festival show?',
    audioText: 'How long. How long is the festival show?',
    illustrationKey: 'how_long'
  },
  {
    id: 'early',
    word: 'Early',
    arabicMeaning: 'مبكراً',
    group: 1,
    groupName: 'Time & Calendar',
    exampleSentence: 'Mona wakes up early for school.',
    audioText: 'Early. Mona wakes up early for school.',
    illustrationKey: 'early'
  },
  {
    id: 'late',
    word: 'Late',
    arabicMeaning: 'متأخراً',
    group: 1,
    groupName: 'Time & Calendar',
    exampleSentence: 'Run fast so you will not be late!',
    audioText: 'Late. Run fast so you will not be late!',
    illustrationKey: 'late'
  },
  {
    id: 'time',
    word: 'Time',
    arabicMeaning: 'وقت / زمن',
    group: 1,
    groupName: 'Time & Calendar',
    exampleSentence: 'What time is it now?',
    audioText: 'Time. What time is it now?',
    illustrationKey: 'time'
  },
  {
    id: 'year',
    word: 'Year',
    arabicMeaning: 'سنة / عام',
    group: 1,
    groupName: 'Time & Calendar',
    exampleSentence: 'There are twelve months in one year.',
    audioText: 'Year. There are twelve months in one year.',
    illustrationKey: 'year'
  },

  // Group 2: Events & Actions
  {
    id: 'festival',
    word: 'Festival',
    arabicMeaning: 'مهرجان / احتفال',
    group: 2,
    groupName: 'Events & Actions',
    exampleSentence: 'We had so much fun at the school festival!',
    audioText: 'Festival. We had so much fun at the school festival!',
    illustrationKey: 'festival'
  },
  {
    id: 'have_no_fear',
    word: 'Have no fear',
    arabicMeaning: 'لا تخف / كن شجاعاً',
    group: 2,
    groupName: 'Events & Actions',
    exampleSentence: 'Have no fear, Mona is very brave!',
    audioText: 'Have no fear. Have no fear, Mona is very brave!',
    illustrationKey: 'have_no_fear'
  },
  {
    id: 'prepare',
    word: 'Prepare',
    arabicMeaning: 'يُجهّز / يُعِدّ',
    group: 2,
    groupName: 'Events & Actions',
    exampleSentence: 'Mona helps prepare her school bag.',
    audioText: 'Prepare. Mona helps prepare her school bag.',
    illustrationKey: 'prepare'
  },

  // Group 3: Things & Nature
  {
    id: 'comic_book',
    word: 'Comic book',
    arabicMeaning: 'قصة مصورة',
    group: 3,
    groupName: 'Things & Nature',
    exampleSentence: 'He loves reading an exciting comic book.',
    audioText: 'Comic book. He loves reading an exciting comic book.',
    illustrationKey: 'comic_book'
  },
  {
    id: 'lion',
    word: 'Lion',
    arabicMeaning: 'أسد',
    group: 3,
    groupName: 'Things & Nature',
    exampleSentence: 'The puppet looks like a big friendly lion.',
    audioText: 'Lion. The puppet looks like a big friendly lion.',
    illustrationKey: 'lion'
  },
  {
    id: 'mountain',
    word: 'Mountain',
    arabicMeaning: 'جبل',
    group: 3,
    groupName: 'Things & Nature',
    exampleSentence: 'We can see a tall mountain in the distance.',
    audioText: 'Mountain. We can see a tall mountain in the distance.',
    illustrationKey: 'mountain'
  },
  {
    id: 'rainbow',
    word: 'Rainbow',
    arabicMeaning: 'قوس قزح',
    group: 3,
    groupName: 'Things & Nature',
    exampleSentence: 'A colorful rainbow appeared in the sky.',
    audioText: 'Rainbow. A colorful rainbow appeared in the sky.',
    illustrationKey: 'rainbow'
  },
  {
    id: 'snail',
    word: 'Snail',
    arabicMeaning: 'حلزون',
    group: 3,
    groupName: 'Things & Nature',
    exampleSentence: 'The little snail crawls slowly on the leaf.',
    audioText: 'Snail. The little snail crawls slowly on the leaf.',
    illustrationKey: 'snail'
  },

  // Group 4: Description
  {
    id: 'tall',
    word: 'Tall',
    arabicMeaning: 'طويل القامة',
    group: 4,
    groupName: 'Description',
    exampleSentence: 'The giraffe and the green trees are very tall.',
    audioText: 'Tall. The giraffe and the green trees are very tall.',
    illustrationKey: 'tall'
  },
  {
    id: 'tired',
    word: 'Tired',
    arabicMeaning: 'مُتعب / مرهق',
    group: 4,
    groupName: 'Description',
    exampleSentence: 'After playing all day, Mona was tired but happy.',
    audioText: 'Tired. After playing all day, Mona was tired but happy.',
    illustrationKey: 'tired'
  }
];

export const STORY_PAGES: StoryPage[] = [
  {
    pageNumber: 1,
    title: 'Festival Day!',
    text: 'Today is the school festival!\n\nMona looks at the calendar. The date is May 10. She is happy.',
    highlightWords: ['festival', 'calendar', 'date'],
    illustrationKey: 'story_page_1',
    audioPrompt: 'Today is the school festival! Mona looks at the calendar. The date is May 10. She is happy.'
  },
  {
    pageNumber: 2,
    title: 'Getting Ready',
    text: 'She gets up early. She is not late.\n\nShe helps her mom prepare her bag. She puts a comic book inside.',
    highlightWords: ['early', 'late', 'prepare', 'comic book'],
    illustrationKey: 'story_page_2',
    audioPrompt: 'She gets up early. She is not late. She helps her mom prepare her bag. She puts a comic book inside.'
  },
  {
    pageNumber: 3,
    title: 'At the Festival Grounds',
    text: 'At the festival, Mona sees a tall mountain, a beautiful rainbow, and a little snail.',
    highlightWords: ['festival', 'tall', 'mountain', 'rainbow', 'snail'],
    illustrationKey: 'story_page_3',
    audioPrompt: 'At the festival, Mona sees a tall mountain, a beautiful rainbow, and a little snail.'
  },
  {
    pageNumber: 4,
    title: 'The Lion Puppet',
    text: 'Then she sees a big lion puppet!\n\n“Have no fear, Mona!” says her friend.\n\nMona smiles. “How long is the show?”\n\n“One hour!” says her friend.',
    highlightWords: ['lion', 'have no fear', 'how long'],
    illustrationKey: 'story_page_4',
    audioPrompt: 'Then she sees a big lion puppet! Have no fear, Mona! says her friend. Mona smiles. How long is the show? One hour! says her friend.'
  },
  {
    pageNumber: 5,
    title: 'Brave and Happy',
    text: 'A year ago, Mona was afraid of lions. Now she is brave!\n\nIt is time to go home. Mona is tired but happy.',
    highlightWords: ['year', 'ago', 'time', 'tired'],
    illustrationKey: 'story_page_5',
    audioPrompt: 'A year ago, Mona was afraid of lions. Now she is brave! It is time to go home. Mona is tired but happy.'
  }
];

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: 'first_step',
    title: 'First Step Explorer',
    category: 'star',
    icon: 'star',
    description: 'Began the learning adventure in the Welcome Unit.',
    requirement: 'Complete any learning activity.'
  },
  {
    id: 'calendar_scholar',
    title: 'Calendar Scholar',
    category: 'badge',
    icon: 'calendar',
    description: 'Mastered all 12 months in correct calendar order from January to December.',
    requirement: 'Correctly arrange all 12 months in the ordering challenge without errors.'
  },
  {
    id: 'number_wizard',
    title: 'Number Wizard 1,000',
    category: 'badge',
    icon: 'hash',
    description: 'Mastered reading, composing, and writing 3-digit numbers up to 1,000.',
    requirement: 'Score 100% on the Number Challenge and write numbers in American words format.'
  },
  {
    id: 'perfect_speller',
    title: 'Perfect Speller',
    category: 'badge',
    icon: 'spell',
    description: 'Spelled target vocabulary words and months with flawless precision.',
    requirement: 'Correctly spell 10 or more target words and months in spelling challenges.'
  },
  {
    id: 'speaking_champion',
    title: 'Speaking Champion',
    category: 'badge',
    icon: 'mic',
    description: 'Pronounced English months and vocabulary words clearly into the microphone.',
    requirement: 'Complete pronunciation practice sessions with high accuracy.'
  },
  {
    id: 'vocabulary_champion',
    title: 'Vocabulary Champion',
    category: 'trophy',
    icon: 'trophy',
    description: 'Achieved mastery across all 18 target vocabulary words in the 4 groups.',
    requirement: 'Master all 18 target words across listening, matching, spelling, and sentence completion.'
  },
  {
    id: 'story_master',
    title: 'Gold Story Master Trophy',
    category: 'trophy',
    icon: 'trophy-gold',
    description: 'Mastered reading all 5 illustrated pages of Mona’s Fun Festival!',
    requirement: 'Read, listen, and complete pronunciation recording across all 5 story pages.',
    isSpecialGoldTrophy: true
  },
  {
    id: 'unit_master',
    title: 'Welcome Unit Grand Champion',
    category: 'trophy',
    icon: 'award',
    description: 'Achieved complete mastery of the entire Welcome Unit!',
    requirement: 'Master Months, Numbers up to 1,000, 18 Vocabulary Words, and Story Time.'
  }
];

// American English number writing without "and"
export const ONES_WORDS = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

export const TENS_WORDS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

/**
 * Converts a number (0 to 1000) to American English words WITHOUT "and".
 * Capitalizes first letter: e.g. 125 -> "One hundred twenty-five", 308 -> "Three hundred eight", 1000 -> "One thousand"
 */
export function numberToAmericanWords(num: number): string {
  if (num === 0) return 'Zero';
  if (num === 1000) return 'One thousand';
  if (num < 0 || num > 1000) return String(num);

  const parts: string[] = [];

  const hundreds = Math.floor(num / 100);
  const remainder = num % 100;

  if (hundreds > 0) {
    parts.push(`${ONES_WORDS[hundreds]} hundred`);
  }

  if (remainder > 0) {
    if (remainder < 20) {
      parts.push(ONES_WORDS[remainder]);
    } else {
      const tens = Math.floor(remainder / 10);
      const ones = remainder % 10;
      if (ones > 0) {
        parts.push(`${TENS_WORDS[tens]}-${ONES_WORDS[ones]}`);
      } else {
        parts.push(TENS_WORDS[tens]);
      }
    }
  }

  const raw = parts.join(' ').trim();
  // Capitalize the first letter
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

/**
 * Verifies if student's written input matches American English style without "and".
 * Tolerates case differences and minor space variations.
 */
export function validateNumberWords(input: string, targetNum: number): { isValid: boolean; expected: string; feedback: string } {
  const expected = numberToAmericanWords(targetNum);
  const cleanInput = input.trim().toLowerCase().replace(/\s+/g, ' ');
  const cleanExpected = expected.toLowerCase();

  if (cleanInput.includes(' and ')) {
    return {
      isValid: false,
      expected,
      feedback: 'In American English number writing, do not use "and" (e.g., "Three hundred eight", not "Three hundred and eight").'
    };
  }

  // Also check without hyphen: e.g., "twenty five" vs "twenty-five"
  const unhyphenatedInput = cleanInput.replace(/-/g, ' ');
  const unhyphenatedExpected = cleanExpected.replace(/-/g, ' ');

  if (cleanInput === cleanExpected || unhyphenatedInput === unhyphenatedExpected) {
    return {
      isValid: true,
      expected,
      feedback: 'Excellent! Perfect American English number format without "and".'
    };
  }

  return {
    isValid: false,
    expected,
    feedback: `Check spelling: expected "${expected}". Remember: Hundreds, then Tens-Ones.`
  };
}
