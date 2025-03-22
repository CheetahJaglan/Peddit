const samplePosts = [
  {
    username: "cheetah",
    title: "I went to Italy",
    content: "And now I only speak Italian. Mamma mia, this is amazing!",
    comments: [
      {
        cUsername: "pasta_lover99",
        cTitle: "Benvenuto!",
        cContent: "Ah, another one joins the pasta cult. Welcome!",
      },
      {
        cUsername: "spaghetti_revenge",
        cTitle: "Beware the curse!",
        cContent:
          "Once you start speaking Italian, your hands will start moving uncontrollably while talking. It’s too late for you.",
      },
    ],
  },
  {
    username: "jaguar",
    title: "My brother went to Italy, now he refuses to eat anything but pizza",
    content:
      "A few days ago, my brother Cheetah went to Italy. Now he only speaks Italian, refuses to eat anything but pizza, and insists on calling me ‘fratello.’ I need an intervention, help!",
    comments: [
      {
        cUsername: "gelato_fanatic",
        cTitle: "Does he eat gelato too?",
        cContent:
          "If he starts demanding gelato at midnight, then it’s REALLY serious.",
      },
    ],
  },
  {
    username: "lion",
    title: "My son is a pizza addict",
    content:
      "He won’t eat anything but pizza and now calls me ‘Babbo’. I just wanted a normal family meal. I am losing hope.",
    comments: [],
  },
  {
    username: "cheetah",
    title: "I have been resurrected!",
    content:
      "I am back from the flour explosion! And I have perfected my pizza recipe. Behold, the Ultimate Pizza!",
    comments: [
      {
        cUsername: "pasta_lover99",
        cTitle: "The prophecy fulfilled",
        cContent: "You have returned... stronger... cheesier... wiser.",
      },
    ],
  },
  {
    username: "jaguar",
    title: "Cheetah opened a pizza shop in our garage",
    content:
      "He’s taking orders, making fresh dough, and blasting Italian opera music. Neighbors are complaining. Babbo (Dad) is losing his mind. We need a plan!",
    comments: [
      {
        cUsername: "neighborhood_watcher",
        cTitle: "We can hear it too",
        cContent:
          "Tell him to at least stop singing along with the opera. It’s terrifying.",
      },
    ],
  },
  {
    username: "lioness",
    title: "Cheetah has become a local legend",
    content:
      "People are actually lining up at our garage for pizza. Some say it’s the best in town. We might have accidentally started a family business?",
    comments: [
      {
        cUsername: "pizza_fanatic42",
        cTitle: "How much for a slice?",
        cContent: "If it’s that good, I’ll take a whole pie. Does he deliver?",
      },
    ],
  },
  {
    username: "cheetah",
    title: "Now I am on a mission!",
    content:
      "I am taking my pizza skills to the world! First stop, New York. I will show them TRUE Italian pizza!",
    comments: [
      {
        cUsername: "newyorker101",
        cTitle: "Good luck, buddy",
        cContent:
          "You better be ready for a fight if you say NY pizza isn’t real pizza.",
      },
    ],
  },
  {
    username: "jaguar",
    title: "He left for New York... with a suitcase full of flour",
    content:
      "Cheetah is serious. He actually packed a suitcase with ‘authentic Italian flour’ and left for NYC. I fear he won’t return the same... if he returns at all.",
    comments: [
      {
        cUsername: "airport_security",
        cTitle: "Flour is suspicious",
        cContent:
          "If TSA catches him with 10kg of white powder, he’s going to have a long conversation at customs.",
      },
    ],
  },
  {
    username: "lion",
    title: "Cheetah is now famous... and banned from 3 pizza chains",
    content:
      "Apparently, he challenged multiple pizza shops to ‘pizza duels’ and caused chaos. The family name will never recover from this disgrace.",
    comments: [
      {
        cUsername: "news_reporter",
        cTitle: "Pizza Wars 2025",
        cContent:
          "Breaking news: Mysterious Italian man challenges New York pizzerias to battle. Witnesses say ‘he fought with passion.’",
      },
    ],
  },
  {
    username: "pizza_hater_5469",
    title: "I ate a delicious pizza",
    content:
      "Some random guy named cheetah gave me a pizza and it was just 🔥🔥. It was Great. Guess i have to change my username to pizza lover",
    comments: [
      {
        cUsername: "yo_yo_pizzas",
        cTitle: "That's Great",
        cContent: "",
      },
    ],
  },
  {
    username: "developer_64",
    title: "This is a test post.",
    content:
      "This text is <b>bold </b>and this is <i>italic</i> and this text is <i><b>bold_italic.</b></i>",
    comments: [
      {
        cUsername: "dumb",
        cTitle: "how do i do it?",
        cContent: "",
      },
      {
        cUsername: "smart",
        cTitle: "Problem solved",
        cContent:
          "click on <b>b</b> button for <b>bold </b>and <i>i</i> button for <i>italic.</i>",
      },
    ],
  },
  {
    username: "developer_69",
    title: "I added the ability to underline",
    content: "now u can <u>underline </u>your text",
    comments: [
      {
        cUsername: "dumb",
        cTitle: "i underlined the whole post",
        cContent: "<u>all of it is underlined</u>",
      },
    ],
  },
  {
    username: "developer_109",
    title: "Now, there is dark mode",
    content: "<i>Guyyss</i>! Now you have <b><u>dark mode</u></b>.",
    comments: [],
  },
];

module.exports = { data: samplePosts };
