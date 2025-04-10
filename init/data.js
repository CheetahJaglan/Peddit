const samplePosts = [
  {
    username: "astroNate",
    title: "The moon is definitely fake",
    content: "I zoomed in with my phone and saw pixels. NASA’s been lying to us. Wake up, sheeple.",
    comments: [
      {
        cUsername: "quantumJess",
        cTitle: "Seek help",
        cContent: "Have you considered touching grass today?",
      },
      {
        cUsername: "codeBandit",
        cTitle: "hot take",
        cContent: "Finally, someone brave enough to speak nonsense.",
      },
    ],
  },
  {
    username: "quantumJess",
    title: "My cat is now lead dev",
    content: "She sat on my keyboard, wrote 17 lines of code, and somehow fixed a bug I couldn’t find for a week.",
    comments: [
      {
        cUsername: "astroNate",
        cTitle: "Hire her",
        cContent: "Put her on payroll. She’s clearly more qualified.",
      },
    ],
  },
  {
    username: "pixelPete",
    title: "Shaded for 3 hours, forgot to save",
    content: "Yup. Closed the file. Didn’t save. I’m just staring at the void now.",
    comments: [
      {
        cUsername: "byteQueen",
        cTitle: "pain",
        cContent: "Ctrl+S is free. Learn from our mistakes.",
      },
    ],
  },
  {
    username: "byteQueen",
    title: "I drink coffee like it’s a patch update",
    content: "v3.4.2 – minor bug fixes and increased sarcasm per sip",
    comments: [
      {
        cUsername: "quantumJess",
        cTitle: "relatable af",
        cContent: "My blood type is espresso at this point.",
      },
    ],
  },
  {
    username: "cyberDrip",
    title: "Styled my terminal to look like a rave",
    content: "It’s neon pink on jet black. I now fear no bug. Only migraines.",
    comments: [
      {
        cUsername: "scriptGoblin",
        cTitle: "visual chaos",
        cContent: "Your terminal is a disco ball and I respect that.",
      },
    ],
  },
  {
    username: "scriptGoblin",
    title: "I use Notepad++ and I’m not sorry",
    content: "You Vim vs Emacs people can fight in the trenches. I’ll be here, winning in simplicity.",
    comments: [
      {
        cUsername: "cyberDrip",
        cTitle: "respect++",
        cContent: "You’re the real minimalist MVP.",
      },
    ],
  },
  {
    username: "debugDylan",
    title: "Three hours of debugging for one semicolon",
    content: "I aged five years today. The semicolon was *right there*.",
    comments: [
      {
        cUsername: "byteQueen",
        cTitle: "classic JS moment",
        cContent: "JavaScript: where one semicolon decides your fate.",
      },
    ],
  },
  {
    username: "error404Eli",
    title: "Production is down and so am I",
    content: "Trying not to cry while pretending to 'investigate'. Currently Googling 'how to disappear'.",
    comments: [
      {
        cUsername: "debugDylan",
        cTitle: "mood",
        cContent: "You ever cry in SSH? Same.",
      },
    ],
  },
  {
    username: "pixelPete",
    title: "Made pixel art of my sadness",
    content: "It's just a single black square. It’s modern, it’s honest, it’s pain.",
    comments: [
      {
        cUsername: "astroNate",
        cTitle: "masterpiece",
        cContent: "Exhibited this in the MoMA of despair.",
      },
    ],
  },
  {
    username: "codeBandit",
    title: "‘Borrowed’ some code",
    content: "I copied it from Stack Overflow, sprinkled in a few comments, and boom — originality.",
    comments: [
      {
        cUsername: "error404Eli",
        cTitle: "certified dev moment",
        cContent: "If it works, it’s yours. That’s the law.",
      },
    ],
  },
];

module.exports = samplePosts;

/*
const users = [
  "astroNate",
  "quantumJess",
  "pixelPete",
  "byteQueen",
  "cyberDrip",
  "scriptGoblin",
  "debugDylan",
  "error404Eli",
  "codeBandit"
];
*/