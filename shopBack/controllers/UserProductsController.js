import Product from "../models/productModel";
import ImageProducts from "../models/imageProductModel";
import {imageValidList} from "../depenses/list";
import validator from "validator";
import jwt from "jsonwebtoken";
import Promise from "bluebird";
import {v4 as uuidV4} from "uuid";
import path from "path";
import sharp from "sharp";
import Users from "../models/usersModel";
import fs from "fs";

const {JWT_SECRET} = process.env;

class UserProduct {
    static  GetAllProducts = async (req, res, next) => {
        try {
            const {limit = 1, offset = 1} = req.body;
            const data = await Product.findAll({
                include: ImageProducts,
                offset: offset*limit,
                limit: limit,
            })
            const count = Math.ceil(await Product.count({})/limit)

            res.json({
                status: 200,
                data,
                count,

            })
        } catch (e) {
            e.status = '303';
            next(e);
        }
    }
    static  Get = async (req, res, next) => {
        try {
            const {limit = 1, Token = '', offset = 1} = req.body;
            const {userId} = jwt.verify(Token, JWT_SECRET);
            const data = await Product.findAll({
                where: {
                    userId,
                },
                include: ImageProducts,
                offset: offset * limit,
                limit: limit,
            })
            const count = Math.ceil(await Product.count({
                where: {
                    userId,
                },
            }) / limit)

            res.json({
                status: 200,
                data,
                count,
            })
        } catch (e) {
            e.status = '303';
            next(e);
        }
    }

    static  Delete = async (req, res, next) => {

        try {
            const {Token = "", limit = 1, offset = 1, productId = ''} = req.body
            const {userId} = jwt.verify(Token, JWT_SECRET);

            let deletedPhoto= await ImageProducts.findAll({
                where:{
                    productId,
                }
            })

            async function deleteImg(img){
                const filePath =  path.join(__dirname, `../public/imagesProducts/${img.replace('http://localhost:8000//', '')}`)
                fs.unlinkSync(filePath)
            }
            if (deletedPhoto.length) {
                await Promise.map(deletedPhoto, (img) => {
                    return Promise.all([
                        deleteImg(img.dataValues.src)
                    ]);
                })
            }
            await Product.destroy({
                where: {
                    id: productId,
                    userId,
                },
                force: true
            });

            const data = await Product.findAll({
                where: {
                    userId,
                },
                include: ImageProducts,
                offset: offset * limit,
                limit,
            })

            const count = Math.ceil(await Product.count({
                where: {
                    userId,
                },
            }) / limit)

            res.json({
                status: 200,
                data,
                count,

            })
        } catch (e) {
            e.status = '303';
            next(e);
        }
    }
    static  Update = async (req, res, next) => {

        try {
            const {
                limit = 1,
                offset = 0,
                prodId = '',
                Token = '',
                name = '',
                color = '',
                price = 1,
                deleteImgId = []
            } = req.body;
            const {files} = req;
            const deleteImg = JSON.parse(deleteImgId);
            let filterFiles = [];
            const error = [];
            if (files.length) {
                filterFiles = files.filter((item, i) => imageValidList.includes(item.mimetype));
            }
            if (!validator.isAlpha(name) || name.length < 2) {
                error.push({
                    message: "invalid Product Name",
                    stack: "invalid Product Name",
                    errors: "invalid Product Name",
                })
            }

            if (isNaN(price) || typeof !(price) === 'number' || price <= 0 || price.length === 0) {
                error.push({
                    message: "invalid Product Price",
                    stack: "invalid  Product Price",
                    errors: "invalid Product Price",
                })
            }

            if (error.length) {
                next({
                    status: 303,
                    errors: error,
                })
            } else {
                const {userId} = jwt.verify(Token, JWT_SECRET);
                await Product.update({
                    name,
                    color,
                    price,
                }, {
                    where: {
                        userId: +userId,
                        id: prodId,
                    },
                });

                async function createPhoto(path) {
                    await ImageProducts.create({
                        productId: prodId,
                        userId,
                        src: `http://localhost:8000//${path}`
                    })
                }

                await Promise.map(filterFiles, (file) => {
                    let imgId = uuidV4();
                    const filePath = path.join(__dirname, `../public/imagesProducts/${imgId}.jpg`);
                    return Promise.all([
                        createPhoto(`${imgId}.jpg`),
                        sharp(file.buffer)
                            .rotate()
                            .resize(512)
                            .toFile(filePath),
                    ]);
                })

                async function deleteImgId(id) {
                    const urlImg = await ImageProducts.findOne({
                        where: {
                            id
                        }
                    })
                    if (urlImg) {
                        const filePath =  path.join(__dirname, `../public/imagesProducts/${urlImg.dataValues.src.replace('http://localhost:8000//', '')}`)
                       await fs.unlinkSync(filePath)
                    }
                    await ImageProducts.destroy({
                        where: {
                            id,
                            userId,
                        },
                        force: true
                    });
                }

                if (deleteImg.length) {
                    await Promise.map(deleteImg, (id) => {
                        return Promise.all([
                            deleteImgId(id)
                        ]);
                    })
                }

                const data = await Product.findAll({
                    where: {
                        userId,
                    },
                    include: ImageProducts,
                    offset: +offset * +limit,
                    limit: +limit,
                })

                const count = Math.ceil(await Product.count({
                    where: {
                        userId,
                    },
                }) / +limit)

                res.json({
                    status: 200,
                    data,
                    count,
                })
            }
        } catch (e) {
            e.status = '303';
            next(e);
        }
    }
    static CreateProduct = async (req, res, next) => {
        try {
            const {price = "", color = "", Token = "", name = ""} = req.body.data;
            const {files} = req;
            let filterFiles = [];
            const error = [];
            if (files.length) {
                filterFiles = files.filter((item, i) => imageValidList.includes(item.mimetype));
            }

            if (!validator.isAlpha(name) || name.length < 2) {
                error.push({
                    message: "invalid Product Name",
                    stack: "invalid Product Name",
                    errors: "invalid Product Name",
                })
            }

            if (isNaN(price) || typeof !(price) === 'number' || price <= 0 || price.length === 0) {
                error.push({
                    message: "invalid Product Price",
                    stack: "invalid  Product Price",
                    errors: "invalid Product Price",
                })
            }

            if (error.length) {
                next({
                    status: 303,
                    errors: error,
                })
            } else {
                const {userId} = jwt.verify(Token, JWT_SECRET);
                const {id} = await Product.create({
                    userId,
                    name,
                    color,
                    price,
                })

                async function createPhoto(path) {
                    await ImageProducts.create({
                        productId: id,
                        userId,
                        src: `http://localhost:8000//${path}`
                    })
                }

                await Promise.map(filterFiles, (file) => {
                    let imgId = uuidV4();
                    const filePath = path.join(__dirname, `../public/imagesProducts/${imgId}.jpg`);

                    return Promise.all([
                        createPhoto(`${imgId}.jpg`),
                        sharp(file.buffer)
                            .rotate()
                            .resize(512)
                            .toFile(filePath),
                    ]);
                })
                const user = await Users.findOne({
                    where: {
                        id: userId,
                    },
                    include: [{
                        model: Product,
                        include: ImageProducts,
                    }],
                })

                res.json({
                    statusCode: 200,
                    data: user,
                })
            }
        } catch (e) {
            e.status = '303';
            next(e);
        }
    }
}

export default UserProduct
