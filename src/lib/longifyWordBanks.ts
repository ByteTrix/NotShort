// src/lib/longifyWordBanks.ts

export const getRandomElement = <T>(arr: T[]): T => {
  if (!arr || arr.length === 0) {
    throw new Error("Cannot get random element from an empty or undefined array.");
  }
  return arr[Math.floor(Math.random() * arr.length)];
};

export const adjectives: string[] = [
  "short",
  "spicy",
  "mysterious",
  "existential",
  "dramatic",
  "grumpy",
  "confused",
  "sparkly",
  "sarcastic",
  "chaotic",
  "epic",
  "awkward",
  "delightful",
  "fluffy"
];

export const silly_nouns: string[] = [
  "waffle",
  "pickle",
  "trombone",
  "banana suit",
  "AI-powered toaster",
  "rubber duck",
  "emotional support burrito",
  "jellybean",
  "quantum llama",
  "wifi goblin"
];

export const places: string[] = [
  "void",
  "Zoom call",
  "group chat",
  "sock drawer",
  "404 zone",
  "chaos dimension",
  "leftover pizza box",
  "deep web",
  "google doc",
  "laundry basket"
];

export const animals: string[] = [
  "ferret",
  "pigeon",
  "sloth",
  "duck",
  "koala",
  "llama",
  "platypus",
  "raccoon",
  "emotional hamster",
  "pasta monster"
];

export const verbs: string[] = [
  "screams",
  "dabs",
  "types loudly",
  "orders tacos",
  "quotes Nietzsche",
  "debugs itself",
  "eats spaghetti",
  "moonwalks",
  "crashes Zoom",
  "runs in circles"
];

export const funny_phrases: string[] = [
  "go big or go to bed",
  "YOLO is a lifestyle",
  "brevity is for amateurs",
  "I like turtles",
  "may the URL be ever in your favor",
  "404 is a vibe",
  "I regret nothing",
  "this is fine",
  "cookies are a right",
  "I speak fluent emoji"
];

export const absurd_comparisons: string[] = [
  "attention span",
  "WiFi password",
  "terms and conditions",
  "grocery list",
  "Monday motivation",
  "Pinterest board",
  "forgotten dreams",
  "banana peel fortune",
  "404 haiku",
  "morning alarm"
];

export const animeDialogues: string[] = [
  "JustAsPlanned",
  "PlusUltra",
  "BelieveIt",
  "OmaeWaMouShindeiru",
  "ThisIsTheChoiceOfSteinsGate",
  "IAmAtomic",
  "GetInTheRobotShinji",
  "ItsOverNineThousand",
  "Dattebayo",
  "YareYareDaze",
  "Bankai",
  "ElPsyCongroo",
  "NicoNicoNii",
  "OraOraOra",
  "MudaMudaMuda",
  "YoureAlreadyDead",
  "ToBecomeHokage",
  "ThisWorldIsCruel",
  "SeeYouSpaceCowboy",
  "IAmMadScientist",
  "HumanitysGreatestTalentIsTheAbilityToChange",
  "DoTheImpossibleSeeTheInvisible",
  "FightOn",
  "MyDrillIsTheDrillThatWillPierceTheHeavens",
  "PeopleDieWhenTheyAreKilled",
  "TheWorldIsntPerfectButItsThereForUsTryingTheBestItCan",
  "GiveUpOnYourDreamsAndDie"
];

export const animeCharacters: string[] = [
  "Saitama",
  "LeviAckerman",
  "SonGoku", 
  "NarutoUzumaki",
  "MonkeyDLuffy",
  "ErenYeager",
  "SpikeSpiegel",
  "LightYagami",
  "Vegeta",
  "RoronoaZoro",
  "SailorMoon",
  "EdwardElric",
  "AsukaLangleySoryu",
  "KakashiHatake",
  "MikasaAckerman",
  "RemReZero",
  "KilluaZoldyck",
  "GonFreecss",
  "TanjiroKamado",
  "NezukoKamado",
  "AllMight",
  "IzukuMidoriya",
  "ShotoTodoroki",
  "KatsukiBakugo",
  "GojoSatoru",
  "Escanor",
  "AlucardHellsing",
  "RevyTwoHands",
  "MotokoKusanagi"
];

