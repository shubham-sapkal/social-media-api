import mongoose from "mongoose";

export const connectDB = () => {

    mongoose
    .connect( process.env.MONGODB_URL,{
        dbName: "social-media"
    })
    .then( () => console.log("Database Connected!! "))
    .then( (e) => console.log("Error: " + e));

}