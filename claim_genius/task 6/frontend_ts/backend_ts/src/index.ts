import express, {Application, Request, Response} from "express";
import path from "path";
import bodyParser from "body-parser";
import { PrismaClient } from '@prisma/client';
import cookieParser from "cookie-parser"; 
import {db} from './config/db';
import userRouters from './routes/userRoutes';
import v2Route from './routes/v2Route';
import {Server} from 'http';
import dotenv from 'dotenv';


dotenv.config({path: './src/.env'});


const app: Application = express();

const prisma = new PrismaClient();


if (!process.env.PORT) {
  throw new Error("PORT environment variable is not defined");
}

const port: number = parseInt(process.env.PORT, 10);



app.use(bodyParser.json());
app.use(cookieParser()); 
app.use('/uploads', express.static(path.join(__dirname, '..' ,'uploads')));


app.use("/users", userRouters);
app.use('/v2/users', v2Route);



app.get("/", (req: Request, res: Response) => {
    res.send("Hello Claim_Genius");
});



(async () => {
  try {
    await db.query("SELECT 1");
    console.log("MySQL database connected successfully");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    return;
  }

  try {
    await prisma.$connect();
    console.log("Prisma connected to the database successfully");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    return;
  }

  const server: Server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})();