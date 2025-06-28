import express from "express";
import { PrismaClient, Prisma } from "@prisma/client";

import multer from "multer";
import path from "path";
import {authCheckMiddleware} from "../../middleware/middleWareRouter.js";
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

router.post("/:teamId/player", uploadFiles.single("image"), authCheckMiddleware, async(req, res)=>{
  const userId = req.user.id;
  const {teamId} = req.params;

  try{
    const jsonData = JSON.parse(req.body.json);
    const { firstName, surName, gender, dateBirth } = jsonData;
    const user = await prisma.user.findUnique({where:{id:Number(userId)}});
    if(user && user.permissions === 2){
      const newRecord = await prisma.player.create({data: {firstName, surName, gender, dateBirth, teamId:Number(teamId)}})
      if(newRecord){
        const addImage = await prisma.image.create({data:{
          image: req.file.filename || "",
          playerId: Number(newRecord.id)}});
        res.status(200).json({
          player: newRecord,
          image: {
            image: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
            id: addImage.id,
            playerId: addImage.playerId
          }
        })
      }else{
        return res.status(400).json({ error: "Please provide player ID!" });
      }
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
router.delete("/:teamId/player/:playerId", authCheckMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { teamId, playerId } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { id: Number(userId) } });

    if (user && user.permissions === 2) {
      const existingPlayer = await prisma.player.findUnique({
        where: { id: Number(playerId) },
        include: { image: true }
      });

      if (!existingPlayer || existingPlayer.teamId !== Number(teamId)) {
        return res.status(404).json({ error: "Player not found in this team" });
      }


      if (existingPlayer.image.length > 0) {
        await prisma.image.deleteMany({
          where: { playerId: Number(playerId) }
        });
      }


      const deletePlayer = await prisma.player.delete({
        where: { id: Number(playerId) }
      });

      res.status(200).json({ message: "Player deleted successfully", deletePlayer });
    } else {
      res.status(403).json({ error: "Forbidden: User does not have admin rights!" });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message || "Unknown error",
      details: JSON.stringify(error, null, 2)
    });
  }
});
router.patch("/:teamId/player/:playerId", uploadFiles.single("image"), authCheckMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { teamId, playerId } = req.params;

  try {
    const jsonData = req.body.json ? JSON.parse(req.body.json) : {};
    const { firstName, surName, gender, dateBirth } = jsonData;

    const user = await prisma.user.findUnique({ where: { id: Number(userId) } });

    if (user && user.permissions === 2) {
      const existingPlayer = await prisma.player.findUnique({
        where: { id: Number(playerId) },
        include: { image: true }
      });

      if (!existingPlayer || existingPlayer.teamId !== Number(teamId)) {
        return res.status(404).json({ error: "Player not found in this team" });
      }

      // Обновляем игрока
      const updatedPlayer = await prisma.player.update({
        where: { id: Number(playerId) },
        data: { firstName, surName, gender, dateBirth }
      });

      let imageData = null;
      if (req.file) {
        // Если у игрока уже есть изображение, обновляем его, иначе создаем новое
        if (existingPlayer.image.length > 0) {
          await prisma.image.updateMany({
            where: { playerId: Number(playerId) },
            data: { image: req.file.filename }
          });

          imageData = {
            image: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`,
            id: existingPlayer.image[0].id,
            playerId: Number(playerId)
          };
        } else {
          const newImage = await prisma.image.create({
            data: {
              image: req.file.filename,
              playerId: Number(playerId)
            }
          });

          imageData = {
            image: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`,
            id: newImage.id,
            playerId: newImage.playerId
          };
        }
      }

      res.status(200).json({
        player: updatedPlayer,
        image: imageData
      });
    } else {
      res.status(403).json({ error: "Forbidden: User does not have admin rights!" });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message || "Unknown error",
      details: JSON.stringify(error, null, 2)
    });
  }
});
router.get("/:teamId/players/:playerId", authCheckMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { teamId, playerId } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { id: Number(userId) } });

    if (user && user.permissions === 2) {
      const player = await prisma.player.findUnique({
        where: { id: Number(playerId) },
        include: { image: true }
      });


      if (!player || player.teamId !== Number(teamId)) {
        return res.status(404).json({ error: "Player not found in this team" });
      }

      const playerWithImages = {
        ...player,
        image: player.image.length > 0
          ? player.image.map(img => ({
            ...img,
            image: `${req.protocol}://${req.get('host')}/uploads/${img.image}`
          }))
          : []
      };

      res.status(200).json(playerWithImages);
    } else {
      res.status(403).json({ error: "Forbidden: User does not have permissions!" });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message || "Unknown error",
      details: JSON.stringify(error, null, 2),
    });
  }
});
router.get("/players/:teamId", authCheckMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { teamId } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { id: Number(userId) } });

    if (user && user.permissions === 2) {
      const players = await prisma.player.findMany({
        where: { teamId: Number(teamId) },
        include: { image: true }
      });

      const playersWithImages = players.map(player => ({
        ...player,
        image: player.image.length > 0
          ? player.image.map(img => ({
            ...img,
            image: `${req.protocol}://${req.get('host')}/uploads/${img.image}`
          }))
          : []
      }));

      res.status(200).json(playersWithImages);
    } else {
      res.status(403).json({ error: "Forbidden: User does not have permissions!" });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message || "Unknown error",
      details: JSON.stringify(error, null, 2),
    });
  }
});

