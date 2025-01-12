import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./router/auth/authRouter.js"
dotenv.config();
const app = express();
const PORT = 5555;
app.use(cors());
app.use(express.json());
app.use("/auth", authRouter )
app.listen(PORT, ()=>{
  console.log("Server started on port: " + PORT);
})