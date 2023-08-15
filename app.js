import express from 'express';
export const app = express();

// Config dotenv files
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
config({
    path: './data/config.env',
});

import cors from "cors";

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Default Route
app.get("/", (req, res) =>{
    res.send("Backend Server Is Up ..... ");
});

import userRouters from "./routes/user.js";
import postRouters from "./routes/post.js";

// User Routes
app.use("/api/", userRouters);
app.use("/api/", postRouters);