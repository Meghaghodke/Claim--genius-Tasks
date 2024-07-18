"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const controller_1 = require("../controller/controller");
const tasks_1 = require("../controller/tasks");
const authMiddleware_1 = require("../middleware/authMiddleware");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: './src/uplods/',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path_1.default.extname(file.originalname)}`);
    }
});
const upload = (0, multer_1.default)({
    storage: storage
});
router.post('/upload', authMiddleware_1.authenticateToken, upload.array('Files', 10), controller_1.UploadFiles);
router.get('/fetch', authMiddleware_1.authenticateToken, controller_1.fetchData);
router.post('/register', tasks_1.registerUser);
router.post('/login', tasks_1.loginUser);
router.post('/create', authMiddleware_1.authenticateToken, upload.single('images'), controller_1.createdata);
router.put('/update/:id', upload.single('images'), authMiddleware_1.authenticateToken, controller_1.updatedata);
router.delete('/delete/:id', authMiddleware_1.authenticateToken, controller_1.deletedata);
router.get('/searching', authMiddleware_1.authenticateToken, controller_1.searchsortpage);
exports.default = router;
//# sourceMappingURL=myrouts.js.map