import express from 'express';
import path from 'path';
import { createdata, updatedata, deletedata, searchsortpage , UploadFiles,fetchData} from '../controller/controller';
import { registerUser, loginUser } from '../controller/tasks';
import { authenticateToken } from '../middleware/authMiddleware';
import multer from 'multer';
const router = express.Router();



const storage = multer.diskStorage({
    destination: './src/uplods/',
    filename: (req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

// const storage = multer.memoryStorage()

const upload = multer({
    storage:storage
})
router.post('/upload',authenticateToken,upload.array('Files',10), UploadFiles);
router.get('/fetch', authenticateToken,fetchData);
router.post('/register', registerUser);
router.post('/login', loginUser);

router.post('/create',authenticateToken,upload.single('images'),createdata);
router.put('/update/:id',upload.single('images'),authenticateToken, updatedata);
router.delete('/delete/:id',authenticateToken, deletedata);
router.get('/searching', authenticateToken,searchsortpage);

export default router;
