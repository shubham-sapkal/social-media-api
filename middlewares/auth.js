import jwt from "jsonwebtoken";

import { User } from "../models/user.js";

export const isAuthenticated = async(req, res, next) => {

    const { token } = req.cookies;

    if(!token){
        return res.status(404).json({
            success: false,
            message: "login First!!"
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    req.user = await User.findById(decoded._id);

    next();

}