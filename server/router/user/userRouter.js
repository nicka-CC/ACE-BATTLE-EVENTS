import express from "express";
import {PrismaClient, Prisma} from "@prisma/client";
import {authCheckMiddleware} from "../middleware/middleWareRouter.js";
import multer from "multer";
import path from "path";
import * as stream from "node:stream";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});


const uploadFiles = multer({storage: storage});
const router = express.Router();
const prisma = new PrismaClient();

router.get("/info", authCheckMiddleware, async(req, res)=>{
  const userId = req.user.id;
  try{
    const user = await prisma.user.findUnique({where:{id:Number(userId)},include:{registration:true, transaction:true,team:true}});
    if(user){
      res.status(200).json(user)
    }else{
      res.status(403).json({error: "Forbidden: User does not have admin rights!"});
    }
  }catch(error){
    res.status(500).json({
      error: error.message || "Unknown error",
      details: JSON.stringify(error, null, 2),
    });
  }
})
export default router;
