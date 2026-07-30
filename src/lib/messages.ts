import { promises as fs } from "fs";
import path from "path";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");

async function ensureDataFile() {
  try {
    await fs.access(MESSAGES_FILE);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(MESSAGES_FILE, "[]", "utf-8");
  }
}

export async function saveMessage(
  input: Omit<ContactMessage, "id" | "createdAt">
): Promise<ContactMessage> {
  await ensureDataFile();
  const raw = await fs.readFile(MESSAGES_FILE, "utf-8");
  const messages: ContactMessage[] = JSON.parse(raw);
  const message: ContactMessage = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  messages.push(message);
  await fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");
  return message;
}

export async function getMessages(): Promise<ContactMessage[]> {
  try {
    await ensureDataFile();
    const raw = await fs.readFile(MESSAGES_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
