import express from "express";
import { getUsers, insertUser, removeUser,modifyUser, getSearchSortPage } from "../controller/userController";
import validateUser from "../middleware/userMiddleware";

const router = express.Router();

router.get("/", getUsers);

router.post("/", validateUser, insertUser);   

router.delete("/:userId", removeUser);

router.put("/:userId", modifyUser);

router.get("/searchsortpage", getSearchSortPage);

export default router;
