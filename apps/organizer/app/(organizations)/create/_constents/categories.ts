export interface CategoryOption {
  id: number;
  name: string;
  description: string;
  subCategories: { id: number; name: string }[];
}

export const ORGANIZATION_CATEGORIES: CategoryOption[] = [
  {
    id: 1,
    name: "Conferences & Summits",
    description: "Tech, Business, Scientific & Professional Conferences",
    subCategories: [
      { id: 101, name: "Technology & Software" },
      { id: 102, name: "Business & Leadership" },
      { id: 103, name: "Science & Healthcare" },
      { id: 104, name: "Design & Product" },
    ],
  },
  {
    id: 2,
    name: "Music & Festivals",
    description: "Concerts, Music Festivals, DJ Nights & Live Gigs",
    subCategories: [
      { id: 201, name: "Live Concerts" },
      { id: 202, name: "Electronic & DJ Nights" },
      { id: 203, name: "Cultural & Folk Festivals" },
      { id: 204, name: "Classical & Acoustic" },
    ],
  },
  {
    id: 3,
    name: "Workshops & Masterclasses",
    description: "Interactive Learning, Hands-on Training & Bootcamps",
    subCategories: [
      { id: 301, name: "Coding & Tech Workshops" },
      { id: 302, name: "Art & Creative Crafting" },
      { id: 303, name: "Cooking & Mixology" },
      { id: 304, name: "Career & Skill Development" },
    ],
  },
  {
    id: 4,
    name: "Sports & Fitness",
    description: "Marathons, Tournaments, Esports & Fitness Expos",
    subCategories: [
      { id: 401, name: "Running & Marathon" },
      { id: 402, name: "Tournament & League" },
      { id: 403, name: "Esports & Gaming" },
      { id: 404, name: "Yoga & Wellness Retreats" },
    ],
  },
  {
    id: 5,
    name: "Arts & Entertainment",
    description: "Comedy, Theatre, Art Shows, Exhibitions & Film Screenings",
    subCategories: [
      { id: 501, name: "Stand-up Comedy" },
      { id: 502, name: "Theatre & Drama" },
      { id: 503, name: "Art Gallery & Exhibitions" },
      { id: 504, name: "Film Screenings & Festivals" },
    ],
  },
  {
    id: 6,
    name: "Community & Non-Profit",
    description: "Charity, Networking, Meetups & Social Impact",
    subCategories: [
      { id: 601, name: "Charity & Fundraising" },
      { id: 602, name: "Community Meetups" },
      { id: 603, name: "Sustainability & Environment" },
      { id: 604, name: "Alumni & Professional Networks" },
    ],
  },
];
