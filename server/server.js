import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./router/auth/authRouter.js"
import eventRouter from "./router/Events/EventsRouter.js"
import teamRouter from "./router/team/teamRouter.js"
import playerRouter from "./router/team/player/PlayerRouter.js"
import path from "path";
import os from 'os';
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
app.use("/event/team", teamRouter);
app.use("/event/team",playerRouter);
app.use("/event", eventRouter);
const networkInterfaces = os.networkInterfaces();
const localIp = Object.values(networkInterfaces)
  .flat()
  .find((iface) => iface.family === 'IPv4' && !iface.internal)?.address;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on:`);
  console.log(`- Local: http://localhost:${PORT}`);
  if (localIp) {
    console.log(`- Network: http://${localIp}:${PORT}`);
  } else {
    console.log(`- Network IP could not be determined.`);
  }
});
