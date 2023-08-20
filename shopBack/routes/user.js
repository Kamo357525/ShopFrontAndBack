import express from "express";
import multer from 'multer';
import UserControllers from '../controllers/UserControllers'

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
})

router.post('/login',  UserControllers.Login);
router.post('/registration', upload.array('images[]'),   UserControllers.Registration);
router.post('/getUserFromToken', UserControllers.UserToken);
router.post('/profileUpdate',  upload.array('images[]'), UserControllers.Update);

export default router;