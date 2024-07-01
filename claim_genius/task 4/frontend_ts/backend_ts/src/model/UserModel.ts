import {db} from '../config/db';
import { Users, API, SearchResult } from '../annotation/UserAnnotation';


export const fetchUsers = async () => {
    try {
        const [users] = await db.query("SELECT * FROM users");
        const userInfo = users as Users[];
        return userInfo;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error("Database query failed: " + error.message);
        } else {
            throw new Error("Database query failed with an unknown error");
        }
    }
};


export const postUser = async (first_name: Users['first_name'], last_name: Users['last_name'], dob: Users['dob'], mno: Users['mno'], address: Users['address']): Promise<void> => {
    try{
        await db.query('INSERT INTO users (first_name, last_name, dob, mno, address) VALUES (?, ?, ?, ?, ?)',
        [first_name, last_name, dob, mno, address] );
    }catch (error){
        if (error instanceof Error) {
            throw new Error("Insertion in Database failed: " + error.message);
        } else {
            throw new Error("Insertion in Database failed with an unknown error");
        }
    }
};


export const deleteUser = async (userId: Users['id']): Promise<void> => {
    try{
        await db.query("DELETE FROM users WHERE id = ?", [userId]);
    }catch (error) {
        if (error instanceof Error) {
            throw new Error("Insertion in Database failed: " + error.message);
        } else {
            throw new Error("Insertion in Database failed with an unknown error");
        }
    }
};


export const updateUser = async (userId: Users['id'], first_name: Users['first_name'], last_name: Users['last_name'], dob: Users['dob'], mno: Users['mno'], address: Users['address']): Promise<void> => {
    try {
      await db.query(
        'UPDATE users SET first_name = ?, last_name = ?, dob = ?, mno = ?, address = ? WHERE id = ?',
        [first_name, last_name, dob, mno, address, userId]
      );
    }catch (error){
        if (error instanceof Error) {
            throw new Error("Insertion in Database failed: " + error.message);
        } else {
            throw new Error("Insertion in Database failed with an unknown error");
        }
    }
};



export const searchSortPage = async (searchTerm: API['Search'], sortColumn: API['SortCol'] = "id", sortCommand: API['SortDir'] = "DESC", limit: API['Limit'] , offset: API['Page']): Promise<SearchResult>  => {
    
    const searchValue: string = `%${searchTerm}%`;

    const query = `
    SELECT *,
    COUNT(*) OVER() AS totalCount
    FROM users
    WHERE first_name LIKE ? 
      OR last_name LIKE ? 
      OR dob LIKE ? 
      OR mno LIKE ? 
      OR address LIKE ?
    ORDER BY ${sortColumn} ${sortCommand}
    LIMIT ? OFFSET ?
  `;

  try {
    const queryResponse = await db.query(query, [searchValue, searchValue, searchValue, searchValue, searchValue, limit, offset]);

    const results = queryResponse[0] as Users[];
    const totalCount = results.length > 0 ? results[0].totalCount : 0;

    return { data: results, totalCount };
} catch (error) {
    if (error instanceof Error) {
        throw new Error("Database query failed: " + error.message);
    } else {
        throw new Error("Database query failed with an unknown error");
    }
}
};

