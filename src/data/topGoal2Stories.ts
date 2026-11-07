/** Original, short story drafts. Review illustrations, audio and pedagogy before release. */
export interface UnitStory { unitId: string; title: string; pages: readonly string[] }
export const TOP_GOAL_2_STORIES: readonly UnitStory[] = [
  {
    "unitId": "welcome",
    "title": "Our Little Story",
    "pages": [
      "It is May.",
      "I look at the calendar.",
      "Today is a special date.",
      "The festival starts early.",
      "I am not late."
    ]
  },
  {
    "unitId": "personal-interests",
    "title": "Our Little Story",
    "pages": [
      "My friend is funny and friendly.",
      "We enjoy a special game.",
      "The game is amazing.",
      "I feel lucky.",
      "Our room is tidy."
    ]
  },
  {
    "unitId": "house-designs",
    "title": "Our Little Story",
    "pages": [
      "An architect has a house design.",
      "The entrance is near the gate.",
      "The key is on a shelf.",
      "There is a cushion in the corner.",
      "The fridge is in the kitchen."
    ]
  },
  {
    "unitId": "job-paths",
    "title": "Our Little Story",
    "pages": [
      "My aunt is an artist.",
      "My uncle is a pilot.",
      "A mechanic works near the airport.",
      "A journalist writes the news.",
      "I want to be an engineer."
    ]
  },
  {
    "unitId": "glorious-food",
    "title": "Our Little Story",
    "pages": [
      "We bake cookies.",
      "We mix flour, butter, and sugar.",
      "I stir the dough.",
      "We put the cookies in the oven.",
      "They smell wonderful!"
    ]
  },
  {
    "unitId": "storylines",
    "title": "Our Little Story",
    "pages": [
      "I draw a cartoon.",
      "My character goes on an adventure.",
      "A mystery appears.",
      "The character must decide.",
      "I wish for a happy end."
    ]
  },
  {
    "unitId": "outdoor-activities",
    "title": "Our Little Story",
    "pages": [
      "We go camping.",
      "I carry my backpack and tent.",
      "My friend wears hiking boots.",
      "We sit near the campfire.",
      "We have a fun day outdoors."
    ]
  },
  {
    "unitId": "styles",
    "title": "Our Little Story",
    "pages": [
      "I pack my suitcase.",
      "We arrive at the station.",
      "The passenger has a ticket.",
      "We take the subway.",
      "We check in at the terminal."
    ]
  },
  {
    "unitId": "outfits",
    "title": "Our Little Story",
    "pages": [
      "I wear a striped shirt.",
      "My friend wears a belt.",
      "She has a silver necklace.",
      "Her bracelet is made of metal.",
      "I put on my uniform."
    ]
  }
] as const;
