import { Router } from "express";
import { prisma } from "../index.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });
  res.json(projects);
});

router.get("/:id", async (req, res) => {
  const project = await prisma.project.findUnique({
    where: { id: parseInt(req.params.id) },
  });

  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }

  res.json(project);
});

router.post("/", requireAuth, async (req, res) => {
  const { title, description, technologies, imageUrl, liveUrl, githubUrl, featured, order } = req.body;

  const project = await prisma.project.create({
    data: {
      title,
      description,
      technologies: technologies || [],
      imageUrl: imageUrl || null,
      liveUrl: liveUrl || null,
      githubUrl: githubUrl || null,
      featured: featured || false,
      order: order || 0,
    },
  });

  res.status(201).json(project);
});

router.put("/:id", requireAuth, async (req, res) => {
  const { title, description, technologies, imageUrl, liveUrl, githubUrl, featured, order } = req.body;

  const project = await prisma.project.update({
    where: { id: parseInt(req.params.id) },
    data: {
      title,
      description,
      technologies,
      imageUrl,
      liveUrl,
      githubUrl,
      featured,
      order,
    },
  });

  res.json(project);
});

router.delete("/:id", requireAuth, async (req, res) => {
  await prisma.project.delete({
    where: { id: parseInt(req.params.id) },
  });

  res.status(204).send();
});

export default router;
