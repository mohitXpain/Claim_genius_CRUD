 import express, {Application, Request, Response} from "express";
 import bodyParser from "body-parser";
 import { db } from "./config/db";
 import router from "./router/UserRouter";
 import {Server} from 'http';
 import dotenv from 'dotenv';
 


 dotenv.config({path: './src/.env'});
 

 const app: Application = express();


if (!process.env.PORT) {
  throw new Error("PORT environment variable is not defined");
}

const port: number = parseInt(process.env.PORT, 10);

app.use(bodyParser.json());


app.use('/auth', router);


app.get('/', (req: Request, res: Response) => {
    res.send("Food app");
});



(async () => {
    try {
      await db.query("SELECT 1");
      console.log("MySQL database connected successfully");
      const server: Server = app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    } catch (error) {
      console.error("Failed to connect to the database:", error);
    }
  })();

  