const samplePosts = [
  {
    username: "dev_24",
    title: "Post creation now works (probably)",
    content: "You can now create posts. If it breaks, you didn’t see this post.",
    comments: [
      {
        cUsername: "dev_16",
        cTitle: "It *definitely* broke",
        cContent: "I made a post and it disappeared into the void.",
      },
    ],
  },
  {
    username: "nora99",
    title: "I wrote an emotional post and it got deleted",
    content: "Turns out the delete button *really* works. I clicked it by accident and now my feelings are gone.",
    comments: [
      {
        cUsername: "dev_18",
        cTitle: "feature not bug",
        cContent: "Deleting posts is therapeutic. You’re welcome.",
      },
    ],
  },
  {
    username: "ev_18",
    title: "Rich Text Formatting is here 🎉",
    content: "You can now use <b>bold</b>, <i>italic</i>, and <u>underline</u> in posts and comments.",
    comments: [
      {
        cUsername: "nora99",
        cTitle: "<u>This is my whole personality now</u>",
        cContent: "<b><i>I will only speak in styles from now on.</i></b>",
      },
    ],
  },
  {
    username: "jamie_writer",
    title: "My post got eaten by MongoDB",
    content: "I saved it, came back, and it’s gone. I think Mongo is hungry.",
    comments: [
      {
        cUsername: "dev_24",
        cTitle: "MongoDB is innocent",
        cContent: "Probably a bug in the save handler. Or the ghost of my last draft.",
      },
    ],
  },
  {
    username: "dev_16",
    title: "Commenting now works!",
    content: "You can now comment on any post. Be civil. Or don’t. I’m not your mod.",
    comments: [
      {
        cUsername: "jamie_writer",
        cTitle: "First!",
        cContent: "Just testing. Please ignore me.",
      },
    ],
  },
  {
    username: "nora99",
    title: "Is this EJS magic or a fever dream?",
    content: "I changed one tag and the entire layout exploded. I fear the templating gods.",
    comments: [
      {
        cUsername: "dev_18",
        cTitle: "sacrifice more divs",
        cContent: "EJS demands tribute.",
      },
    ],
  },
  {
    username: "dev_84",
    title: "Posts can now be updated",
    content: "Edit your post if you made a typo. Or if your entire personality changed in 5 minutes.",
    comments: [
      {
        cUsername: "jamie_writer",
        cTitle: "I regret everything",
        cContent: "Editing is a blessing and a curse. Mostly a curse.",
      },
    ],
  },
  {
    username: "dev_84",
    title: "Basic frontend is live",
    content: "It’s functional. Not cute, but functional. If you want pretty, go outside.",
    comments: [],
  },
  {
    username: "dev_18",
    title: "We’re live on MongoDB now",
    content: "Your posts are stored. Forever. Even the cringe ones.",
    comments: [
      {
        cUsername: "nora99",
        cTitle: "Nooo",
        cContent: "There’s stuff in there I want buried.",
      },
    ],
  },
  {
    username: "dev_24",
    title: "Backend stable-ish",
    content: "Express is behaving... for now. Don’t push it.",
    comments: [
      {
        cUsername: "maria_dev",
        cTitle: "Famous last words",
        cContent: "You just jinxed the backend. Prepare for war.",
      },
    ],
  },
  {
    "username": "dev_24",
    "title": "Dark mode Functionality",
    "content": "Hey There ! Now you have <u>dark mode</u>. It is pretty, isn't it",
    "comments": []
  }

];


module.exports = { data: samplePosts };
