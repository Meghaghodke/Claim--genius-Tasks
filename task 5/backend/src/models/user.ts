import db from '../config/db';
import bcrypt from 'bcryptjs';
import { User } from '../types/types';

export const createUser = async (username: string, password: string): Promise<void> => {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO user (username, password) VALUES (?, ?)', [username, hashedPassword]);
};


export const findUserByUsername = async (username: string): Promise<User | null> => {
    const [rows] = await db.query('SELECT * FROM user WHERE username = ?', [username]);
    
    if (Array.isArray(rows) && rows.length > 0) {
        return rows[0] as User;
    } else {
        return null;
    }
};

