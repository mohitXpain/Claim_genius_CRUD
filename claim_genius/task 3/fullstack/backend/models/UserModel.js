import {db} from '../config/db.js';

export const fetchUsers= async () => {
    try{
        const [users] = await db.query("SELECT * FROM users");
        return users; 
    }catch (error) {
        throw new Error("Database query failed: " + error.message);
      }
};

export const postUser = async (first_name, last_name, dob, mno, address) => {
    try{
        await db.query('INSERT INTO users (first_name, last_name, dob, mno, address) VALUES (?, ?, ?, ?, ?)',
        [first_name, last_name, dob, mno, address] );
    }catch (error) {
        throw new Error("Insertion in Database failed: " + error.message);
    }
};

export const deleteUser = async (userId) => {
    try {
      await db.query("DELETE FROM users WHERE id = ?", [userId]);
    } catch (error) {
      console.error("Database delete failed:", error);
      throw new Error("Database delete failed: " + error.message);
    }
};

export const updateUser = async (userId, first_name, last_name, dob, mno, address) => {
    try {
      await db.query(
        'UPDATE users SET first_name = ?, last_name = ?, dob = ?, mno = ?, address = ? WHERE id = ?',
        [first_name, last_name, dob, mno, address, userId]
      );
    } catch (error) {
      console.error("Database update failed:", error);
      throw new Error("Database update failed: " + error.message);
    }
  };


  export const searchUser = async (searchTerm) => {
    const query = ("SELECT * FROM users WHERE first_name LIKE ? OR last_name LIKE ? OR dob LIKE ? OR mno LIKE ? OR address LIKE ?");

    const searchValue = `%${searchTerm}%`;
  
    try {
      const [results] = await db.query(query, [searchValue, searchValue, searchValue, searchValue, searchValue]);
      return results;
    } catch (error) {
      console.error("Database search query failed:", error);
      throw new Error("Database search query failed: " + error.message);
    }
  };


  export const sortByField = async (sortColumn = "first_name", sortCommand = "ASC") => {

      const query = `
      SELECT * FROM users
      ORDER BY ${sortColumn} ${sortCommand}`;
  
    try {
      const [results] = await db.query(query);
      return results;
    } catch (error) {
      console.error("Database search query failed:", error);
      throw new Error("Database search query failed: " + error.message);
    }
  };


  
  export const multiplePage = async (limit, offset) => {
      const [data] = await db.query('SELECT * FROM users  ORDER BY id DESC limit ? offset ?', [+limit, +offset]);
      return data;
  }

export const countUser = async () => {
  const [totalPageData] = await db.query('SELECT COUNT(*) AS count FROM users');
  return totalPageData[0].count;
}


export const sortPageByField = async (sortColumn = "id", sortCommand = "DESC", limit , offset) => {
  const query = `
    SELECT * FROM users
    ORDER BY ${sortColumn} ${sortCommand}
    LIMIT ?
    OFFSET ?`;
    
  try {
    const [results] = await db.query(query, [+limit, +offset]);
    return results;
  } catch (error) {
    console.error("Database query failed:", error);
    throw new Error("Database query failed: " + error.message);
  }
};






export const searchSortPage = async (searchTerm, sortColumn = "id", sortCommand = "DESC", limit , offset ) => {

  const searchValue = `%${searchTerm}%`;

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
    const [results] = await db.query(query, [searchValue, searchValue, searchValue, searchValue, searchValue, +limit, +offset]);
    

    // Handle empty results
    const totalCount = results.length > 0 ? results[0].totalCount : 0;


    return { data: results, totalCount };
  } catch (error) {
    console.error("Database query failed:", error);
    throw new Error("Database query failed: " + error.message);
  }
};
