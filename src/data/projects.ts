export interface Project {
  name: string;
  category: string;
  description: string;
  tags: string[];
  badge: "Featured" | "Commissioned" | null;
  links: { label: string; url: string }[];
}

export const projects: Project[] = [
  {
    name: "WWCore",
    category: "Werewolf Game Plugin",
    description:
      "Complete Weerwolven van Wakkerdam plugin with 12+ roles, night/day cycle, anonymous voting, personal scoreboards, and Discord voice channel integration with auto-mute for eliminated players.",
    tags: ["Java 21", "Spigot", "JDA", "Discord", "Maven"],
    badge: "Featured",
    links: [
      { label: "GitHub", url: "https://github.com/MilanVos/WWCore" },
    ],
  },
  {
    name: "CIVITASRP",
    category: "Roleplay Plugin",
    description:
      "Dutch roleplay plugin with 4 roles (Burger, Politie, Ambulance, Gemeente), GUI menus, custom items, down/reanimation system, fines, reputation system, and SQLite database storage.",
    tags: ["Java 21", "Spigot", "SQLite", "GUI", "Maven"],
    badge: "Featured",
    links: [
      { label: "GitHub", url: "https://github.com/MilanVos/CIVITASRP" },
    ],
  },
  {
    name: "PhoenixCore",
    category: "Staff Utility Plugin",
    description:
      "Professional staff management plugin with staff mode, vanish, freeze with SQLite persistence, punishment GUI, inventory inspection, staff chat, command spy, and Discord webhook audit logging.",
    tags: ["Java 17", "Spigot", "SQLite", "Discord", "Maven"],
    badge: "Featured",
    links: [
      { label: "GitHub", url: "https://github.com/MilanVos/PhoenixCore" },
    ],
  },
  {
    name: "MinestormServer",
    category: "Custom Server Framework",
    description:
      "Custom Minecraft server built on the Minestom framework instead of traditional Spigot. Lightweight, high-performance alternative for specialized server setups.",
    tags: ["Java 21", "Minestom", "Maven"],
    badge: null,
    links: [
      { label: "GitHub", url: "https://github.com/MilanVos/MinestormServer" },
    ],
  },
  {
    name: "RewardsSystem",
    category: "Rewards Plugin",
    description:
      "Spigot rewards plugin for automated player rewards and progression tracking. Built for Paper 1.21.11 with clean Maven shade packaging.",
    tags: ["Java 21", "Spigot", "Maven"],
    badge: null,
    links: [
      { label: "GitHub", url: "https://github.com/MilanVos/RewardsSystem" },
    ],
  },
  {
    name: "FoxWars",
    category: "Minigame Plugin",
    description:
      "Minecraft minigame plugin built for Spigot 1.20.4. Lightweight and self-contained with no external dependencies.",
    tags: ["Java 17", "Spigot", "Maven"],
    badge: null,
    links: [
      { label: "GitHub", url: "https://github.com/MilanVos/FoxWars" },
    ],
  },
];
