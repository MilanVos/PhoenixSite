export interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string;
  tags: string[];
}

export const experiences: Experience[] = [
  {
    company: "COMPANY ONE",
    role: "Developer",
    duration: "1 year",
    description:
      "Created configurations, developed custom plugins, and built complete server setups from scratch.",
    tags: ["Configurations", "Plugins", "Server Setup"],
  },
  {
    company: "COMPANY TWO",
    role: "Senior Developer",
    duration: "4 years",
    description:
      "Created server setups, developed clean configurations, and fixed bugs and glitches across the network.",
    tags: ["Server Setup", "Configuration", "Bug Fixes"],
  },
  {
    company: "COMPANY THREE",
    role: "Gamemode Developer",
    duration: "1 year",
    description:
      "Created server setups, developed clean configurations, and fixed bugs and glitches for the FFA gamemode.",
    tags: ["FFA", "Server Setup", "Configuration"],
  },
  {
    company: "COMPANY FOUR",
    role: "Developer",
    duration: "3 months",
    description:
      "Created server setups, developed clean configurations, and fixed bugs and glitches.",
    tags: ["Server Setup", "Configuration", "Bug Fixes"],
  },
  {
    company: "COMPANY FIVE",
    role: "Developer",
    duration: "3 months",
    description:
      "Created server setups, developed clean configurations, and fixed bugs and glitches.",
    tags: ["Server Setup", "Configuration", "Bug Fixes"],
  },
];
