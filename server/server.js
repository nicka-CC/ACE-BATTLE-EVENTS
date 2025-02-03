import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./router/auth/authRouter.js"
import eventRouter from "./router/Events/EventsRouter.js"
import path from "path";
import { fileURLToPath } from 'url';
dotenv.config();
const app = express();
const PORT = 5555;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/auth", authRouter );
app.use("/event", eventRouter);
app.listen(PORT, ()=>{
  console.log("Server started on port: " + PORT);
})