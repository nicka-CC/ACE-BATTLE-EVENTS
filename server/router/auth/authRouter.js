import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../prisma/client.js';
import dotenv from 'dotenv';

const router = express.Router();

router.post("/reg", async (req, res)=> {
  const {name, password, city,club, country, email, surname} = req.body;
  try{
    let ReadyCreatedUser = await prisma.user.findUnique({where: {email}});
    if(ReadyCreatedUser){
      return res.status(409).json({message:"User already exists"});
    }
    let hashed_password = await bcrypt.hash(password, 13);
    let user = await prisma.user.create({data:{name:name, password: hashed_password, city:city,club:club, country:country, email:email, surname:surname,
        permissions: 0, // Установка дефолтных значений
        balance: 0,     // Установка дефолтных значений
      }})
    res.json({result:user})
  }catch(error){
    res.status(500).json({result:undefined, errMsg: error})
  }finally{
    prisma.$disconnect();
  }
})

router.post("/login", async(req, res)=> {
  const {email, password} = req.body;
  try{
    let candidate = await prisma.user.findUnique({
      where:{email}
    })
    if (!candidate) {
      return res.status(200).json({ok: false, message: "Invalid credentials"});
    }

    const compare_pwd = await bcrypt.compare(password, candidate.password);

    if (!compare_pwd) {
      return res.status(200).json({ok: false, message: "Invalid credentials"});
    }
    const user = {id:candidate.id, name:candidate.name, balance:candidate.balance, city:candidate.city, club:candidate.club, country:candidate.country, email:candidate.email, image:candidate.imail, permissions:candidate.permissions, surname: candidate.surname};
    const token = jwt.sign(user, "ACE-BATTLE-EVENTS-NICKA-CC",{expiresIn: "12h"})
    return res.json({user, token});
  }catch(error){
    return res.status(500).json({errMsg:error.message});
  }finally{
    prisma.$disconnect()
  }
})
export default router;