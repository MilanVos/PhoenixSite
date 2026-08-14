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
const __dirname = path.dirname(__dirname);

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

app.listen(PORT, () => {
  console.log(`Phoenix API running on http://localhost:${PORT}`);
});
