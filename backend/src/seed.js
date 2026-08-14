import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.admin.upsert({
    where: { username },
    update: {},
    create: { username, passwordHash },
  });

  await prisma.language.createMany({
    skipDuplicates: true,
    data: [
      { name: "JavaScript", category: "Frontend", level: "Geavanceerd", color: "#f7df1e", order: 1 },
      { name: "TypeScript", category: "Frontend", level: "Geavanceerd", color: "#3178c6", order: 2 },
      { name: "React", category: "Frontend", level: "Geavanceerd", color: "#61dafb", order: 3 },
      { name: "Next.js", category: "Frontend", level: "Geavanceerd", color: "#ffffff", order: 4 },
      { name: "Vue.js", category: "Frontend", level: "Gevorderd", color: "#42b883", order: 5 },
      { name: "Tailwind CSS", category: "Frontend", level: "Geavanceerd", color: "#06b6d4", order: 6 },
      { name: "Node.js", category: "Backend", level: "Geavanceerd", color: "#339933", order: 7 },
      { name: "Express", category: "Backend", level: "Geavanceerd", color: "#ffffff", order: 8 },
      { name: "Python", category: "Backend", level: "Gevorderd", color: "#3776ab", order: 9 },
      { name: "PostgreSQL", category: "Database", level: "Gevorderd", color: "#4169e1", order: 10 },
      { name: "Prisma", category: "Database", level: "Gevorderd", color: "#2d3748", order: 11 },
      { name: "Docker", category: "DevOps", level: "Beginner", color: "#2496ed", order: 12 },
      { name: "Git", category: "Tools", level: "Geavanceerd", color: "#f05032", order: 13 },
    ],
  });

  await prisma.project.createMany({
    skipDuplicates: true,
    data: [
      {
        title: "PhoenixSite",
        description: "Een persoonlijke portfolio website gebouwd met Next.js, Express en PostgreSQL. Gehost op Railway met page transition animaties.",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Express", "Prisma", "PostgreSQL"],
        liveUrl: "https://phoenix.up.railway.app",
        githubUrl: "https://github.com/milan/phoenixsite",
        featured: true,
        order: 1,
      },
      {
        title: "Discord Bot Dashboard",
        description: "Een web-based dashboard voor het beheren van een Discord bot met realtime statistieken en server instellingen.",
        technologies: ["React", "Node.js", "Discord.js", "MongoDB"],
        githubUrl: "https://github.com/milan/discord-dashboard",
        featured: true,
        order: 2,
      },
      {
        title: "Weather App",
        description: "Een weer-applicatie met realtime data van OpenWeatherMap API. Toont weersverwachtingen voor de komende 7 dagen.",
        technologies: ["Vue.js", "Vite", "Tailwind CSS"],
        githubUrl: "https://github.com/milan/weather-app",
        order: 3,
      },
      {
        title: "Task Manager API",
        description: "Een REST API voor taakbeheer met gebruikersauthenticatie, project organisatie en team collaboration features.",
        technologies: ["Node.js", "Express", "PostgreSQL", "JWT"],
        githubUrl: "https://github.com/milan/task-api",
        order: 4,
      },
    ],
  });

  console.log("Seed data inserted successfully");
  console.log(`Admin user: ${username} / ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
