import { Request, Response, NextFunction } from "express";
import { AuthRegister } from '../annotation/UserAnnotation';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config({path: './src/.env'});

const jwtSecret = process.env.JWT_SECRET as string;

export const verifyUserToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwtToken;

    if (!token) {
        return res.status(401).json({ message: 'Access denied/ unauthorized request' });
    }

    try {
        const verifiedUser = jwt.verify(token, jwtSecret) as {  UserId: number  };

        if (!verifiedUser) {
            return res.status(401).json({ message: 'Unauthorized request' });
        }

        req.headers['userId'] = String(verifiedUser.UserId);
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};




export const IsUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user;
    if (user && user.user_type_id === 0) {
        return next();
    }
    return res.status(401).json({ message: "Unauthorized!" });
};

export const IsAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user;
    if (user && user.user_type_id === 1) {
        return next();
    }
    return res.status(401).json({ message: "Unauthorized!" });
};


