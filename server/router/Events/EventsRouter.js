import express from "express";
import { PrismaClient } from "@prisma/client";
import { authCheckMiddleware } from "../middleware/middleWareRouter.js";
import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,'./uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});


const uploadFiles = multer({ storage: storage });
const router = express.Router();
const prisma = new PrismaClient();

router.get("/get", async (req,res)=>{
  try{
    const {search = '', current_page = 1, items_per_page = 10} = req.query;
    const {year, country} = req.body;
    const skip = (current_page - 1) * items_per_page
    const events = await prisma.event.findMany({
      where: {
        title: {
          contains: search,
          mode: 'insensitive',
        },
        category: {
          not: "closen",
        },
        ...(year && {
          startDate: {
            gte: new Date(`${year}-01-01T00:00:00.000Z`),
            lt: new Date(`${Number(year) + 1}-01-01T00:00:00.000Z`),
          },
        }),
        ...(country && {
          contry: {
            contains: country,
            mode: "insensitive",
          },
        }),
      },
      skip: skip,
      take: Number(items_per_page),
    });
    const total = await prisma.event.count({
      where: {
        title: {
          contains: search,
          mode: 'insensitive',
        },
        category: {
          not: "closen",
        },
        ...(year && {
          startDate: {
            gte: new Date(`${year}-01-01T00:00:00.000Z`),
            lt: new Date(`${Number(year) + 1}-01-01T00:00:00.000Z`),
          },
        }),
        ...(country && {
          contry: {
            contains: country,
            mode: "insensitive",
          },
        }),
      },
    });
    res.json({
      events,
      total,
      current_page: Number(current_page),
      total_pages: Math.ceil(total / Number(items_per_page)),
    });
  }catch{
    res.status(500).json({ error: "Internal Server Error" });
  }
})
router.get("/get/closen", async (req,res)=>{
  try{
    const {search = '', current_page = 1, items_per_page = 10} = req.query;
    const skip = (current_page - 1) * items_per_page
    const events = await prisma.event.findMany({
      where: {
        title: {
          contains: search,
          mode: 'insensitive',
        },
        category:{
          contains: 'closen',
          mode: 'insensitive',
        }
      },
      skip: skip,
      take: Number(items_per_page),
    });
    const total = await prisma.event.count({
      where: {
        title: {
          contains: search,
          mode: 'insensitive',
        },
      },
    });

    res.json({
      events,
      total,
      current_page: Number(current_page),
      total_pages: Math.ceil(total / Number(items_per_page)),
    });
  }catch{
    res.status(500).json({ error: "Internal Server Error" });
  }

})
router.get("/full/:eventId",authCheckMiddleware,async(req, res)=>{
  const {eventId} = req.params;
  const userId = req.user.id;
  try{
    const user = await prisma.user.findUnique({where:{id:Number(userId)}});
    if(user){
      const event = await prisma.event.findUnique({where:{id:Number(eventId)},include:{team:true}});
      const teamCount = await prisma.team.count({where:{eventId:Number(eventId)}});
      const teams = await prisma.team.findMany({where:{eventId:Number(eventId)},include:{races:true,players:true}});
      const playersCount = teams.reduce((total, team) => total + team.players.length, 0);
      const racesCount = teams.reduce((total, team) => total + team.races.length, 0);
      res.status(200).json({
        teamCount,
        playersCount,
        racesCount,
        event});
    }else{
      res.status(403).json({ error: "Forbidden: User does not have admin rights!" });
    }
  }catch(error){
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
})
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
