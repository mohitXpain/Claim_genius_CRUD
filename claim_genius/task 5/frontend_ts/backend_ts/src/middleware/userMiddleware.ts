import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { ValidationError } from "joi";
import schema from "../schema/userValidation";

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
    const { error }: { error?: ValidationError }  = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};




//uploadind doc code
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/i)) {
        return cb(new Error('Only image files (jpg, jpeg, png) and pdf are allowed!'));
    }
    cb(null, true);
};

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, 
});



