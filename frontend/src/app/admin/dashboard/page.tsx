"use client";

import { useState, useEffect, useCallback, ReactNode, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRightFromBracket,
  FaDiagramProject,
  FaCode,
  FaEnvelope,
  FaPlus,
  FaPenToSquare,
  FaTrash,
  FaCheck,
  FaXmark,
  FaStar,
} from "react-icons/fa6";
import PhoenixLogo from "@/components/PhoenixLogo";
import { api, Project, Language, ContactMessage } from "@/lib/api";
import { getToken, removeToken } from "@/lib/auth";

type Tab = "projects" | "languages" | "messages";

export default function DashboardPage() {
  const router = useRouter();
  const [token, setTokenState] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = getToken();
    if (!t) {
      router.push("/admin");
      return;
    }
    setTokenState(t);
    setAuthChecked(true);
  }, [router]);

  const loadData = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [p, l, m] = await Promise.all([
        api.getProjects(),
        api.getLanguages(),
        api.getMessages(token),
      ]);
      setProjects(p);
      setLanguages(l);
      setMessages(m);
    } catch {
      removeToken();
      router.push("/admin");
    } finally {
      setLoading(false);
    }
  }, [token, router]);

  useEffect(() => {
    if (authChecked) loadData();
  }, [authChecked, loadData]);

  const handleLogout = () => {
    removeToken();
    router.push("/admin");
  };

  if (!authChecked) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-8 h-8 border-2 border-phoenix-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: ReactNode; count: number }[] = [
    { id: "projects", label: "Projecten", icon: <FaDiagramProject />, count: projects.length },
    { id: "languages", label: "Talen & Skills", icon: <FaCode />, count: languages.length },
    { id: "messages", label: "Berichten", icon: <FaEnvelope />, count: messages.filter((m) => !m.read).length },
  ];

  return (
    <div className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4"
        >
          <div className="flex items-center gap-3">
            <PhoenixLogo size={40} />
            <div>
              <h1 className="text-2xl font-bold text-gradient-phoenix">Dashboard</h1>
              <p className="text-xs text-ash-400">Beheer je portfolio</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all text-sm font-medium"
          >
            <FaRightFromBracket /> Uitloggen
          </button>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-phoenix-gradient text-white shadow-lg"
                  : "glass text-ash-300 hover:text-white"
              }`}
            >
              {tab.icon}
              {tab.label}
              {tab.count > 0 && (
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeTab === tab.id ? "bg-white/20" : "bg-phoenix-500/20 text-phoenix-400"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-phoenix-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <>
                {activeTab === "projects" && (
                  <ProjectsManager projects={projects} token={token!} onChange={loadData} />
                )}
                {activeTab === "languages" && (
                  <LanguagesManager languages={languages} token={token!} onChange={loadData} />
                )}
                {activeTab === "messages" && (
                  <MessagesManager messages={messages} token={token!} onChange={loadData} />
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ProjectsManager({
  projects,
  token,
  onChange,
}: {
  projects: Project[];
  token: string;
  onChange: () => void;
}) {
  const [editing, setEditing] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleDelete = async (id: number) => {
    if (!confirm("Weet je zeker dat je dit project wilt verwijderen?")) return;
    await api.deleteProject(id, token);
    onChange();
  };

  const emptyProject: Partial<Project> = {
    title: "",
    description: "",
    technologies: [],
    imageUrl: null,
    liveUrl: null,
    githubUrl: null,
    featured: false,
    order: 0,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Projecten beheren</h2>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-phoenix-gradient text-white text-sm font-medium hover:scale-105 transition-transform"
        >
          <FaPlus /> Nieuw project
        </button>
      </div>

      {showForm && (
        <ProjectForm
          project={editing || (emptyProject as Project)}
          token={token}
          isEdit={!!editing}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSave={onChange}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="glass rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {project.featured && <FaStar className="text-phoenix-400 text-sm" />}
                <h3 className="font-bold text-white">{project.title}</h3>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditing(project);
                    setShowForm(true);
                  }}
                  className="text-ash-400 hover:text-phoenix-400 transition-colors"
                >
                  <FaPenToSquare />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="text-ash-400 hover:text-red-400 transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <p className="text-sm text-ash-400 line-clamp-2 mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-ash-400 border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectForm({
  project,
  token,
  isEdit,
  onClose,
  onSave,
}: {
  project: Partial<Project>;
  token: string;
  isEdit: boolean;
  onClose: () => void;
  onSave: () => void;
}) {
  const [form, setForm] = useState({
    title: project.title || "",
    description: project.description || "",
    technologies: (project.technologies || []).join(", "),
    liveUrl: project.liveUrl || "",
    githubUrl: project.githubUrl || "",
    featured: project.featured || false,
    order: project.order || 0,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const data = {
      title: form.title,
      description: form.description,
      technologies: form.technologies.split(",").map((t) => t.trim()).filter(Boolean),
      liveUrl: form.liveUrl || null,
      githubUrl: form.githubUrl || null,
      featured: form.featured,
      order: form.order,
    };

    try {
      if (isEdit && project.id) {
        await api.updateProject(project.id, data, token);
      } else {
        await api.createProject(data, token);
      }
      onSave();
      onClose();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Opslaan mislukt");
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      onSubmit={handleSubmit}
      className="glass rounded-2xl p-6 mb-6 space-y-4 overflow-hidden"
    >
      <h3 className="text-lg font-bold text-white mb-4">
        {isEdit ? "Project bewerken" : "Nieuw project"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          placeholder="Titel"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="px-4 py-2.5 rounded-xl bg-ash-950/50 border border-white/10 text-white text-sm focus:border-phoenix-500/50 focus:outline-none"
        />
        <input
          placeholder="Volgorde (nummer)"
          type="number"
          value={form.order}
          onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
          className="px-4 py-2.5 rounded-xl bg-ash-950/50 border border-white/10 text-white text-sm focus:border-phoenix-500/50 focus:outline-none"
        />
      </div>

      <textarea
        placeholder="Beschrijving"
        required
        rows={3}
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full px-4 py-2.5 rounded-xl bg-ash-950/50 border border-white/10 text-white text-sm focus:border-phoenix-500/50 focus:outline-none resize-none"
      />

      <input
        placeholder="Technologieen (komma gescheiden: React, Node.js, ...)"
        required
        value={form.technologies}
        onChange={(e) => setForm({ ...form, technologies: e.target.value })}
        className="w-full px-4 py-2.5 rounded-xl bg-ash-950/50 border border-white/10 text-white text-sm focus:border-phoenix-500/50 focus:outline-none"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          placeholder="Live URL (optioneel)"
          value={form.liveUrl}
          onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
          className="px-4 py-2.5 rounded-xl bg-ash-950/50 border border-white/10 text-white text-sm focus:border-phoenix-500/50 focus:outline-none"
        />
        <input
          placeholder="GitHub URL (optioneel)"
          value={form.githubUrl}
          onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
          className="px-4 py-2.5 rounded-xl bg-ash-950/50 border border-white/10 text-white text-sm focus:border-phoenix-500/50 focus:outline-none"
        />
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          className="w-4 h-4 accent-phoenix-500"
        />
        <span className="text-sm text-ash-300">Uitgelicht project</span>
      </label>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-phoenix-gradient text-white text-sm font-medium disabled:opacity-50"
        >
          {saving ? "Opslaan..." : "Opslaan"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2.5 rounded-xl glass text-ash-300 text-sm font-medium hover:text-white"
        >
          Annuleren
        </button>
      </div>
    </motion.form>
  );
}

function LanguagesManager({
  languages,
  token,
  onChange,
}: {
  languages: Language[];
  token: string;
  onChange: () => void;
}) {
  const [editing, setEditing] = useState<Language | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleDelete = async (id: number) => {
    if (!confirm("Weet je zeker dat je deze skill wilt verwijderen?")) return;
    await api.deleteLanguage(id, token);
    onChange();
  };

  const emptyLang: Partial<Language> = {
    name: "",
    category: "",
    level: "Beginner",
    color: "#f97316",
    order: 0,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Talen & Skills beheren</h2>
        <button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-phoenix-gradient text-white text-sm font-medium hover:scale-105 transition-transform"
        >
          <FaPlus /> Nieuwe skill
        </button>
      </div>

      {showForm && (
        <LanguageForm
          language={editing || (emptyLang as Language)}
          token={token}
          isEdit={!!editing}
          onClose={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSave={onChange}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {languages.map((lang) => (
          <div key={lang.id} className="glass rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: lang.color || "#f97316" }}
              />
              <div>
                <p className="text-sm font-semibold text-white">{lang.name}</p>
                <p className="text-xs text-ash-400">
                  {lang.category} &middot; {lang.level}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditing(lang);
                  setShowForm(true);
                }}
                className="text-ash-400 hover:text-phoenix-400 transition-colors text-sm"
              >
                <FaPenToSquare />
              </button>
              <button
                onClick={() => handleDelete(lang.id)}
                className="text-ash-400 hover:text-red-400 transition-colors text-sm"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LanguageForm({
  language,
  token,
  isEdit,
  onClose,
  onSave,
}: {
  language: Partial<Language>;
  token: string;
  isEdit: boolean;
  onClose: () => void;
  onSave: () => void;
}) {
  const [form, setForm] = useState({
    name: language.name || "",
    category: language.category || "",
    level: language.level || "Beginner",
    color: language.color || "#f97316",
    order: language.order || 0,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEdit && language.id) {
        await api.updateLanguage(language.id, form, token);
      } else {
        await api.createLanguage(form, token);
      }
      onSave();
      onClose();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Opslaan mislukt");
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      onSubmit={handleSubmit}
      className="glass rounded-2xl p-6 mb-6 space-y-4 overflow-hidden"
    >
      <h3 className="text-lg font-bold text-white mb-4">
        {isEdit ? "Skill bewerken" : "Nieuwe skill"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          placeholder="Naam (bijv. React)"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="px-4 py-2.5 rounded-xl bg-ash-950/50 border border-white/10 text-white text-sm focus:border-phoenix-500/50 focus:outline-none"
        />
        <input
          placeholder="Categorie (bijv. Frontend)"
          required
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="px-4 py-2.5 rounded-xl bg-ash-950/50 border border-white/10 text-white text-sm focus:border-phoenix-500/50 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          value={form.level}
          onChange={(e) => setForm({ ...form, level: e.target.value })}
          className="px-4 py-2.5 rounded-xl bg-ash-950/50 border border-white/10 text-white text-sm focus:border-phoenix-500/50 focus:outline-none"
        >
          <option value="Beginner">Beginner</option>
          <option value="Gevorderd">Gevorderd</option>
          <option value="Geavanceerd">Geavanceerd</option>
          <option value="Expert">Expert</option>
        </select>
        <input
          type="color"
          value={form.color || "#f97316"}
          onChange={(e) => setForm({ ...form, color: e.target.value })}
          className="h-[42px] rounded-xl bg-ash-950/50 border border-white/10 cursor-pointer"
        />
        <input
          placeholder="Volgorde"
          type="number"
          value={form.order}
          onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
          className="px-4 py-2.5 rounded-xl bg-ash-950/50 border border-white/10 text-white text-sm focus:border-phoenix-500/50 focus:outline-none"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-phoenix-gradient text-white text-sm font-medium disabled:opacity-50"
        >
          {saving ? "Opslaan..." : "Opslaan"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2.5 rounded-xl glass text-ash-300 text-sm font-medium hover:text-white"
        >
          Annuleren
        </button>
      </div>
    </motion.form>
  );
}

function MessagesManager({
  messages,
  token,
  onChange,
}: {
  messages: ContactMessage[];
  token: string;
  onChange: () => void;
}) {
  const handleMarkRead = async (id: number) => {
    await api.markMessageRead(id, token);
    onChange();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Weet je zeker dat je dit bericht wilt verwijderen?")) return;
    await api.deleteMessage(id, token);
    onChange();
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-6">Contact berichten</h2>

      {messages.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <FaEnvelope className="text-3xl text-ash-600 mx-auto mb-3" />
          <p className="text-ash-400">Nog geen berichten ontvangen.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`glass rounded-xl p-5 ${!msg.read ? "border-phoenix-500/20" : ""}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-white">{msg.name}</h3>
                    {!msg.read && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-phoenix-500/20 text-phoenix-400">
                        Nieuw
                      </span>
                    )}
                  </div>
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-sm text-phoenix-400 hover:text-phoenix-300"
                  >
                    {msg.email}
                  </a>
                </div>
                <span className="text-xs text-ash-500">
                  {new Date(msg.createdAt).toLocaleDateString("nl-NL", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <p className="text-sm text-ash-300 leading-relaxed mb-4">{msg.message}</p>

              <div className="flex gap-2">
                {!msg.read && (
                  <button
                    onClick={() => handleMarkRead(msg.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-ash-300 hover:text-green-400 text-xs font-medium transition-colors"
                  >
                    <FaCheck /> Markeren als gelezen
                  </button>
                )}
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass text-ash-300 hover:text-red-400 text-xs font-medium transition-colors"
                >
                  <FaXmark /> Verwijderen
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
