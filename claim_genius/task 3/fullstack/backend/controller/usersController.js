import {fetchUsers, postUser, deleteUser, updateUser, searchUser, sortByField, multiplePage, countUser, sortPageByField, searchSortPage} from '../models/UserModel.js';

export const getUsers = async (req, res) => {
    try{
        const users = await fetchUsers();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
      }    
};

export const insertUser = async (req, res) => {
    try{
        const { first_name, last_name, dob, mno, address } = req.body;

        await postUser(first_name, last_name, dob, mno, address);
        res.status(201).json({ message: "User created successfully" });

    }catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Failed to create user" });
    }
};

export const removeUser = async (req, res) => {
    const userId = req.params.userId;
    try {
      await deleteUser(userId);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Failed to delete user" });
    }
};

export const modifyUser = async (req, res) => {
    const userId = req.params.userId;
    const { first_name, last_name, dob, mno, address } = req.body;
    
    try {

        await updateUser(userId, first_name, last_name, dob, mno, address);
  
      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Failed to update user" });
    }
  };
  

export const findUser = async (req, res) => {
    const searchTerm = req.query.find;
  
    if (!searchTerm) {
      return res.status(400).json({ error: "Search term is required" });
    }
  
    try {
      const results = await searchUser(searchTerm);
      res.json(results);
    } catch (error) {
      console.error("Error executing search query:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };



export const sortTable = async (req, res) => {
  const sortColumn = req.query.sortColumn || "first_name";
  const sortCommand = req.query.sortCommand || "ASC";

  const validColumns = ["first_name", "last_name", "dob", "mno", "address"];
  const validDirections = ["ASC", "DESC"];

  if (!validColumns.includes(sortColumn)) {
    return res.status(400).json({ error: "Invalid sort column" });
  }

  if (!validDirections.includes(sortCommand)) {
    return res.status(400).json({ error: "Invalid sort direction" });
  }

  try {
    const results = await sortByField(sortColumn, sortCommand);
    res.json(results);
  } catch (error) {
    console.error("Error executing sort query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



export const getUserPage = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const offset = (page - 1) * limit;

    const data = await multiplePage(limit, offset);
    const totalCount = await countUser();
    const totalPage = Math.ceil(+totalCount / limit);

    res.json({
      data: data,
      pagination: {
        page: +page,
        limit: +limit,
        totalPage,
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(401).json({
      success: false,
      message: 'An error occurred while fetching users.',
    });
  }
};



export const getSearchPage = async (req, res) => {
  try {
    const { searchTerm, page, limit } = req.query;

    const offset = (page - 1) * limit;

    
    const results = await searchUser(searchTerm);
    const totalCount = results.length; 

    const data = results.slice(offset, offset + limit);

    const totalPage = Math.ceil(totalCount / limit);

    res.json({
      data: data,
      pagination: {
        page: +page,
        limit: +limit,
        totalPage,
      },
    });

  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};




export const getSortPage = async (req, res) => {
  try {

    const sortColumn = req.query.sortColumn || "id";
    const sortCommand = req.query.sortCommand || "DESC";
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const validColumns = ["id", "first_name", "last_name", "dob", "mno", "address", "created_at"];
    const validCommands = ["ASC", "DESC"];
    if (!validColumns.includes(sortColumn)) {
      return res.status(400).json({ error: "Invalid sort column" });
    }
    if (!validCommands.includes(sortCommand)) {
      return res.status(400).json({ error: "Invalid sort command" });
    }

    const offset = (page - 1) * limit;

    const totalCount = await countUser();
    const totalPages = Math.ceil(totalCount / limit);

    const data = await sortPageByField(sortColumn, sortCommand, limit, offset);

    res.json({
      data: data,
      pagination: {
        page: page,
        limit: limit,
        totalCount: totalCount,
        totalPage: totalPages
      }
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};










//all three api in one

export const getSearchSortPage = async (req, res) => {
  try {
    const sortColumn = req.query.sortColumn || "id";
    const sortCommand = req.query.sortCommand || "DESC";
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const searchTerm = req.query.find || "";

    const validColumns = ["id", "first_name", "last_name", "dob", "mno", "address", "created_at"];
    const validCommands = ["ASC", "DESC"];
    if (!validColumns.includes(sortColumn)) {
      return res.status(400).json({ error: "Invalid sort column" });
    }
    if (!validCommands.includes(sortCommand)) {
      return res.status(400).json({ error: "Invalid sort command" });
    }
    const offset = (page - 1) * limit;

    const {data, totalCount} = await searchSortPage(searchTerm, sortColumn, sortCommand, limit, offset);

    const totalPages = Math.ceil(totalCount / limit);


    res.json({
      data: data,
      pagination: {
        page: page,
        limit: limit,
        totalCount,
        totalPage: totalPages
      }
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};




