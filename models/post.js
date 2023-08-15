import mongoose from "mongoose";
import { Comments } from "./comment.js";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },

    desc: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },

    likes: {
        type: Number,
        default: 0,
    },

    comments: {
        type: [Comments]
    },

    created_at: {
        type: Date,
        default: Date.now()
    }
});

export const Post = mongoose.model("post", schema);