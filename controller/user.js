import bcrypt from "bcrypt";
import { User } from "../models/user.js"
import { sendToken } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";


export const login = async(req, res, next) => {

    try{
        const {email, password} = req.body;

        const user = await User.findOne({email}).select("+password");

        if(!user) {
            return next(new ErrorHandler("Invalid Email Or Password", 400));
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return next(new ErrorHandler("Invalid Email or Password", 404));
        }

        sendToken(user, res, `Welcome Back, ${user.username}`, 200);


    } catch(error) {
        next(error);
    }

};

export const register = async(req, res, next) => {

    try {
        const {username, email, password} = req.body;

        let user = await User.findOne({email});
        
        if(user) {
            return next(new ErrorHandler("User Already Exits"));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        sendToken(user, res, "Registered Successfully!", 201);
    }
    catch(error) {
        next(error);
    }

};


export const getProfile = (req, res) => {

    try {
          
        res
        .status(200)
        .json({
            success: true,
            user: req.user
        })    
    
    }
    catch(error) {
        next(error);
    }

};

export const follow = async (req, res, next) => {

    try{

        const { id } = req.params;

        const user = await User.findById(id);

        if(!user)
        {
            return next(new ErrorHandler("User Not Found!!"));
        }

        // update follower of other
        user.followers.push(req.user._id);
        user.followersCount = user.followersCount+1;

        await user.save();

        // update following of self

        const user2 = await User.findById(req.user._id);

        user2.following.push(id);
        user2.followingCount = user.followingCount+1;

        await user2.save();

        res.status(200).json({
            success: true,
            message: "Follower Added!!"
        });

    }
    catch(error) {
        next(error);
    }


};


export const unfollow = async (req, res, next) => {

    try{

        const { id } = req.params;

        const user = await User.findById(id);

        if(!user)
        {
            return next(new ErrorHandler("User Not Found!!"));
        }

        // update follower of other
        let index = user.followers.indexOf(req.user._id);
        if(index >= 0){
            user.followers.splice(index, 1);
            user.followersCount = user.followersCount-1;
        }

        await user.save();

        // update following of self

        const user2 = await User.findById(req.user._id);

        index = user2.following.indexOf(id);
        if(index >= 0){
            user2.following.splice(index, 1);
            user2.followingCount = user2.followingCount-1;
        }

        await user2.save();

        res.status(200).json({
            success: true,
            message: "Follower Removed!!"
        });

    }
    catch(error) {
        next(error);
    }

};