import { Request, Response } from "express";
import { findAuthUser, createUser} from '../model/UserAuthModel';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: './src/.env' });

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const user = await findAuthUser(name);
        if (user.length > 0) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        await createUser(name, email, password);

        res.json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Failed to register user" });
    }
};

export const login = async (req: Request, res: Response) => {
    const { name, password } = req.body;

    try {
        if (!name || !password) {
            return res.status(400).json({ message: 'Name and password are required.' });
        }

        const user = await findAuthUser(name);
        if (user.length === 0) {
            console.log(`User not found for name: ${name}`);
            res.clearCookie('jwtToken', { httpOnly: true, secure: true, sameSite: 'strict' });
            return res.status(400).json({ message: 'User not found' });
        }

        if (password !== user[0].password) {
            console.log(`Invalid password for user: ${name}`);
            res.clearCookie('jwtToken', { httpOnly: true, secure: true, sameSite: 'strict' });
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const payload = {

                UserId: user[0].id,
                name: user[0].name,
                email: user[0].email
    
        };

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error('JWT secret is not defined');
            return res.status(500).json({ error: 'JWT secret is not defined' });
        }

        const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

        res.cookie('jwtToken', token, { httpOnly: true, secure: true, sameSite: 'strict' });
        
        res.json({ token, message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Failed to log in' });
    }
};
