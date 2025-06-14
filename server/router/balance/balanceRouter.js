import express from "express";
import prisma from "../../prisma/client.js";
import { authCheckMiddleware } from "../middleware/middleWareRouter.js";
import nodemailer from "nodemailer";

const router = express.Router();

function checkLona(numberCard) {
  let sum = 0;
  const numDigits = numberCard.length;
  const parity = numDigits % 2;

  for (let i = 0; i < numDigits; i++) {
    let digit = parseInt(numberCard.charAt(i), 10);
    if (i % 2 === parity) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
}


router.post("/add", authCheckMiddleware, async (req, res) => {
  const { count, numberCard, cvv, dateCard} = req.body;
  const userId = req.user.id;

  try {

    if (!count || !numberCard || !cvv || !dateCard) {
      return res.status(400).json({ error: "Please input all items!" });
    }


    if (!checkLona(numberCard)) {
      return res.status(400).json({ error: "Invalid card number!" });
    }


    const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
    if (!user) {
      return res.status(403).json({ error: "Forbidden: User does not have admin rights!" });
    }

    const newTransaction = await prisma.transaction.create({
      data: {
        type: 0,
        date: new Date(),
        amount: count,
        reciept: `replenishment ${cvv}`,
        userId: Number(user.id),
      },
    });

    return res.status(200).json(newTransaction);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: error.message || "Unknown error",
      details: JSON.stringify(error, null, 2),
    });
  }
});

router.post("/access", authCheckMiddleware, async(req, res)=>{
  const userId = req.user.id;
  try{
    const user = await prisma.user.findUnique({where:{id:Number(userId)}});
    const {cvv} = req.body;
    if(user){
      const transaction = await prisma.transaction.findFirst({
        where:{
          userId:Number(userId),
          type:0
        }
      })
      if (cvv == transaction.reciept.slice(-3)){
        const updateTransaction = await prisma.transaction.update({where:{id:transaction.id},data:{type:1}});
        const updateUser = await prisma.user.update({
          where:{
            id:Number(userId)
          },
          data:{
            balance:user.balance + transaction.amount
          }
        })
        res.status(200).json({updateUser,updateTransaction});
      }else{
        return res.status(400).json({ error: "False code accept!" });
      }
    }else{
      return res.status(403).json({ error: "Forbidden: User does not have admin rights!" });
    }
  }catch(error){
    console.error("Error:", error);
    return res.status(500).json({
      error: error.message || "Unknown error",
      details: JSON.stringify(error, null, 2),
    });
  }
})
export default router;