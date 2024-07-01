import { Request, Response } from "express";
import { fetchUsers, postUser, deleteUser, updateUser, searchSortPage } from "../model/UserModel";
import { Users } from "../annotation/UserAnnotation";


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
        res.status(500).json({ error: "Failed to fetch users" });
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