export const urlOpenerJokeTemplates: string[] = [
  "this-url-isnt-long-it-just-took-a-{adj}-detour-through-the-{place}-dimension-escorted-by-{anime_char}-who-kept-saying-{anime_dialogue}",
  "warning-this-link-is-so-long-it-has-its-own-{silly_noun}-and-a-{adj}-{animal}-mascot-approved-by-{anime_char}",
  "they-said-shorten-it-i-said-this-url-is-now-an-epic-saga-about-a-{verb}ing-{animal}-in-a-{silly_noun}-shouting-{anime_dialogue}-like-{anime_char}",
  "this-isnt-just-a-url-its-a-{adj}-journey-longer-than-your-last-{absurd_comparison}-or-{anime_char}s-training-montage",
  "my-other-link-is-a-tweet-this-one-is-a-{adj}-{silly_noun}-manifesto-with-{anime_dialogue}-as-its-motto-signed-by-{anime_char}",
  "this-link-is-not-short-its-just-big-boned-and-full-of-{adj}-{silly_noun}-character-and-{anime_char}-energy",
  "prepare-for-url-overload-this-one-is-more-{adj}-than-a-{animal}-{verb}ing-at-a-{place}-while-{anime_char}-narrates-{anime_dialogue}",
  "this-url-is-so-extended-it-probably-has-a-sequel-starring-a-{adj}-{silly_noun}-and-{anime_char}-as-the-villain-who-says-{anime_dialogue}",
  "caution-clicking-this-link-is-like-starting-a-{adj}-novel-about-a-{animal}-who-{verb}s-and-dreams-of-being-{anime_char}",
  "this-link-believes-brevity-is-a-myth-unlike-this-{adj}-{silly_noun}-which-{anime_char}-finds-{anime_dialogue}",
  "url-shorteners-weep-before-this-link-its-so-{adj}-it-has-its-own-{silly_noun}-fanclub-led-by-{anime_char}-chanting-{anime_dialogue}",
  "this-url-isnt-just-long-its-a-digital-epic-rivaling-the-{absurd_comparison}-of-{anime_char}-s-backstory-complete-with-{anime_dialogue}-flashbacks",
  "i-asked-{anime_char}-to-make-this-url-shorter-they-said-{anime_dialogue}-and-added-a-{adj}-{place}-segment-about-their-favorite-{silly_noun}",
  "this-url-isnt-short-{anime_char}-calls-it-{anime_dialogue}-for-a-reason",
  "if-this-url-was-a-domain-name-{anime_char}-would-buy-it-and-set-the-homepage-to-just-{anime_dialogue}",
  "the-length-of-this-url-is-directly-proportional-to-how-many-times-{anime_char}-has-shouted-{anime_dialogue}",
  "this-isnt-a-url-its-a-quest-given-by-{anime_char}-the-reward-is-understanding-why-its-so-long-the-hint-is-{anime_dialogue}",
  "i-tried-to-encode-this-url-with-base64-but-{anime_char}-said-{anime_dialogue}-and-made-it-longer",
  "this-link-has-more-segments-than-{anime_char}-has-special-moves-each-one-whispering-{anime_dialogue}",
  "send-this-url-to-your-enemies-{anime_char}-approves-this-message-with-a-resounding-{anime_dialogue}"
];

