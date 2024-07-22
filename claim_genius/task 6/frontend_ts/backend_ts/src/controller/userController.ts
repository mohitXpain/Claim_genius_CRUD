import { Request, Response } from "express";
import { fetchUsers, postUser, deleteUser, updateUser, searchSortPage, uploadDoc, uploadDocument, getUserDocuments } from "../model/UserModel";
import { Users, Document } from "../annotation/UserAnnotation";
import { number } from "joi";
import dotenv from 'dotenv';


dotenv.config({ path: './src/.env' });



export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try{
        const users = await fetchUsers();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
      }    
};


export const insertUser = async (req: Request, res: Response) => {
    try{
        const { first_name, last_name, dob, mno, address } = req.body as Users;
        await postUser(first_name, last_name, dob, mno, address);
        res.status(201).json({ message: "User created successfully" });
    }catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to store users" });
    }
}


export const removeUser = async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.userId, 10);

    try{
        await deleteUser(userId);
        res.status(200).json({ message: "User deleted successfully" });
    }catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
}


export const modifyUser = async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.userId, 10);
    const { first_name, last_name, dob, mno, address } = req.body as Users;

    try{
        await updateUser(userId, first_name, last_name, dob, mno, address);
        res.status(200).json({message: "User updated successfully"});
    }catch (error){
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
}




export const getSearchSortPage = async (req: Request, res: Response): Promise<void> => {
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

        // Call searchSortPage function and specify return types
        const { data, totalCount } = await searchSortPage(searchTerm, sortColumn, sortCommand, limit, offset);

        if (totalCount === undefined) {
            throw new Error("Total count is undefined");
        }
        
        const totalPages = Math.ceil(totalCount / limit);

        res.json({
            data: data,
            pagination: {
                page: page,
                limit: limit,
                totalCount,
                totalPages
            }
        });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



export const UploadingDoc = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId, 10);
    const files = req.files as Express.Multer.File[];

    try {
        if (isNaN(userId)) {
            res.status(400).json({ error: "Invalid user ID" });
            return;
        }

        if (!files || files.length === 0) {
            res.status(400).json({ error: "No file uploaded" });
            return;
        }

        for (const file of files) {
            await uploadDoc(userId, file.filename);
        }

        res.status(201).json({ message: "Documents uploaded successfully" });

    } catch (error) {
        if (error instanceof Error) {
            console.error("Error uploading documents:", error.message);
            res.status(500).json({ error: "Failed to upload documents" });
        }
    }
};





export const uploadDocController = async (req: Request, res: Response) => {
    try {
        console.log('Request Body:', req.body); 
        const userId = req.headers['userId'];
        console.log('User ID:', userId);
        const files = req.files as Express.Multer.File[];

        if (!userId || !files || files.length === 0) {
            return res.status(400).json({ error: "Invalid userId or files" });
        }

        for (const file of files) {
            await uploadDocument(Number(userId), file.filename); 
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



export const getUserDocumentsController = async (req: Request, res: Response) => {
    const port = process.env.PORT;
    try {
        const userId = req.headers['userId'] as string;

        if (!userId || isNaN(Number(userId)) || Number(userId) <= 0) {
            return res.status(400).json({ error: "Invalid userId" });
        }

        const [queryResult] = await getUserDocuments(Number(userId));

        const documents: Document[] = (queryResult as Document[]).map((result: Document, index: number) => ({
            id: result.id,
            filename: result.filename,
            created_at: result.created_at,
            FilePath: `http://localhost:${port}/uploads/${result.filename}` 
        }));

        return res.status(200).json(documents);

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