router.post("/player/:teamId/races", authCheckMiddleware, async(req, res)=>{
  const userId = req.user.id;
  const {teamId} = req.params;
  const {Date, location, result, place, Race} = req.body;
  try{
    const user = await prisma.user.findUnique({where:{id:Number(userId)}});
    if (user && user.permissions === 2){
      const newRecord = await prisma.races.create({data:{Date, location, result, place, Race, teamId:Number(teamId)}});
      res.status(200).json(newRecord);
    }else{
      res.status(403).json({ error: "Forbidden: User does not have permissions!" });
    }

  }catch(error){
    res.status(500).json({
      error: error.message || "Unknown error",
      details: JSON.stringify(error, null, 2),
    });
  }
})
router.patch("/player/:teamId/race/:raceId", authCheckMiddleware, async(req, res)=>{
  const userId = req.user.id;
  const {raceId} = req.params;
  const {Date, location, result, place, Race} = req.body;
  try{
    const user = await prisma.user.findUnique({where:{id:Number(userId)}});
    if(user && user.permissions === 2){
      const updateRecord = await prisma.races.update({where:{id:Number(raceId)},
      data:{Date, location, result, place, Race}});
      res.status(200).json(updateRecord);
    }else{
      res.status(403).json({ error: "Forbidden: User does not have permissions!" });
    }
  }catch(error){
    res.status(500).json({
      error: error.message || "Unknown error",
      details: JSON.stringify(error, null, 2),
    });
  }
})
router.delete("/player/:teamId/races/:raceId", authCheckMiddleware, async(req, res)=>{
  const userId = req.user.id;
  const {teamId, raceId} = req.params;
  try{
    const user = await prisma.user.findUnique({where:{id:Number(userId)}});
    if(user && user.permissions === 2){
      const deleteRecord = await prisma.races.delete({where:{id:Number(raceId)}});
      res.status(200).json(deleteRecord);
    } else{
      res.status(403).json({ error: "Forbidden: User does not have permissions!" });
    }
  }catch(error){
    res.status(500).json({
      error: error.message || "Unknown error",
      details: JSON.stringify(error, null, 2),
    });
  }
})
router.get("/player/:teamId/races", authCheckMiddleware, async(req, res)=>{
  const userId = req.user.id;
  const {teamId} = req.params;
  try{
    const user = await prisma.user.findUnique({where:{id:Number(userId)}});
    if(user && user.permissions === 2){
      const record = await prisma.races.findMany({where:{teamId:Number(teamId)}});
      res.status(200).json(record);
    }else{
      res.status(403).json({ error: "Forbidden: User does not have permissions!" });
    }
  }catch(error){
    res.status(500).json({
      error: error.message || "Unknown error",
      details: JSON.stringify(error, null, 2),
    });
  }
})
export default router;
