export const ANXIETY_TYPES = [
  { id: 1, label: 'Career & Ambition', icon: 'briefcase', category: 'career' },
  { id: 2, label: 'Love & Solitude', icon: 'heart', category: 'love' },
  { id: 3, label: 'Health & Vitality', icon: 'activity', category: 'health' },
  { id: 4, label: 'Identity & Purpose', icon: 'compass', category: 'identity' },
  { id: 5, label: 'Family & Kinship', icon: 'users', category: 'family' },
  { id: 6, label: 'Mortality & Time', icon: 'clock', category: 'mortality' },
  { id: 7, label: 'Wealth & Security', icon: 'shield', category: 'wealth' },
  { id: 8, label: 'Social Belonging', icon: 'share2', category: 'social' }
];

export const mockData = [
  {
    id: 1,
    pseudonym: "Wandering Scholar",
    age: 18,
    gender: "male",
    tags: ["Identity & Purpose"],
    confession: "After the examination of entrance, my progenitors decree I should study medicine. Yet my heart yearns for the arts and design. This conflict renders me utterly lost, caught between filial duty and personal inclination..."
  },
  {
    id: 2,
    pseudonym: "Weary Soul",
    age: 25,
    gender: "female",
    tags: ["Career & Ambition"],
    confession: "For three years, I have laboured within the great technological enterprise, toiling until the witching hours each day. My corporeal form and spirit wane. I desire liberation, yet fear the abyss of unemployment and destitution..."
  },
  {
    id: 3,
    pseudonym: "Ambitious Dreamer",
    age: 30,
    gender: "male",
    tags: ["Wealth & Security"],
    confession: "I have amassed modest capital and harbor aspirations to establish my own venture. Yet my family voices their opposition, deeming it perilous. At thirty summers, I sense time's relentless march. Should I surrender to prudence or grasp at fortune?"
  },
  {
    id: 4,
    pseudonym: "Mother of Two",
    age: 35,
    gender: "female",
    tags: ["Family & Kinship"],
    confession: "Since the arrival of offspring and return to labour, I find myself perpetually inadequate. Family demands and professional obligations war within me. Each moment spent with child is a moment stolen from work, and vice versa..."
  },
  {
    id: 5,
    pseudonym: "Middle-aged Sentinel",
    age: 45,
    gender: "male",
    tags: ["Mortality & Time"],
    confession: "The enterprise speaks of retrenchment. At my age, should I be cast aside, can I find employment anew? My offspring approaches university, the mortgage remains unsatisfied. The burden of providence weighs heavily upon my shoulders..."
  },
  {
    id: 6,
    pseudonym: "Twilight Wanderer",
    age: 58,
    gender: "male",
    tags: ["Mortality & Time"],
    confession: "Two summers hence, I shall retire by statute. Yet suddenly, I am seized with dread of the great cessation. I have laboured all my days—what remains when labour ceases? Shall I fade into obscurity and purposelessness?"
  },
  {
    id: 7,
    pseudonym: "Fragile Heart",
    age: 22,
    gender: "female",
    tags: ["Love & Solitude"],
    confession: "My acquaintance has declared attachment of a romantic persuasion. Though I do regard him with affection, the prospect of union and entanglement fills me with trepidation. What if I disappoint him? What if I am incapable of the devotion he requires?"
  },
  {
    id: 8,
    pseudonym: "Solitary Scholar",
    age: 28,
    gender: "male",
    tags: ["Social Belonging"],
    confession: "Society deems me peculiar in my scholarly pursuits and unconventional interests. At gatherings, I feel perpetually estranged, observing others with envy as they navigate effortless fellowship. Am I fundamentally unfit for companionship?"
  },
  {
    id: 9,
    pseudonym: "Ailing Vessel",
    age: 42,
    gender: "female",
    tags: ["Health & Vitality"],
    confession: "The physicians have detected an irregularity within my corporeal form. Each day, I catalogue my symptoms with growing alarm. I fear the deterioration of my vessel, the slow erosion of my vigour. How shall I fulfill my duties if my body betrays me?"
  },
  {
    id: 10,
    pseudonym: "Searching Soul",
    age: 31,
    gender: "female",
    tags: ["Identity & Purpose"],
    confession: "I have been wed for five years, yet still I do not know who I am apart from my husband's expectations. Each choice I make is measured against propriety and his preferences. I am haunted by the woman I might have become..."
  },
  {
    id: 11,
    pseudonym: "Restless Heir",
    age: 35,
    gender: "male",
    tags: ["Career & Ambition", "Family & Kinship"],
    confession: "My progenitors have entrusted me with the family enterprise, expecting me to perpetuate their legacy. Yet I harbour desires to pursue entirely different endeavours. The weight of their expectation is suffocating, yet abandonment feels like the gravest betrayal..."
  }
];

export const getTags = () => ANXIETY_TYPES;
