import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import compression from "compression";
import cors from "cors";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 4000; // Server PORT

// To connect to the mongodb database & start the server after connection successfully established
mongoose.connect(process.env.MongoDB_URI,{keepAlive:true}).then(()=>app.listen(PORT)).then(()=>{
    console.log(`Express server is running on port : ${PORT}`);
    console.log(`Express is connected to the database ...`);
});

// Middlewares
app.use(cors({
    origin: 'http://localhost:3000',
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(compression(9));

// Routes

// GET Requests
app.get("/",(req,res)=>{
    res.send("I am working perfectly....🔥");
})
// POST Requests
// app.post("/login",(req,res)=>{
//     res
// })

// Update Requests

// Delete Requests


