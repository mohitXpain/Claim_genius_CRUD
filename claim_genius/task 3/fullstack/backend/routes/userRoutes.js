import express from 'express';
import { getUsers, insertUser, removeUser, modifyUser, findUser, sortTable, getUserPage, getSearchPage, getSortPage, getSearchSortPage} from '../controller/usersController.js';
import validateUser from '../middleware/userMidlleware.js';

// Create an Express router
const router = express.Router();

router.get("/", getUsers);

router.post("/", validateUser, insertUser);   

router.delete("/:userId", removeUser);

router.put("/:userId", modifyUser);

router.get("/search", findUser);

router.get("/sort", sortTable);

router.get("/page", getUserPage);

router.get("/searchpage", getSearchPage);

router.get("/sortpage", getSortPage);

router.get("/searchsortpage", getSearchSortPage);


export default router;
