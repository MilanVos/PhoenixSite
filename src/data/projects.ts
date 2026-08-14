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
    name: "PROJECT ONE",
    category: "Minigame",
    description:
      "Ultimate battle royale plugin combining match automation, player handling, and server efficiency.",
    tags: ["Java", "PaperMC", "MySQL"],
    badge: "Featured",
    links: [
      { label: "BuiltByBit", url: "#" },
      { label: "Demo", url: "#" },
    ],
  },
  {
    name: "PROJECT TWO",
    category: "Gliders",
    description:
      "Bring custom glider visuals, smooth flight mechanics, and a more immersive flying experience to your server.",
    tags: ["Java", "PaperMC", "SpigotMC", "MySQL"],
    badge: "Featured",
    links: [
      { label: "BuiltByBit", url: "#" },
      { label: "Demo", url: "#" },
    ],
  },
  {
    name: "PROJECT THREE",
    category: "Server Setup",
    description:
      "Complete lobby setup with custom configurations, optimized performance, and polished player experience.",
    tags: ["Setup", "Optimization", "Custom Textures"],
    badge: "Commissioned",
    links: [
      { label: "Private commission", url: "#" },
      { label: "Watch Video", url: "#" },
    ],
  },
  {
    name: "PROJECT FOUR",
    category: "Server Setup",
    description:
      "Top-notch WoolWars setup made on 1.8 Spigot Server. This setup includes NPCs, Player Stats, 16+ Maps, and TAB & Scoreboard.",
    tags: ["High Quality", "PvP", "Setup"],
    badge: "Commissioned",
    links: [{ label: "Private commission", url: "#" }],
  },
];
