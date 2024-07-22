import {db} from '../config/db';
import { AuthRegister } from '../annotation/UserAnnotation';

export const createUser = async(name: AuthRegister['name'], email: AuthRegister['email'], password: AuthRegister['password']) => {
    try{
        await db.query('INSERT INTO register (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
    }catch (error){
        console.error('Error creating user: ', error);
        throw new Error('Database error');
    }
};

export const findAuthUser = async (name: AuthRegister['name']) => {
    try {
        const [rows] = await db.query('SELECT * FROM register WHERE name = ?', [name]);
        return rows as AuthRegister[];
    } catch (error) {
        console.error('Error finding user:', error);
        throw new Error('Database error');
    }
};