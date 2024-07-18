"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasks_1 = require("../controller/tasks");
const router = express_1.default.Router();
router.post('/register', tasks_1.registerUser);
router.post('/login', tasks_1.loginUser);
exports.default = router;
//# sourceMappingURL=auth.js.map