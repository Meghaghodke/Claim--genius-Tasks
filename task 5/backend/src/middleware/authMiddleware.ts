import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET || '', (err, decoded) => {
        if (err) {
            res.status(401).json({ success: false, message: 'Forbidden: Invalid token' });
            return;
        }
        req.body.userId = (decoded as { userId: number }).userId;
        next();
    });
};
