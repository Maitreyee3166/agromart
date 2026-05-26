const User = require("../models/user");
const httpStatusCode = require('../utils/httpStatusCode') 

const fs = require('fs');
const path = require('path')


const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const cloudinary = require("../config/cloudinary");

class UserController {

    async farmerregister(req, res) {
        try {
            const { name, email, password, phone } = req.body;

            if (!name || !email || !password || !phone) {
                return res.status(httpStatusCode.BAD_REQUEST).json({
                    success: false,
                    message: "All field are required",
                });
            }

            const existUser = await User.findOne({ email });

            if (existUser) {
                return res.status(httpStatusCode.BAD_REQUEST).json({
                    message: "Admin already exist",
                });
            }

            const salt = await bcrypt.genSalt(10);

            const hashPassword = await bcrypt.hash(password, salt);

            const userdata = new User({
                name,
                email,
                password: hashPassword,
                phone,
                role: 'farmer'
            });

            if (req.file) {

                userdata.avatar = req.file.path,
                userdata.cloudinaryid = req.file.filename
            }

            const result = await userdata.save();

            if (result) {
                return res.status(httpStatusCode.CREATED).json({
                    success: true,
                    message: "Farmer created successfully",
                    data: result,
                });
            }
        } catch (error) {
            return res.status(httpStatusCode.SERVER_ERROR).json({
                success: false,
                message: error.message,
            });
        }
    }

    async userregister(req, res) {
        try {
            const { name, email, password, phone } = req.body;

            if (!name || !email || !password || !phone) {
                return res.status(httpStatusCode.BAD_REQUEST).json({
                    success: false,
                    message: "All field are required",
                });
            }

            const existUser = await User.findOne({ email });

            if (existUser) {
                return res.status(httpStatusCode.BAD_REQUEST).json({
                    success: false,
                    message: "User already exist",
                });
            }

            const salt = await bcrypt.genSalt(10);

            const hashPassword = await bcrypt.hash(password, salt);

            const userdata = new User({
                name,
                email,
                password: hashPassword,
                phone,
                role: 'user'
            });

            if (req.file) {

                userdata.avatar = req.file.path,
                userdata.cloudinaryid = req.file.filename
            }

            const result = await userdata.save();

            if (result) {
                return res.status(httpStatusCode.CREATED).json({
                    success: true,
                    message: "User created successfully",
                    data: result,
                });
            }
        } catch (error) {
            return res.status(httpStatusCode.SERVER_ERROR).json({
                success: false,
                message: error.message,
            });
        }
    }

    async adminregister(req, res) {
        try {
            const { name, email, password, phone } = req.body;

            if (!name || !email || !password || !phone) {
                return res.status(httpStatusCode.BAD_REQUEST).json({
                    success: false,
                    message: "All field are required",
                });
            }

            const existUser = await User.findOne({ email });

            if (existUser) {
                return res.status(httpStatusCode.BAD_REQUEST).json({
                    success: false,
                    message: "Admin already exist",
                });
            }

            const salt = await bcrypt.genSalt(10);

            const hashPassword = await bcrypt.hash(password, salt);

            const userdata = new User({
                name,
                email,
                password: hashPassword,
                phone,
                role: 'admin'
            });

            if (req.file) {

                userdata.avatar = req.file.path,
                userdata.cloudinaryid = req.file.filename
            }

            const result = await userdata.save();

            if (result) {
                return res.status(httpStatusCode.CREATED).json({
                    success: true,
                    message: "Admin created successfully",
                    data: result,
                });
            }
        } catch (error) {
            return res.status(httpStatusCode.SERVER_ERROR).json({
                success: false,
                message: error.message,
            });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(httpStatusCode.BAD_REQUEST).json({
                    success: false,
                    message: "All fields are required",
                });
            }
            const existuser = await User.findOne({ email });

            if (!existuser) {
                return res.status(httpStatusCode.NOT_FOUND).json({
                    success: false,
                    message: "user not found",
                });
            }

            let isCheck = await bcrypt.compare(password, existuser.password);

            if (!isCheck) {
                return res.status(httpStatusCode.UNAUTHORIZED).json({
                    success: false,
                    message: "Invalid Credentials",
                });
            }


            const token = jwt.sign(
                {
                    id: existuser._id,
                    name: existuser.name,
                    email: existuser.email,
                    phone: existuser.phone,
                    role: existuser.role,
                },
                process.env.JWT_SECRECT,
                { expiresIn: "1h" },
            );

            return res.status(httpStatusCode.OK).json({
                success: true,
                message: "User logged in successfully",
                data: {
                    id: existuser._id,
                    name: existuser.name,
                    email: existuser.email,
                    password: existuser.password,
                    profileImage: existuser.profileImage
                },
                token: token,
            });


        } catch (error) {
            return res.status(httpStatusCode.SERVER_ERROR).json({
                success: false,
                message: error.message,
            });
        }
    }

    async getUsers(req, res) {
        try {
            const allusers = await User.find();

            if (allusers.length == 0) {

                return res.status(httpStatusCode.NOT_FOUND).json({
                    success: false,
                    message: "User not found",
                });

            }

            return res.status(httpStatusCode.OK).json({
                success: true,
                message: "All user gets successfully",
                data: allusers
            });


        } catch (error) {
            return res.status(httpStatusCode.SERVER_ERROR).json({
                success: false,
                message: error.message,
            });
        }
    }

    async getUserById(req, res) {
        try {
            const id = req.params.id;

            const existuser = await User.findById(id);

            if (!existuser) {
                return res.status(httpStatusCode.NOT_FOUND).json({
                    success: false,
                    message: "User not found",
                });

            }

            return res.status(httpStatusCode.OK).json({
                success: true,
                message: "All user gets successfully",
                data: allusers
            });


        } catch (error) {
            return res.status(httpStatusCode.SERVER_ERROR).json({
                success: false,
                message: error.message,
            });
        }
    }

}



module.exports = new UserController();
