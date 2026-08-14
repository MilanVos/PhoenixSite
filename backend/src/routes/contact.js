import { Router } from "express";
import { prisma } from "../index.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email and message are required" });
  }

  const contactMessage = await prisma.contactMessage.create({
    data: { name, email, message },
  });

  res.status(201).json({ success: true, id: contactMessage.id });
});

router.get("/", requireAuth, async (req, res) => {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(messages);
});

router.patch("/:id/read", requireAuth, async (req, res) => {
  const message = await prisma.contactMessage.update({
    where: { id: parseInt(req.params.id) },
    data: { read: true },
  });

  res.json(message);
});

router.delete("/:id", requireAuth, async (req, res) => {
  await prisma.contactMessage.delete({
    where: { id: parseInt(req.params.id) },
  });

  res.status(204).send();
});

export default router;
