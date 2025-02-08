import express from "express";
import { PrismaClient, Prisma } from "@prisma/client";
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




router.post('/post', authCheckMiddleware,async(req, res)=>{
  const {name, club, country, city, coathName, gender, sname,players, eventId} = req.body;
  const userId = req.user.id;
  try{
    const user = await prisma.user.findUnique({where: {id: Number(userId)}});
    if(user && user.permissions === 2){
      const newRecord = await prisma.team.create({data:{
          name,
          club,
          country,
          city,
          coathName,
          gender,
          sname,
          players:{ connect: players.map(id => ({ id })) },
          eventId:Number(eventId)
        }})
      res.status(200).json(newRecord)
    }else{
      res.status(403).json({ error: "Forbidden: User does not have admin rights!" });
    }

  }catch(error){
    res.status(500).json({
      error: error.message || "Unknown error",
      details: JSON.stringify(error, null, 2),
    });
  }
})


router.patch("/:teamId", authCheckMiddleware, async(req, res)=>{
  const {name, club, country, city, coathName, gender, sname,players, eventId} = req.body;
  const userId = req.user.id;
  const {teamId} = req.params;
  try{
    const user = await prisma.user.findUnique({where:{id:Number(userId)}});
    if(user && user.permissions === 2){
      const changeTeam = await prisma.team.update({where:{id:Number(teamId)}, data:{name, club, country, city, coathName, gender, sname, eventId}});
      return res.status(200).json(changeTeam)
    }else{
      res.status(403).json({ error: "Forbidden: User does not have admin rights!" });
    }
  }catch(error){
    res.status(500).json({
      error: error.message || "Unknown error",
      details: JSON.stringify(error, null, 2),
    });
  }
})




router.get("/:teamId", authCheckMiddleware, async(req, res)=>{
  const userId = req.user.id;
  const {teamId} = req.params;
  try{
    const user = await prisma.user.findUnique({where:{id:Number(userId)}});
    if(user && user.permissions === 2){
      const team = await prisma.team.findUnique({where:{id:Number(teamId)}})
      return res.status(200).json(team);
    }else{
      res.status(403).json({ error: "Forbidden: User does not have admin rights!" });
    }
  }catch(error){
    res.status(500).json({
      error: error.message || "Unknown error",
      details: JSON.stringify(error, null, 2),
    });
  }
})




router.get("/full/:teamId", async(req, res)=>{
   const {teamId} = req.params;
  try{
    const {current_page = 1, items_per_page = 4} = req.query;
    const skip = (current_page - 1) * items_per_page
      const team = await prisma.team.findUnique({where:{id:Number(teamId)}});
      const players = await prisma.player.findMany({where:{teamId:Number(teamId)}})
    const races = await prisma.races.findMany(
      {
        where:
          {
            teamId:Number(teamId)},
            skip: skip,
            take: Number(items_per_page)
          }
        );
    const racesCount = await prisma.races.count(
      {
        where:
          {
            teamId:Number(teamId)
          }
      }
    );
      res.status(200).json(
        {
          team,
          players,
          races,
          current_page: Number(current_page),
          total_pages: Math.ceil(racesCount / Number(items_per_page)),
        }
      );

  }catch(error){
    res.status(500).json({
      error: error.message || "Unknown error",
      details: JSON.stringify(error, null, 2),
    });
  }
})




router.delete("/:teamId", authCheckMiddleware, async(req, res)=>{
  const userId = req.user.id;
  const {teamId} = req.params;
  try{
    const user = await prisma.user.findUnique({where:{id:Number(userId)}});
    if(user && user.permissions === 2){
      const team = await prisma.team.delete({where:{id:Number(teamId)}})
      return res.status(200).json(team);
    }else{
      res.status(403).json({ error: "Forbidden: User does not have admin rights!" });
    }
  }catch(error){
    res.status(500).json({
      error: error.message || "Unknown error",
      details: JSON.stringify(error, null, 2),
    });
  }
})
export default router;
