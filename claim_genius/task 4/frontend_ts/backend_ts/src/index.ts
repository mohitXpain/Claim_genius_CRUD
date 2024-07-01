import express, {Application, Request, Response} from "express";
import bodyParser from "body-parser";
import {db} from './config/db';
import userRouters from './routes/userRoutes';
import {Server} from 'http';


const app: Application = express();
const port: number = 5001;

app.use(bodyParser.json());


app.use("/users", userRouters);


app.get("/", (req: Request, res: Response) => {
    res.send("Hello Claim_Genius");
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