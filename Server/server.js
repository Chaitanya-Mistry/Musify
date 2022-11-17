import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import compression from "compression";
import cors from "cors";
import * as Validation from "./Utility/validation.js";
import * as userCntl from "./Controller/userController.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 4000; // Server PORT

// To connect to the mongodb database & start the server after connection successfully established
mongoose.connect(process.env.MongoDB_URI, { keepAlive: true }).then(() => app.listen(PORT)).then(() => {
    console.log(`Express server is running on port : ${PORT}`);
    console.log(`Express is connected to the database ...`);
});

// Middlewares
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression(9));

// API Routes

// User login
app.post("/login",Validation.loginValidation,userCntl.loginUser);
// Create user 
app.post("/createUser", Validation.validateCreateUser, userCntl.createUser);


