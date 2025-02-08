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


router.post('/post', authCheckMiddleware, async (req, res) => {
  const {name, club, country, city, coathName, gender, sname, players, eventId} = req.body;
  const userId = req.user.id;
  try {
    const user = await prisma.user.findUnique({where: {id: Number(userId)}});
    if (user && user.permissions === 2) {
      const newRecord = await prisma.team.create({
        data: {
          name,
          club,
          country,
          city,
          coathName,
          gender,
          sname,
          players: {connect: players.map(id => ({id}))},
          eventId: Number(eventId)
        }
      })
      res.status(200).json(newRecord)
    } else {
      res.status(403).json({error: "Forbidden: User does not have admin rights!"});
    }

  } catch (error) {
    res.status(500).json({
      error: error.message || "Unknown error",
      details: JSON.stringify(error, null, 2),
    });
  }
})


router.patch("/:teamId", authCheckMiddleware, async (req, res) => {
  const {name, club, country, city, coathName, gender, sname, players, eventId} = req.body;
  const userId = req.user.id;
  const {teamId} = req.params;
  try {
    const user = await prisma.user.findUnique({where: {id: Number(userId)}});
    if (user && user.permissions === 2) {
      const changeTeam = await prisma.team.update({
        where: {id: Number(teamId)},
        data: {name, club, country, city, coathName, gender, sname, eventId}
      });
      return res.status(200).json(changeTeam)
    } else {
      res.status(403).json({error: "Forbidden: User does not have admin rights!"});
    }
  } catch (error) {
    res.status(500).json({
      error: error.message || "Unknown error",
      details: JSON.stringify(error, null, 2),
    });
  }
})


router.get("/:teamId", authCheckMiddleware, async (req, res) => {
  const userId = req.user.id;
  const {teamId} = req.params;
  try {
    const user = await prisma.user.findUnique({where: {id: Number(userId)}});
    if (user && user.permissions === 2) {
      const team = await prisma.team.findUnique({where: {id: Number(teamId)}})
      return res.status(200).json(team);
    } else {
      res.status(403).json({error: "Forbidden: User does not have admin rights!"});
    }
  } catch (error) {
    res.status(500).json({
      error: error.message || "Unknown error",
      details: JSON.stringify(error, null, 2),
    });
  }
})


router.get("/full/:teamId", async (req, res) => {
  const {teamId} = req.params;
  try {
    const {current_page = 1, items_per_page = 4} = req.query;
    const skip = (current_page - 1) * items_per_page
    const team = await prisma.team.findUnique({where: {id: Number(teamId)}});
    const players = await prisma.player.findMany({where: {teamId: Number(teamId)}})
    const races = await prisma.races.findMany(
      {
        where:
          {
            teamId: Number(teamId)
          },
        skip: skip,
        take: Number(items_per_page)
      }
    );
    const racesCount = await prisma.races.count(
      {
        where:
          {
            teamId: Number(teamId)
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

  } catch (error) {
    res.status(500).json({
      error: error.message || "Unknown error",
      details: JSON.stringify(error, null, 2),
    });
  }
})


router.delete("/:teamId", authCheckMiddleware, async (req, res) => {
  const userId = req.user.id;
  const {teamId} = req.params;
  try {
    const user = await prisma.user.findUnique({where: {id: Number(userId)}});
    if (user && user.permissions === 2) {
      const team = await prisma.team.delete({where: {id: Number(teamId)}})
      return res.status(200).json(team);
    } else {
      res.status(403).json({error: "Forbidden: User does not have admin rights!"});
    }
  } catch (error) {
    res.status(500).json({
      error: error.message || "Unknown error",
      details: JSON.stringify(error, null, 2),
    });
  }
})


//register user
router.post("/user", authCheckMiddleware, async (req, res) => {
  const {name, club, country, city, coathName, gender, sname, players, eventId, playerCount} = req.body;
  const userId = req.user.id;
  try {
    const user = await prisma.user.findUnique({where: {id: Number(userId)}});
    if (user) {

      const newTransaction = await prisma.transaction.create({
        data: {
          type: 0,
          date: new Date(),
          amount: 50 * playerCount,
          reciept: 'team',
          userId: Number(userId)
        }
      });
      const newTeam = await prisma.team.create({
        data: {
          name, club, country, city, coathName, gender, sname, transactionId: Number(newTransaction.id)
        }
      });
      const updateEvent = await prisma.event.update({where:{id:Number(eventId)},data:{transactionId:Number(newTransaction.id)}})
      res.status(200).json({newTransaction, newTeam});
    } else {
      res.status(403).json({error: "Forbidden: User does not have admin rights!"});
    }
  } catch (error) {
    res.status(500).json({
      error: error.message || "Unknown error",
      details: JSON.stringify(error, null, 2),
    });
  }
})
router.get("/checkout/get",authCheckMiddleware, async(req, res)=>{
  const userId = req.user.id;
  try{
    const user = await prisma.user.findUnique({where:{id:Number(userId)}});
    if(user){
      const getTransaction = await prisma.transaction.findMany({where:{userId:Number(userId),type:0},include: {
          teams: true,  event:true,
        },});
      const title = getTransaction[0]?.event[0]?.title;
      const date = getTransaction[0]?.event[0]?.startDate;
      const city = getTransaction[0]?.event[0]?.city;
      const country = getTransaction[0]?.event[0]?.country;
      const category = getTransaction[0]?.event[0]?.category;
      const teamName = getTransaction[0]?.teams[0]?.name;
      const amount = getTransaction[0]?.amount;
      const balance = user.balance;
      const finallyCheck = balance - amount;
      if(finallyCheck >= 0){
        res.status(200).json({
          title,
          date,
          city,
          country,
          category,
          teamName,
          amount,
          balance,
          finallyCheck
        });
      }else{
        return res.status(400).json({
          error: "Insufficient funds",
          message: `Your current balance is ${balance}, but the required amount is ${amount}.`,
        });
      }
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
router.patch("/checkout/change", authCheckMiddleware, async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
    if (user) {
      // Найдем транзакцию с типом 0
      const transaction = await prisma.transaction.findFirst({
        where: {
          userId: Number(userId),
          type: 0,
        },
        include: { teams: true,event:true },
      });

      // Проверяем наличие транзакции и команд
      if (transaction && transaction.event) {
        const eventId = transaction.event[0].id; // Получаем eventId из первой команды

        // Обновляем транзакцию
        const updatedTransaction = await prisma.transaction.update({
          where: {
            id: transaction.id, // Идентификатор транзакции
          },
          data: {
            type: 1, // Обновляем тип на 1
          },
        });

        // Обновляем eventId в первой команде
        await prisma.team.update({
          where: {
            id: transaction.teams[0].id, // id команды
          },
          data: {
            eventId: eventId, // Устанавливаем eventId для команды
          },
        });

        res.status(200).json(updatedTransaction);
      } else {
        res.status(404).json({ error: "No teams found for the transaction" });
      }
    } else {
      res.status(403).json({ error: "Forbidden: User does not have admin rights!" });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message || "Unknown error",
      details: JSON.stringify(error, null, 2),
    });
  }
});

export default router;
