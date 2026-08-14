import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";

import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projects.js";
import languageRoutes from "./routes/languages.js";
import contactRoutes from "./routes/contact.js";

dotenv.config();

export const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendCandidates = [
  path.resolve(process.cwd(), "frontend/out"),
  path.resolve(__dirname, "../../frontend/out"),
  path.resolve(__dirname, "../frontend/out"),
];
const frontendOut = frontendCandidates.find((p) => fs.existsSync(p));

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Phoenix API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/languages", languageRoutes);
app.use("/api/contact", contactRoutes);

if (frontendOut) {
  app.use(express.static(frontendOut, { extensions: ["html"] }));

  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();

    const cleanPath = req.path.replace(/\/+$/, "");

    const dirIndex = path.join(frontendOut, cleanPath, "index.html");
    if (fs.existsSync(dirIndex)) {
      return res.sendFile(dirIndex);
    }

    const htmlFile = path.join(frontendOut, cleanPath + ".html");
    if (fs.existsSync(htmlFile)) {
      return res.sendFile(htmlFile);
    }

    const rootHtml = path.join(frontendOut, "index.html");
    if (fs.existsSync(rootHtml)) {
      return res.sendFile(rootHtml);
    }

    next();
  });

  console.log(`Serving frontend from ${frontendOut}`);
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Phoenix API running on http://0.0.0.0:${PORT}`);
  runSeed();
});

async function runSeed() {
  try {
    const { default: bcrypt } = await import("bcryptjs");
    const username = process.env.ADMIN_USERNAME || "admin";
    const password = process.env.ADMIN_PASSWORD || "admin123";
    const passwordHash = await bcrypt.hash(password, 10);

    await prisma.admin.upsert({
      where: { username },
      update: {},
      create: { username, passwordHash },
    });

    const languageCount = await prisma.language.count();
    if (languageCount > 0) {
      console.log("Seed skipped - data already exists");
      return;
    }

    await prisma.language.createMany({
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
      data: [
        {
          title: "PhoenixSite",
          description: "Persoonlijke portfolio website gebouwd met Next.js, Express en PostgreSQL. Gehost op Railway.",
          technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Express", "Prisma", "PostgreSQL"],
          liveUrl: null,
          githubUrl: "https://github.com/MilanVos/PhoenixSite",
          featured: true,
          order: 1,
        },
      ],
    });

    console.log("Seed completed");
  } catch (err) {
    console.error("Seed error (non-fatal):", err.message);
  }
}
