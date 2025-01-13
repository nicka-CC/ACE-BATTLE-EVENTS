import express from "express";
import { PrismaClient } from "@prisma/client";
import { authCheckMiddleware } from "../middleware/middleWareRouter.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Получаем путь к текущему файлу
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "/../../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});


const uploadFiles = multer({ storage: storage });
const router = express.Router();
const prisma = new PrismaClient();

router.post("/create", authCheckMiddleware, async (req, res) => {
  const { name, start_date, start_time, end_date, discipline, category, contry, city, street, postal_code } = req.body;
  const userId = req.user.id;
  try {
    const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
    if (user && user.permissions === 2) {
      const newRecord = await prisma.event.create({
        data: {
          title: name,
          startDate: new Date(start_date),
          startTime: new Date(start_time),
          endDate: new Date(end_date),
          discipline,
          category,
          contry,
          city,
          street,
          postalCode: postal_code
        }
      });
      res.status(200).json(newRecord);
    } else {
      res.status(403).json({ error: "Forbidden: User does not have admin rights!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/price/:eventId", authCheckMiddleware, async (req, res) => {
  const { place, amount } = req.body;
  const userId = req.user.id;
  const { eventId } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
    if (user && user.permissions === 2) {
      if (eventId) {
        const newRecord = await prisma.prices.create({
          data: { place, Amount: amount, eventId: Number(eventId) }
        });
        res.status(200).json(newRecord);
      } else {
        res.status(400).json({ error: "Please write id event!" });
      }
    } else {
      res.status(403).json({ error: "Forbidden: User does not have admin rights!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/picture/:eventId", authCheckMiddleware, uploadFiles.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded!" });
  }

  const userId = req.user.id;
  const { eventId } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
    if (user && user.permissions === 2) {
      if (eventId) {
        const newPhotos = await prisma.image.create({
          data: {
            image: req.file.filename || "",
            eventId: Number(eventId)
          }
        });

        return res.status(200).json({
          newImage: {
            image: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
            id: newPhotos.id,
            eventId: newPhotos.eventId
          }
        });
      } else {
        return res.status(400).json({ error: "Please provide event ID!" });
      }
    } else {
      return res.status(403).json({ error: "Forbidden: User does not have admin rights!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
