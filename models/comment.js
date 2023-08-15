import mongoose from "mongoose";

export const Comments = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    }
});

// export const Comments = mongoose.model("comment", schema);