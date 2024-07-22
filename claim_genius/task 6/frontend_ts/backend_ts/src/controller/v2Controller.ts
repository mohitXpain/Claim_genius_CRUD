import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRegister, Users, Document } from "../annotation/UserAnnotation";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config({ path: './src/.env' });


export const prisma = new PrismaClient();


export const getUser = async(req: Request, res: Response) => {
    try{
        const users = await prisma.user.findMany();
        res.json(users);
    }catch(error){
        console.error("Error in fetching the users: ", error);
        res.status(500).json({error: "Failed to fetch the users. samjha kya!!!"});
    }
};



export const insertUser = async(req: Request, res: Response) => {
    try {
        const { first_name, last_name, dob, mno, address, filename } = req.body as Users;
        await prisma.user.create({
            data: {
                first_name,
                last_name,
                dob,
                mno,
                address, 
                filename
            }
        });
        res.status(201).json({ message: "User created successfully" });
    }catch(error){
        console.error("Error in inserting the user: ", error);
        res.status(500).json({error: "Failed to insert the user."});
    }
};




export const removeUser = async(req: Request, res: Response) => {
    try {
        const {id} = req.params;
        await prisma.user.delete({where: {id: Number(id)}});
        res.status(200).json({message: "User deleted successfully!"});
    }catch (error) {
        if (error instanceof Error) {
            console.error("Error in deleting user:", error.message);
            return res.status(500).json({ error: "Failed to delete user: " + error.message });
        } else {
            console.error("Unknown error during deleting user");
            return res.status(500).json({ error: "Failed to delete user with an unknown error" });
        }
    }
};




export const modifyUser = async(req: Request, res: Response) => {
    try {
        const {id} = req.params
        const { first_name, last_name, dob, mno, address, filename } = req.body as Users;

        await prisma.user.update({
            where: {id: Number(id)},
            data:{
                first_name,
                last_name,
                dob,
                mno,
                address,
                updated_at: new Date()
            }
        });
        res.status(200).json({ message: "User updated successfully" });
    }catch(error){
        console.error("Error in modifying the user: ", error);
        res.status(500).json({error: "Failed to modify the user."});
    }
};




export const getSearchSortPage = async(req: Request, res: Response) => {
    try {
        const sortColumn = req.query.sortColumn as string || "id";
        const sortCommand = req.query.sortCommand as string || "DESC";
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 10;
        const searchTerm = req.query.find as string || "";

        const validColumns: string[] = ["id", "first_name", "last_name", "dob", "mno", "address", "created_at"];
        const validCommands: string[] = ["ASC", "DESC"];

        if (!validColumns.includes(sortColumn)) {
            res.status(400).json({ error: "Invalid sort column" });
            return; 
        }
        
        if (!validCommands.includes(sortCommand)) {
            res.status(400).json({ error: "Invalid sort command" });
            return; 
        }

        const offset = (page - 1) * limit;

        const searchValue: string = `%${searchTerm}%`;

        const result = await prisma.user.findMany({
            where: {
                OR: [
                { first_name: { contains: searchValue} },
                { last_name: { contains: searchValue} },
                { dob: { contains: searchValue} },
                { mno: { contains: searchValue} },
                { address: { contains: searchValue} }
            ]},
            orderBy: {
                [sortColumn]: sortCommand === 'asc'? 'asc': 'desc'

            },
            skip: offset,
            take: limit
        })

        console.log('Query Results:', result);


        const totalCount = await prisma.user.count({
            where: {
                OR: [
                    { first_name: { contains: searchValue} },
                    { last_name: { contains: searchValue } },
                    { dob: { contains: searchValue } },
                    { mno: { contains: searchValue } },
                    { address: { contains: searchValue } }
                ]
            }
        });

        const totalPages = Math.ceil(totalCount / limit);

        res.json({
            data: result,
            pagination: {
                page: page,
                limit: limit,
                totalCount,
                totalPages
            }
        });


    }catch(error){
        console.error("Error in getting the search sort page: ", error);
        res.status(500).json({error: "Failed to get the search sort page."});
    }
};




