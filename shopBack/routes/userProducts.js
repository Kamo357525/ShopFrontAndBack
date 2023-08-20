import express from "express";
import UserProduct from "../controllers/UserProductsController";
import multer from 'multer';

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
})

router.post('/get',  UserProduct.Get);
router.post('/delete',   UserProduct.Delete);
router.post('/update',  upload.array('images[]'), UserProduct.Update);
router.post('/createProduct',  upload.array('images[]'), UserProduct.CreateProduct);
router.post('/getAllProducts',   UserProduct.GetAllProducts);

export default router;