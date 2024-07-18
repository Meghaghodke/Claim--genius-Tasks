import { Request, Response } from 'express';
import { createUser, findUserByUsername } from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config(); 

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        const existingUser = await findUserByUsername(username);
        if (existingUser) {
            res.status(400).json({ success: false, message: 'User already exists' });
            return;
        }

        await createUser(username, password);
        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        const user = await findUserByUsername(username);
        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            res.status(401).json({ success: false, message: 'Incorrect password' });
            return;
        }

        const jwtSecret = process.env.JWT_SECRET;
        console.log('JWT_SECRET:', jwtSecret);
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined');
        }

        const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

        res.status(200).json({ success: true, message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
