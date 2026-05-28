import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import fs from "fs";

const DB_FILE = path.join(process.cwd(), "leads_db.json");

function getLeads() {
  if (!fs.existsSync(DB_FILE)) {
    return [];
  }
  const data = fs.readFileSync(DB_FILE, "utf-8");
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

function saveLead(lead: any) {
  const leads = getLeads();
  const newLead = { ...lead, id: Date.now().toString(), createdAt: new Date().toISOString() };
  leads.push(newLead);
  fs.writeFileSync(DB_FILE, JSON.stringify(leads, null, 2));
  return newLead;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/leads", (req, res) => {
    try {
      const lead = saveLead(req.body);
      res.status(201).json({ success: true, lead });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to save lead" });
    }
  });

  app.get("/api/leads", (req, res) => {
    try {
      const leads = getLeads();
      // Sort newest first
      leads.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      res.json(leads);
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch leads" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
