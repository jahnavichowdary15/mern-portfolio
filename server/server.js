import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

const app = express();
const PORT = Number(process.env.PORT || 5000);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filesDir = path.join(__dirname, "files");

app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  methods: ["GET", "POST"],
}));
app.use(express.json({ limit: "20kb" }));

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many messages from this connection. Please try again later." },
});

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
  message: { type: String, required: true, trim: true, minlength: 10, maxlength: 5000 },
  createdAt: { type: Date, default: Date.now },
}, { versionKey: false });

const ContactMessage = mongoose.model("ContactMessage", contactSchema);

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "not connected",
  });
});

app.get("/api/cv/pdf", (req, res) => sendCv(req, res, "resume.pdf", "application/pdf"));
app.get("/api/cv/docx", (req, res) => sendCv(req, res, "resume.docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"));

function sendCv(_req, res, filename, contentType) {
  const fullPath = path.join(filesDir, filename);
  if (!fs.existsSync(fullPath)) {
    return res.status(404).json({
      message: `CV file not found. Please add ${filename} to the server/files folder.`,
    });
  }
  res.setHeader("Content-Type", contentType);
  return res.download(fullPath, filename);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

app.post("/api/contact", contactLimiter, async (req, res) => {
  try {
    const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
    const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const message = typeof req.body.message === "string" ? req.body.message.trim() : "";

    if (name.length < 2 || name.length > 100) {
      return res.status(400).json({ message: "Please enter a name between 2 and 100 characters." });
    }
    if (!isValidEmail(email) || email.length > 254) {
      return res.status(400).json({ message: "Please enter a valid email address." });
    }
    if (message.length < 10 || message.length > 5000) {
      return res.status(400).json({ message: "Your message must be between 10 and 5000 characters." });
    }
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: "The database is not connected. Please try again later." });
    }

    const savedMessage = await ContactMessage.create({ name, email, message });

    // Optional email notification; the database save succeeds even if SMTP is not configured.
    const smtpConfigured = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;
    if (smtpConfigured) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: String(process.env.SMTP_SECURE).toLowerCase() === "true",
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        });
        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: process.env.CONTACT_RECEIVER || "jahnavichowdary180@gmail.com",
          replyTo: email,
          subject: `Portfolio contact from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });
      } catch (mailError) {
        // Do not discard a saved contact message if notification email fails.
        console.error("Email notification failed:", mailError.message);
      }
    }

    return res.status(201).json({ message: "Message received.", id: savedMessage._id });
  } catch (error) {
    console.error("Contact API error:", error.message);
    return res.status(500).json({ message: "Something went wrong while saving your message." });
  }
});

app.use((error, _req, res, _next) => {
  console.error("Unhandled server error:", error.message);
  res.status(500).json({ message: "Unexpected server error." });
});

async function start() {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is missing. Copy .env.example to .env and configure it.");
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB.");
    app.listen(PORT, () => {
      console.log(`Portfolio API running at http://localhost:${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error("Could not connect to MongoDB:", error.message);
    process.exit(1);
  }
}

start();
