import express from 'express';
import { getUser, insertUser, removeUser, modifyUser, getSearchSortPage, uploadDocument, getUserDoc} from '../controller/v2Controller';
import { verifyUserToken, IsUser, IsAdmin } from "../middleware/AuthMiddleware";
import {validateUser, upload} from "../middleware/userMiddleware";

const router = express.Router();



router.get('/', getUser);

router.post('/', insertUser);

router.delete('/:id', removeUser);

router.put('/:id', modifyUser);

router.get("/searchsortpage", getSearchSortPage);

// router.post('/register', register);

// router.post('/login', login);

router.post('/uploadDoc',verifyUserToken, upload.array('files'), uploadDocument);

router.get('/uploadDoc', verifyUserToken, getUserDoc);


export default router;