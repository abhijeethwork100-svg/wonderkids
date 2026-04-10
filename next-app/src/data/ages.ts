export interface AgeGroup {
  id: string;
  slug: string;
  label: string;
  subtitle: string;
  ageMin: number;
  ageMax: number;
  image: string;
  color: string;
  description: string;
}

export const AGE_GROUPS: AgeGroup[] = [
  {
    id: "0-2",
    slug: "tiny-explorers",
    label: "0–2 Years",
    subtitle: "Tiny Explorers",
    ageMin: 0,
    ageMax: 2,
    image: "/images/ages/tiny-explorers.png",
    color: "#FFB6C1",
    description: "Safe, sensory-rich toys for babies and toddlers. Soft textures, bright colours, and gentle sounds to stimulate early development.",
  },
  {
    id: "3-5",
    slug: "little-adventurers",
    label: "3–5 Years",
    subtitle: "Little Adventurers",
    ageMin: 3,
    ageMax: 5,
    image: "/images/ages/little-adventurers.png",
    color: "#FF9800",
    description: "Imaginative play and early learning toys. Building blocks, pretend play sets, and creative kits to fuel growing curiosity.",
  },
  {
    id: "6-8",
    slug: "big-dreamers",
    label: "6–8 Years",
    subtitle: "Big Dreamers",
    ageMin: 6,
    ageMax: 8,
    image: "/images/ages/big-dreamers.png",
    color: "#4CAF50",
    description: "Challenge and adventure await! Science kits, complex building sets, and outdoor toys for kids ready to explore the world.",
  },
  {
    id: "9-12",
    slug: "super-builders",
    label: "9–12 Years",
    subtitle: "Super Builders",
    ageMin: 9,
    ageMax: 12,
    image: "/images/ages/super-builders.png",
    color: "#2196F3",
    description: "Advanced building, coding, and strategy games. Perfect for tweens who love a challenge and want to create amazing things.",
  },
  {
    id: "13-plus",
    slug: "teen-creators",
    label: "13+ Years",
    subtitle: "Teen Creators",
    ageMin: 13,
    ageMax: 18,
    image: "/images/ages/teen-creators.png",
    color: "#9C27B0",
    description: "Sophisticated kits, collectibles, and tech toys for teens. Robotics, model building, and creative expression tools.",
  },
];
