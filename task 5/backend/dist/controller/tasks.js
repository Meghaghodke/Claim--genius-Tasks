"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const user_1 = require("../models/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const existingUser = yield (0, user_1.findUserByUsername)(username);
        if (existingUser) {
            res.status(400).json({ success: false, message: 'User already exists' });
            return;
        }
        yield (0, user_1.createUser)(username, password);
        res.status(201).json({ success: true, message: 'User registered successfully' });
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield (0, user_1.findUserByUsername)(username);
        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }
        const passwordMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!passwordMatch) {
            res.status(401).json({ success: false, message: 'Incorrect password' });
            return;
        }
        const jwtSecret = process.env.JWT_SECRET;
        console.log('JWT_SECRET:', jwtSecret);
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined');
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
        res.status(200).json({ success: true, message: 'Login successful', token });
    }
    catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
exports.loginUser = loginUser;
//# sourceMappingURL=tasks.js.map