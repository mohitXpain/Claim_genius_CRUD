import { Request, Response, NextFunction } from "express";
import { ValidationError } from "joi";
import schema from "../schema/userValidation";

const validateUser = (req: Request, res: Response, next: NextFunction) => {
    const { error }: { error?: ValidationError }  = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

export default validateUser;
