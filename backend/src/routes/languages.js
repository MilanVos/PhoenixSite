import { Router } from "express";
import { prisma } from "../index.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  const languages = await prisma.language.findMany({
    orderBy: { order: "asc" },
  });
  res.json(languages);
});

router.post("/", requireAuth, async (req, res) => {
  const { name, category, level, iconUrl, color, order } = req.body;

  const language = await prisma.language.create({
    data: {
      name,
      category,
      level,
      iconUrl: iconUrl || null,
      color: color || null,
      order: order || 0,
    },
  });

  res.status(201).json(language);
});

router.put("/:id", requireAuth, async (req, res) => {
  const { name, category, level, iconUrl, color, order } = req.body;

  const language = await prisma.language.update({
    where: { id: parseInt(req.params.id) },
    data: { name, category, level, iconUrl, color, order },
  });

  res.json(language);
});

router.delete("/:id", requireAuth, async (req, res) => {
  await prisma.language.delete({
    where: { id: parseInt(req.params.id) },
  });

  res.status(204).send();
});

export default router;
