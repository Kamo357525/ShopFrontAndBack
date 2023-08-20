import jwt from "jsonwebtoken";
import validator from "validator";
import md5 from 'md5';
import Users from "../models/usersModel";
import Product from "../models/productModel";
import ImageProducts from "../models/imageProductModel";
import {v4 as uuidV4} from "uuid";
import {imageValidList} from "../depenses/list";
import Promise from "bluebird";
import path from "path";
import sharp from "sharp";
import fs from "fs";

const {JWT_SECRET} = process.env;

class UserControllers {
    static  Login = async (req, res, next) => {
        try {
            const {email, password} = req.body.formData;
            const errors = [];
            if (!validator.isEmail(email)) {
                errors.push({
                    message: "invalid Format Email",
                    stack: "invalid Format Email",
                    errors: "invalid Format Email",
                })
            }
            if (password.length < 6) {
                errors.push({
                    message: "invalid Format Password",
                    stack: "invalid Format Password",
                    errors: "invalid Format Password",
                })
            }
            if (errors.length) {
                next({
                    status: 303,
                    errors: errors,
                })
            } else {
                const passwordMd5 = md5(md5(password) + JWT_SECRET)
                const data = await Users.findOne({
                    where: {
                        email,
                        password: passwordMd5
                    },
                    include: [{
                        model: Product,
                        include: ImageProducts,
                    }],
                })
                if (data) {
                    const token = jwt.sign({userId: data.id}, JWT_SECRET);
                    res.json({
                        statusCode: "200",
                        data,
                        Token: token,
                    })
                } else {
                    next({
                        status: 303,
                        errors: [{message: "no User please Registration"}]
                    })
                }
            }
        } catch (e) {
            next({
                status: 303,
                errors: [{message: "no User please Registration"}],
            })
        }
    }
    static  Registration = async (req, res, next) => {
        try {
            const {email, password, lastName, firstName} = req.body.data
            const {files} = req;
            const errors = [];
            const imgId=uuidV4();
            const {JWT_SECRET} = process.env;

            if(files.length){
                let mimetype=files[0].mimetype;
                if(!imageValidList.includes(mimetype)){
                    errors.push({
                        message: "invalid Image",
                        stack: "invalid Image",
                        errors: "invalid Image",
                    })

                }
            }
            if (!validator.isEmail(email)) {
                errors.push({
                    message: "invalid Email",
                    stack: "invalid Email",
                    errors: "invalid Email",
                })
            }
            if (!validator.isAlpha(lastName) || lastName.length < 2) {
                errors.push({
                    message: "invalid Last name",
                    stack: "invalid Last name",
                    errors: "invalid Last name",
                })
            }
            if (!validator.isAlpha(firstName) || firstName.length < 2) {
                errors.push({
                    message: "invalid First name",
                    stack: "invalid First name",
                    errors: "invalid First name",
                })
            }
            if (password.length < 6) {
                errors.push({
                    message: "invalid Password",
                    stack: "invalid Password",
                    errors: "invalid Password",
                })
            }
            if (errors.length) {
                next({
                    status:303,
                    errors: errors
                })
            }else {
                const md5Password = md5(md5(password) + JWT_SECRET);

                const user = await Users.create({
                    lastName: lastName,
                    firstName: firstName,
                    password: md5Password,
                    email,
                    imageProfile: files.length?`http://localhost:8000//${imgId}.jpg`:null
                })

                const token = jwt.sign({userId: user.id}, JWT_SECRET);

                await Promise.map(files, (file) => {
                    const filePath = path.join(__dirname, `../public/imagesUsers/${imgId}.jpg`)
                    return Promise.all([
                        sharp(file.buffer)
                            .rotate()
                            .resize(512)
                            .toFile(filePath),
                    ]);
                })

                res.json({
                    statusCode: 200,
                    data:user,
                    Token:token,
                })
            }
        } catch (e) {
            e.status='303';
            next(e);
        }
    }
    static  Update = async (req, res, next) => {
        try {
            const {email, password, lastName, Token, firstName, imageProfile} = req.body.data;
            const {files} = req;
            const error = [];
            const imgId = uuidV4();
            let md5Password = null;

            if (files.length) {
                const mimetype = files[0].mimetype;
                if (!imageValidList.includes(mimetype)) {
                    error.push({
                        message: "invalid Image",
                        stack: "invalid Image",
                        errors: "invalid Image",
                    })
                }
            }

            if (!validator.isEmail(email)) {
                error.push({
                    message: "invalid Email",
                    stack: "invalid Email",
                    errors: "invalid Email",
                })
            }
            if (!validator.isAlpha(lastName) || lastName.length < 2) {
                error.push({
                    message: "invalid Last name",
                    stack: "invalid Last name",
                    errors: "invalid Last name",
                })
            }
            if (!validator.isAlpha(firstName) || firstName.length < 2) {
                error.push({
                    message: "invalid First name",
                    stack: "invalid First name",
                    errors: "invalid First name",
                })
            }
            if (password) {
                if (password.length < 6) {
                    error.push({
                        message: "invalid Password",
                        stack: "invalid Password",
                        errors: "invalid Password",
                    })
                }
                md5Password = md5(md5(password) + JWT_SECRET);
            }
            if (error.length) {
                next({
                    status: 303,
                    errors: error
                })
            } else {
                const {userId} = jwt.verify(Token, JWT_SECRET);
                if (files.length) {
                    if (imageProfile) {
                        const user = await Users.findOne({
                            where: {
                                id: userId
                            }
                        })
                        const file = path.join(__dirname, `../public/imagesUsers/${user.imageProfile.replace('http://localhost:8000//', '')}`)
                        fs.unlinkSync(file)
                    }
                }

                const data = await Users.update({
                    lastName,
                    firstName,
                    email,
                    [md5Password ? 'password' : null]: md5Password,
                    [files.length ? 'imageProfile' : null]: files.length ? `http://localhost:8000//${imgId}.jpg` : null
                }, {
                    where: {
                        id: +userId
                    },
                });

                const user = await Users.findOne({
                    where: {
                        id: userId
                    }
                })

                await Promise.map(files, (file) => {
                    const filePath = path.join(__dirname, `../public/imagesUsers/${imgId}.jpg`)
                    return Promise.all([
                        sharp(file.buffer)
                            .rotate()
                            .resize(512)
                            .toFile(filePath),
                    ]);
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
    static  UserToken = async (req, res, next) => {
        try {
            const {token} = req.body;
            const {userId}=jwt.verify(token, JWT_SECRET);

            const data = await Users.findOne({
                where: {
                    id: userId
                },
                include: [{
                    model: Product,
                    include:ImageProducts,
                }],
            })
            res.json({
                status:200,
                data,
            })
        } catch (e) {
            e.status = '303';
            next(e);
        }
    }
}

export default UserControllers