// export const register = async (req: Request, res: Response) => {
//     try {
//         const { name, email, password } = req.body as AuthRegister;
//         const user = await prisma.register.findUnique({
//             where: {
//                 name: String(name)
//             }
//         });
//         if (user) {
//             return res.status(400).json({ message: 'User already exists.' });
//         }

//         await prisma.register.create({
//             data: {
//                 name,
//                 email,
//                 password
//             }
//         });
//         res.status(201).json({ message: 'User created successfully.' });
//     }catch(error){
//         console.error("Error in registering the user: ", error);
//         res.status(500).json({error: "Failed to register the user."});
//     }
// };



// export const login = async (req: Request, res: Response) => {
//     try {
//         const { name, password } = req.body as AuthRegister;

//         if (!name || !password) {
//             return res.status(400).json({ message: 'Name and password are required.' });
//         }

//         const user = await prisma.register.findUnique({
//             where: {
//                 name: String(name)
//             }
//         });
//         if (!user) {
//             console.log(`User not found for name: ${name}`);
//             return res.status(400).json({ message: 'User not found' });
//         }

//         if (user.password !== password) {
//             console.log(`Invalid password for user: ${name}`);
//             return res.status(400).json({ message: 'Invalid credentials.' });
//         }

//         const payload = {

//             UserId: user.id,
//             name: user.name,
//             email: user.email

//     };

//     const jwtSecret = process.env.JWT_SECRET;
//     if (!jwtSecret) {
//         console.error('JWT secret is not defined');
//         return res.status(500).json({ error: 'JWT secret is not defined' });
//     }

//     const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

//     res.cookie('jwtToken', token, { httpOnly: true, secure: true, sameSite: 'strict' });
    
//     res.json({ token, message: 'Login successful' });

//     }catch(error){
//         console.error('Error logging in:', error);
//         res.status(500).json({ error: 'Failed to log in' });
//     }
// }



export const uploadDocument = async (req: Request, res: Response) => {
    try {

        console.log('Request Body:', req.body); 
        const userId = req.headers['userId'];
        console.log('User ID:', userId);
        const files = req.files as Express.Multer.File[];

        if (!userId || !files || files.length === 0) {
            return res.status(400).json({ error: "Invalid userId or files" });
        }

        for(const file of files){
            await prisma.document.create({
                data: {
                    user_id: Number(userId), 
                    filename: file.filename 

                }
            });
        }
        return res.status(200).json({ message: "Document uploaded successfully" });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error uploading document:", error.message);
            return res.status(500).json({ error: "Failed to upload document: " + error.message });
        } else {
            console.error("Unknown error during document upload");
            return res.status(500).json({ error: "Failed to upload document with an unknown error" });
        }
    }
};



export const getUserDoc =  async (req: Request, res: Response) => {
    const port = process.env.PORT;
    try {
        const userId = req.headers['userId'] as string;

        if (!userId || isNaN(Number(userId)) || Number(userId) <= 0) {
            return res.status(400).json({ error: "Invalid userId" });
        }

        const documents = await prisma.document.findMany({
            where: { user_id: Number(userId) }
        });

        const responseDocuments = documents.map((document) => ({
            user_id: document.id,
            filename: document.filename,
            created_at: document.created_at,
            FilePath: `http://localhost:${port}/uploads/${document.filename}`
        }));

        return res.status(200).json(responseDocuments);

    }catch (error) {
        if (error instanceof Error) {
            console.error("Error fetching documents:", error.message);
            return res.status(500).json({ error: "Failed to fetch documents: " + error.message });
        } else {
            console.error("Unknown error during fetching documents");
            return res.status(500).json({ error: "Failed to fetch documents with an unknown error" });
        }
    }
};


