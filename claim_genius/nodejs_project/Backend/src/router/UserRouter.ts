import express from "express";
import { fetchUsers, insertUser, login } from "../controller/AuthController";

const router = express.Router();

router.get('/', fetchUsers);

router.post('/register', insertUser);

router.get('/login', login);


export default router;
