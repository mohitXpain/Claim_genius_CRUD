import express, {Application, Request, Response} from "express";
import bodyParser from "body-parser";
import fs from 'fs';
import dotenv from 'dotenv';
import router from './routes/router'



dotenv.config({path: './src/.env'});


const app: Application = express();


if (!process.env.PORT) {
    throw new Error("PORT environment variable is not defined");
  }

const port: number = parseInt(process.env.PORT, 10);

app.use(bodyParser.json());


app.use("/restapi", router);


app.get("/", (req: Request, res: Response) => {
    res.send("Hello Claim_Genius");
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });