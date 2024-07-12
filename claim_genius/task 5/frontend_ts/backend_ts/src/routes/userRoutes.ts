import express from "express";
import { getUsers, insertUser, removeUser,modifyUser, getSearchSortPage, UploadingDoc, uploadDocController, getUserDocumentsController } from "../controller/userController";
import { register, login } from "../controller/AuthController";
import { verifyUserToken, IsUser, IsAdmin } from "../middleware/AuthMiddleware";
import {validateUser, upload} from "../middleware/userMiddleware";


const router = express.Router();

router.get("/", getUsers);

router.post("/", validateUser, insertUser);   

router.delete("/:userId", removeUser);

router.put("/:userId", modifyUser);

router.get("/searchsortpage", getSearchSortPage);

router.post("/register", register);

router.post("/login", login);

router.post("/:userId/upload", verifyUserToken, upload.array('files'), UploadingDoc);

router.post("/documentUpload", verifyUserToken, upload.array('files'), uploadDocController);

router.get("/documentUpload", verifyUserToken, getUserDocumentsController);

// router.post('/someUserRoute', verifyUserToken, IsUser, (req, res) => {
//     res.send("This is a user-only route.");
// });

// router.post('/someAdminRoute', verifyUserToken, IsAdmin, (req, res) => {
//     res.send("This is an admin-only route.");
// });

export default router;
