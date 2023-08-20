import express from "express";
import userProducts from './userProducts';
import user from './user';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render("index.js")
});

router.use('/user', user)
router.use('/userProducts', userProducts)

export default router;
