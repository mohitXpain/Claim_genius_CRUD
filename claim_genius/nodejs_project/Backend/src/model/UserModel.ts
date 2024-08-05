import { db } from "../config/db";
import { User } from "../annotation/userAnnotation";


export const GetAllUser = async () => {
    try {
        const [user] = await db.query('SELECT * FROM userresgister');
        return user as User[];
    }catch(error){
        if (error instanceof Error) {
            throw new Error("Database query failed: " + error.message);
        } else {
            throw new Error("Database query failed with an unknown error");
        }
    }
}


export const Register = async (name: User['name'], phone: User['phone'], email: User['email'], password: User['password']) => {
    try {
        await db.query('INSERT INTO userresgister (name, phone, email, password, otp_verified) VALUES (?,?,?,?,?)', [name, phone, email, password, false]);
    }catch(error){
        if (error instanceof Error) {
            throw new Error("Insertion in Database failed: " + error.message);
        } else {
            throw new Error("Insertion in Database failed with an unknown error");
        }
    }
};

export const FindUserByName = async (name: User['name']) => {
    try {
        const [userRow] = await db.query('SELECT * FROM userresgister WHERE name = ?', [name]);
        return userRow as User[];
    }catch(error){
        console.error('Error finding user:', error);
        throw new Error('Database error');
    }
}

// export const FindUserByPhone = async (phone: User['phone']) => {
//     try {
//         const [userRow] = await db.query('SELECT * FROM userresgister WHERE phone = ?', [phone]);
//         return userRow as User[];
//     }catch(error){
//         console.error('Error finding user:', error);
//         throw new Error('Database error');
//     }
// };


export const FindUserByEmail = async (email: User['email']) => {
    try {
        const [userRow] = await db.query('SELECT * FROM userresgister WHERE email = ?', [email]);
        return userRow as User[];
    }catch(error){
        console.error('Error finding email:', error);
        throw new Error('Database error');
    }
};

export const UpdateOtpverify = async (email: User['email']) => {
    try {
        const [query] = await db.query('UPDATE userresgister SET otp_verified = true WHERE email = ?', [email]);
        return query;
    }catch(error){
        console.error('Error updating otp:', error);
        throw new Error('Database error');
    }
};
