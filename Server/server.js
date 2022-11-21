import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import compression from "compression";
import cors from "cors";
import * as Validation from "./Utility/validation.js";
import * as userCntl from "./Controller/userController.js";
import * as artistCntl from "./Controller/artistController.js";
import { authMiddleware } from "./Middleware/authMiddleware.js";
import { logout } from "./Controller/logout.js";
import cookieParser from 'cookie-parser';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 4000; // Server PORT

// To connect to the mongodb database & start the server after connection successfully established
mongoose.connect(process.env.MONGO_URI, { keepAlive: true }).then(() => app.listen(PORT)).then(() => {
    console.log(`Express server is running on port : ${PORT}`);
    console.log(`Express is connected to the database ...`);
}).catch(error => console.log(error));

// Middlewares
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression(9));
app.use(cookieParser()); // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.

// API Routes
// Admin 🦸‍♂️
app.post("/adminLogin", Validation.loginValidation,userCntl.adminLogin);
/* USER */
app.post("/login", Validation.loginValidation, userCntl.loginUser);
app.post("/createUser", Validation.validateCreateUser, userCntl.createUser);
app.get("/logout", authMiddleware, logout);
// app.get("/myFavouriteSongs")

/* Artist */
app.post("/createArtist",/*check admin rights*/ Validation.validateCreateArtist, artistCntl.createArtist);
app.patch("/updateArtist", (req, res) => {
    res.send("Update artist API ...");
});
app.delete("/deleteArtist", (req, res) => {
    res.send("Delete artist API ...");
});

/* Song */
app.get("/getSong", (req, res) => {
    res.send("Get Song API");
})
app.post("/createSong", (req, res) => {
    res.send("Create Song API");
});
app.patch("/updateSong", (req, res) => {
    res.send("Update Song API");
});
app.delete("/deleteSong", (req, res) => {
    res.send("Delete Song API");
});



