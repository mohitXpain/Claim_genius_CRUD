import e, { Request, Response } from "express";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import {sendOtpEmail} from "../utiles/otpStore";
import {GetAllUser ,Register, FindUserByName, FindUserByEmail, UpdateOtpverify} from "../model/UserModel";
import { User } from "../annotation/userAnnotation";
import { send } from "process";


export const fetchUsers = async (req: Request, res: Response) => {
    try {
        const getuser = await GetAllUser();
        res.json(getuser);
    }catch(error){
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
}



const generateOtp = (): string => crypto.randomInt(100000, 999999).toString();
const otpCache = new Map<string, string>();




export const insertUser = async (req: Request, res: Response) => {
    
    const {name, phone, email, password} = req.body as User;
    const otp = generateOtp();

    if (!name || !phone || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        
        const user = await FindUserByName(name);
        const user_email = await FindUserByEmail(email);

        if(user.length > 0){
            return res.status(400).json({message: "User already exists"})
        }

        if(user_email.length > 0){
            return res.status(400).json({message: "Email already exists"})
        }

        await Register(name, phone, email, password);

        await sendOtpEmail(email, otp);
        res.status(200).json({message: "User created successfully"});

    }catch(error){
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to store users" });
    }
};




export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as User;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const user = await FindUserByEmail(email);
        if (user.length === 0) {
            console.log(`User not found for email: ${email}`);
            return res.status(400).json({ message: 'User not found' });
        }

        const userData = user[0];

        if (password !== userData.password) {
            console.log(`Invalid password for email: ${email}`);
            return res.status(400).json({ message: 'Incorrect Password.' });
        }

        if(!userData.otp_verified){
            const otp = generateOtp();
            otpCache.set(email, otp);
            await sendOtpEmail(email, otp);
            return res.status(200).json({ message: "OTP sent to your email" });
        }

        res.status(200).json({ message: "Login successful" });

    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: "Failed to login user" });
    }
};




export const verifyLogin = async (req: Request, res: Response) => {
    const { otp } = req.body;
    try {
        const email = req.params.email;

    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ error: "Failed to verify OTP" });
    }
};


