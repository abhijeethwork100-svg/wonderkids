export interface Activity {
  id: string;
  slug: string;
  title: string;
  type: "diy" | "demo" | "printable" | "game" | "learning";
  ageRange: string;
  difficulty: "easy" | "medium" | "hard";
  duration: string;
  image: string;
  description: string;
}

export const ACTIVITIES: Activity[] = [
  // DIY Crafts (3)
  {
    id: "diy-cardboard-castle",
    slug: "cardboard-castle",
    title: "Build a Cardboard Castle",
    type: "diy",
    ageRange: "5-10",
    difficulty: "medium",
    duration: "45 mins",
    image: "/images/activities/cardboard-castle.png",
    description: "Transform old cardboard boxes into a magnificent castle with towers, a drawbridge, and flags. Perfect weekend project!",
  },
  {
    id: "diy-slime-lab",
    slug: "slime-lab",
    title: "Rainbow Slime Lab",
    type: "diy",
    ageRange: "6-12",
    difficulty: "easy",
    duration: "30 mins",
    image: "/images/activities/slime-lab.png",
    description: "Make colourful, stretchy slime using safe household ingredients. Learn about polymers while having gooey fun!",
  },
  {
    id: "diy-puppet-theater",
    slug: "puppet-theater",
    title: "Sock Puppet Theater",
    type: "diy",
    ageRange: "4-8",
    difficulty: "easy",
    duration: "25 mins",
    image: "/images/activities/puppet-theater.png",
    description: "Create adorable sock puppets and put on a show! All you need are old socks, buttons, and a bit of imagination.",
  },

  // Toy Demos (3)
  {
    id: "demo-lego-challenge",
    slug: "lego-speed-challenge",
    title: "LEGO Speed Build Challenge",
    type: "demo",
    ageRange: "6-14",
    difficulty: "medium",
    duration: "20 mins",
    image: "/images/activities/lego-speed-challenge.png",
    description: "Watch and follow along with our LEGO speed build challenge. Can you build faster than our timer? Grab your bricks!",
  },
  {
    id: "demo-rc-obstacle",
    slug: "rc-obstacle-course",
    title: "RC Car Obstacle Course",
    type: "demo",
    ageRange: "7-12",
    difficulty: "medium",
    duration: "15 mins",
    image: "/images/activities/rc-obstacle-course.png",
    description: "Set up an epic obstacle course for your RC car using household items. Navigate tunnels, ramps, and tight turns!",
  },
  {
    id: "demo-science-volcano",
    slug: "volcano-experiment",
    title: "Erupting Volcano Demo",
    type: "demo",
    ageRange: "5-10",
    difficulty: "easy",
    duration: "15 mins",
    image: "/images/activities/volcano-experiment.png",
    description: "Build a mini volcano and watch it erupt with a fizzy reaction. A classic science experiment every kid should try!",
  },

  // Printables (3)
  {
    id: "print-treasure-map",
    slug: "treasure-map",
    title: "Pirate Treasure Map",
    type: "printable",
    ageRange: "4-9",
    difficulty: "easy",
    duration: "10 mins",
    image: "/images/activities/treasure-map.png",
    description: "Download and print our pirate treasure map. Hide clues around the house and send kids on an exciting treasure hunt!",
  },
  {
    id: "print-paper-dolls",
    slug: "paper-dolls",
    title: "Paper Doll Fashion Studio",
    type: "printable",
    ageRange: "5-10",
    difficulty: "easy",
    duration: "15 mins",
    image: "/images/activities/paper-dolls.png",
    description: "Print, colour, and cut out fashion dolls with mix-and-match outfits. Design your own collection!",
  },
  {
    id: "print-board-game",
    slug: "printable-board-game",
    title: "Jungle Adventure Board Game",
    type: "printable",
    ageRange: "6-12",
    difficulty: "easy",
    duration: "30 mins",
    image: "/images/activities/printable-board-game.png",
    description: "Print our original jungle-themed board game! Roll the dice, dodge tigers, and race to the treasure. Fun for the whole family.",
  },

  // Mini Games (3)
  {
    id: "game-memory-match",
    slug: "memory-match",
    title: "Toy Memory Match",
    type: "game",
    ageRange: "3-8",
    difficulty: "easy",
    duration: "10 mins",
    image: "/images/activities/memory-match.png",
    description: "Test your memory! Flip cards and match pairs of your favourite toys. Gets harder with each level. How fast can you go?",
  },
  {
    id: "game-word-search",
    slug: "toy-word-search",
    title: "Toy World Word Search",
    type: "game",
    ageRange: "6-12",
    difficulty: "medium",
    duration: "15 mins",
    image: "/images/activities/toy-word-search.png",
    description: "Find hidden toy-related words in our interactive word search puzzle. Three difficulty levels to challenge every age.",
  },
  {
    id: "game-quiz-toymaster",
    slug: "toy-master-quiz",
    title: "Toy Master Quiz",
    type: "game",
    ageRange: "7-14",
    difficulty: "hard",
    duration: "20 mins",
    image: "/images/activities/toy-master-quiz.png",
    description: "Think you know everything about toys? Take our ultimate toy trivia quiz with questions about toys from around the world!",
  },

  // Learning Activities (3)
  {
    id: "learn-coding-blocks",
    slug: "coding-with-blocks",
    title: "Coding with Building Blocks",
    type: "learning",
    ageRange: "5-9",
    difficulty: "medium",
    duration: "30 mins",
    image: "/images/activities/coding-with-blocks.png",
    description: "Learn basic coding concepts using physical building blocks. Sequence, loop, and debug your way through fun challenges!",
  },
  {
    id: "learn-nature-journal",
    slug: "nature-journal",
    title: "Backyard Nature Journal",
    type: "learning",
    ageRange: "6-12",
    difficulty: "easy",
    duration: "40 mins",
    image: "/images/activities/nature-journal.png",
    description: "Grab a notebook and head outside! Observe plants, insects, and birds. Sketch, write, and become a junior naturalist.",
  },
  {
    id: "learn-math-games",
    slug: "math-with-toys",
    title: "Fun Math with Toys",
    type: "learning",
    ageRange: "4-8",
    difficulty: "easy",
    duration: "20 mins",
    image: "/images/activities/math-with-toys.png",
    description: "Use toy cars, blocks, and dolls to practice counting, sorting, patterns, and basic arithmetic. Maths has never been this fun!",
  },
];
