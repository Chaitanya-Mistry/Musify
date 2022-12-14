import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import compression from "compression";
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

// TO SERVE FRONT-END π
app.use(express.static(path.join(__dirname, "/Client/build")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/Client/build', 'index.html'));
});
// 

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression(9));
app.use(cookieParser()); // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
app.use(fileUpload()); // When you upload a file, the file will be accessible from req.files

// API Routes
// Admin π¦ΈββοΈ
app.post("/adminTokenVerifier", userCntl.adminTokenVerifier);
app.post("/adminLogin", Validation.loginValidation, userCntl.adminLogin);
/* USER */
app.post("/login", Validation.loginValidation, userCntl.loginUser);
app.post("/createUser", Validation.validateCreateUser, userCntl.createUser);
app.get("/logout", authMiddleware, logout);

// User
app.patch("/addMyFavSong/:song_id", authMiddleware, userCntl.addMyFavSong);
app.get("/myFavouriteSongs", authMiddleware, userCntl.myFavsongs);

/* Artist */
app.get("/getArtist/:artistID", artistCntl.getArtist);
app.get('/getAllArtists', artistCntl.getAllArtists); // Done
app.post("/createArtist", Validation.validateCreateArtist, artistCntl.createArtist); // Done
app.patch("/updateArtist/:artistID", artistCntl.updateArtist);
app.delete("/deleteArtist/:artistID", artistCntl.deleteArtist);

/* Song */
app.get("/getAllSongs", authMiddleware, songCntl.getAllSongs);
app.get("/getFilteredSongs/:filter", songCntl.getFilteredSongs); // Filter Songs 
app.get("/getSampleSongs", songCntl.getSampleSongs);
app.post("/createSong", Validation.validateCreateSong, songCntl.createSong);
app.patch("/updateSong", (req, res) => {
    res.send("Update Song API");
});
app.delete("/deleteSong", (req, res) => {
    res.send("Delete Song API");
});
