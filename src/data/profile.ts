export interface Profile {
  name: string;
  title: string;
  tagline: string;
  available: boolean;
  stats: { label: string; value: string }[];
  about: {
    heading: string;
    paragraphs: string[];
  };
  stack: string[];
  openToWork: string;
  socials: {
    discord: string;
    github: string;
    email: string;
  };
}

export const profile: Profile = {
  name: "YOUR NAME",
  title: "Your Role / Title",
  tagline: "Building scalable Minecraft server infrastructure for millions of players worldwide.",
  available: true,
  stats: [
    { label: "Years Experience", value: "6+" },
    { label: "Major Networks", value: "5+" },
    { label: "Peak CCU", value: "50k+" },
  ],
  about: {
    heading: "I build the systems that makes Minecraft servers feel smooth and memorable.",
    paragraphs: [
      "Hey, I'm [Your Name]. I've been working with Minecraft servers for around six years, mainly building custom gameplay features and improving how servers run behind the scenes. I focus on writing clean, reliable code and creating systems that feel smooth and enjoyable for players.",
      "From custom game modes to distributed server architectures, I bring the same level of precision and care to every project. Clean code, clear communication, and systems that scale.",
    ],
  },
  stack: [
    "Java",
    "React",
    "TypeScript",
    "Spigot",
    "PaperMC",
    "Fabric",
    "BungeeCord",
    "Velocity",
    "MySQL",
    "MongoDB",
    "Git",
  ],
  openToWork:
    "Available for plugin development, server setup, and technical consulting.",
  socials: {
    discord: "@yourhandle",
    github: "@yourhandle",
    email: "you@example.com",
  },
};
