import ErrorHandler from "../middlewares/error.js";

import { Post } from "../models/post.js";



export const createPost = async (req, res, next) => {

    const { title, desc } = req.body;

    try {

        const post = await Post.create({
            title,
            desc,
            user: req.user._id
        });

        // console.log(post);

        res.status(200).send({
            success: true,
            // message: "Post Created!!"
            postID: post._id,
            title: post.title,
            description: post.desc,
            createTime: post.created_at
        });

    }
    catch(error) {
        next(error)
    }

};

export const deletePost = async (req, res, next) => {

    const { id } = req.params;

    try {

        const post = Post.findById(id);

        if(!post) {
            return next(new ErrorHandler("Post Not Found", 404));
        }

        await post.deleteOne();

        res.status(200).json({
            success: true,
            message: "Post Deleted"
        });

    }
    catch(error)
    {
        next(error);
    }

}

export const likePost = async(req, res, next) => {

    const { id } = req.params;

    try {

        const post = await Post.findById(id);

        post.likes = post.likes+1;

        await post.save();

        res.status(200).json({
            success: true,
            message: "Post Liked!!"
        });

    }
    catch(error){
        next(error);
    }

}

export const unlkePost = async (req, res, next) => {

    const { id } = req.params;

    try {

        const post = await Post.findById(id);

        if(post.likes != 0)
        {
            // console.log("Post has likes")
            post.likes = post.likes - 1;
        }

        await post.save();

        res.status(200).json({
            success: true,
            message: "Post Unliked!!"
        })

    }
    catch(error) {
        next(error)
    }

}

export const addComment = async(req, res, next) => {

    const { comment } = req.body;
    const { id } = req.params;

    try {

        let post = await Post.findById(id);

        post.comments.push({
            comment
        });

        post = await post.save();

        // console.log(post);

        const commentID = post.comments.find(  (ele) => ele.comment === comment );
 
        res.status(200).json({
            success: true,
            commentID: commentID._id
        });

    }
    catch(error) {
        next(error);
    }

}


export const getPost = async(req, res, next) => {

    const { id } = req.params;

    try {

        const post = await Post.findById(id);

        if(!post)
        {
            return next(new ErrorHandler("Post Not Found!!", 404));
        }

        res.status(200).json({
            title: post.title,
            description: post.desc,
            likes: post.likes,
            comments: post.comments
        })


    }
    catch(error)
    {
        next(error);
    }

}

export const getAllPost = async(req, res, next) => {

    const id = req.user._id;

    try {

        const posts = await Post.find({
            user: id
        });

        res.status(200).json({
            posts
        });

    }
    catch(error) {
        next(error);
    }
}
