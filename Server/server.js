import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import compression from "compression";
import cors from "cors";
import * as Validation from "./Utility/validation.js";
import * as userCntl from "./Controller/userController.js";
import * as artistCntl from "./Controller/artistController.js";
import * as songCntl from "./Controller/songController.js";
import { authMiddleware } from "./Middleware/authMiddleware.js";
import { logout } from "./Controller/logout.js";
import cookieParser from 'cookie-parser';
import fileUpload from "express-fileupload";
import { fileURLToPath } from 'url';
import path from "path";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use(fileUpload()); // When you upload a file, the file will be accessible from req.files
// To serve public files
app.use("/Artist_Image", express.static(path.join(__dirname, "Public/Artist_Images")));
app.use("/Song_Image", express.static(path.join(__dirname, "Public/Song_Images")));

// API Routes
// Admin 🦸‍♂️
app.post("/adminTokenVerifier", userCntl.adminTokenVerifier);
app.post("/adminLogin", Validation.loginValidation, userCntl.adminLogin);
/* USER */
app.post("/login", Validation.loginValidation, userCntl.loginUser);
app.post("/createUser", Validation.validateCreateUser, userCntl.createUser);
app.get("/logout", authMiddleware, logout);
// app.get("/myFavouriteSongs")

/* Artist */
app.get("/getArtist/:artistID", artistCntl.getArtist);
app.get('/getAllArtists', authMiddleware, artistCntl.getAllArtists); // Done
app.post("/createArtist",/*check admin rights*/ Validation.validateCreateArtist, artistCntl.createArtist); // Done
app.patch("/updateArtist/:artistID", artistCntl.updateArtist);
app.delete("/deleteArtist/:artistID", artistCntl.deleteArtist);

/* Song */
app.get("/getAllSongs", authMiddleware, songCntl.getAllSongs);
app.get("/getSampleSongs", songCntl.getSampleSongs);
app.post("/createSong", Validation.validateCreateSong, songCntl.createSong);
app.patch("/updateSong", (req, res) => {
    res.send("Update Song API");
});
app.delete("/deleteSong", (req, res) => {
    res.send("Delete Song API");
});