export const humorousTemplates: string[] = [
  "why-be-{adj}-when-you-can-be-{adj2}-and-{silly_noun}-like-{anime_char}-who-always-says-{anime_dialogue}",
  "i-clicked-a-link-and-now-im-stuck-in-a-{adj}-{place}-with-{anime_char}-who-wont-stop-muttering-{anime_dialogue}",
  "never-trust-a-{animal}-that-{verb}s-during-a-meeting-unless-its-{anime_char}-about-to-unleash-{anime_dialogue}",
  "they-said-keep-it-short-but-i-said-{funny_phrase}-then-{anime_char}-added-{anime_dialogue}-and-made-it-an-epic-url",
  "this-url-is-longer-than-my-{absurd_comparison}-or-{anime_char}s-list-of-defeated-foes",
  "my-{silly_noun}-knows-more-about-{place}-than-i-do-probably-learned-it-from-{anime_char}-during-a-{anime_dialogue}-session",
  "if-a-{animal}-{verb}s-in-the-digital-forest-and-{anime_char}-isnt-there-to-hear-it-does-it-make-a-{anime_dialogue}",
  "beware-of-the-{adj}-{silly_noun}-near-the-{place}-its-{anime_char}s-favorite-snack-after-a-long-{anime_dialogue}",
  "this-url-is-so-long-{anime_char}-would-say-{anime_dialogue}-before-even-attempting-to-type-it",
  "my-{silly_noun}-went-{anime_dialogue}-and-transformed-into-this-{adj}-link-to-{anime_char}-s-secret-{place}",
  "warning-this-permalink-is-guarded-by-{anime_char}-who-judges-your-{absurd_comparison}-and-mutters-{anime_dialogue}",
  "if-{animal}-could-talk-it-would-probably-quote-{anime_char}-saying-{anime_dialogue}-about-this-{funny_phrase}",
  "this-permalink-is-longer-than-{anime_char}-s-special-move-name-and-uses-more-bandwidth-to-say-{anime_dialogue}",
  "if-this-url-was-an-anime-{anime_char}-would-be-the-{adj}-protagonist-whose-catchphrase-is-{anime_dialogue}-every-time-a-new-segment-loads",
  "{anime_char}-once-said-{anime_dialogue}-probably-after-seeing-a-url-this-{adj}-and-full-of-{silly_noun}s",
  "this-url-is-a-sidequest-from-{anime_char}-the-objective-is-to-find-the-meaning-of-{anime_dialogue}-hidden-in-its-length",
  "the-internet-is-a-{adj}-{place}-especially-when-{anime_char}-is-posting-links-that-scream-{anime_dialogue}",
  "i-tried-to-shorten-this-url-but-{anime_char}-used-{anime_dialogue}-and-it-grew-three-sizes-that-day",
  "this-isnt-just-a-url-its-a-test-of-patience-from-{anime_char}-who-believes-{anime_dialogue}-is-the-key",
  "my-browser-crashed-loading-this-url-{anime_char}-appeared-and-said-{anime_dialogue}-then-fixed-it-with-a-{silly_noun}",
  "this-link-is-like-an-anime-filler-arc-long-convoluted-but-{anime_char}-shows-up-eventually-to-say-{anime_dialogue}",
  "the-scroll-bar-for-this-url-is-so-small-{anime_char}-could-use-it-as-a-toothpick-while-pondering-{anime_dialogue}",
  "this-url-has-more-plot-twists-than-a-shonen-anime-starring-{anime_char}-with-a-secret-{anime_dialogue}",
  "i-showed-this-url-to-{anime_char}-they-just-nodded-solemnly-and-whispered-{anime_dialogue}",
  "this-url-is-the-digital-equivalent-of-{anime_char}-powering-up-for-five-episodes-before-finally-unleashing-{anime_dialogue}",
  "navigating-this-url-feels-like-{anime_char}-trying-to-explain-{anime_dialogue}-to-a-{animal}",
  "this-url-is-so-{adj}-it-makes-{anime_char}-question-their-life-choices-leading-to-a-dramatic-{anime_dialogue}",
  "send-this-link-to-someone-you-dislike-{anime_char}-said-{anime_dialogue}-and-then-laughed-maniacally",
  "this-url-is-not-a-bug-its-a-feature-designed-by-{anime_char}-to-promote-{anime_dialogue}-and-{silly_noun}s",
  "i-think-{anime_char}-coded-this-url-after-binge-watching-too-much-and-shouting-{anime_dialogue}-at-the-screen",
  "this-url-is-my-masterpiece-of-procrastination-inspired-by-{anime_char}s-ability-to-delay-the-inevitable-with-a-well-timed-{anime_dialogue}"
];