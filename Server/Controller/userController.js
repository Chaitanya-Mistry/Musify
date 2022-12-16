import { UserModel } from "../Model/UserModel.js";
import { song as SongModel } from "../Model/Artist_Song_Model.js";
import { sendResponse, sendError } from "../Utility/responseMessage.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Token generation goes here 
const generateToken = ({ email }) => {
    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    const token = jwt.sign({ user_email: email }, jwtSecretKey);
    return token;
}

// Create user / Sign UP
const createUser = async (req, res) => {
    // First check if user is already exist or not 
    let isUserExists;
    try {
        isUserExists = await UserModel.findOneData({ email: req.body.email })
    } catch (err) {
        sendError(res, "", "Error while checking for a duplicate user", false, 500);
    }

    // if user is already exists 
    if (isUserExists) {
        sendError(res, "", "You are already registered , please login ...", false, 200);
    } else {
        // Hash User's Password ... 
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);

        const userObj = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            user_type: req.body.user_type || "Customer"
        });

        try {
            // Saving user data to the database 
            await userObj.saveData();
        } catch (err) {
            return sendError(res, {}, `Failed to create a user: ${err}`, false, 500);
        }

        return sendResponse(res, {}, `User with email: ${userObj.email} created successfully`, true, 201);
    }
}

// Log in 
const loginUser = async (req, res) => {

    const { email, password } = req.body;

    // Find user 
    const isUserExists = await UserModel.findOneData({ email });

    // if user is not exists
    if (!isUserExists) {
        return sendError(res, {}, `Invalid credentials , you first need to register`, false, 401);
    } else {
        // Password comparison of that particular user ... 
        const isValidPassword = bcrypt.compareSync(password, isUserExists.password);

        // IF password is valid 
        if (isValidPassword) {
            // Generating a JWT(Json Web Token) for user 
            const token = generateToken(isUserExists);
            sendResponse(res, { email: isUserExists.email, name: isUserExists.name, profilePic: isUserExists.profilePic, user_type: isUserExists.user_type }, `Welcome, ${isUserExists.name} `, true, 200, token);
        }
        // If password is NOT valid 
        else {
            return sendError(res, {}, `Incorrect password `, false, 401);
        }
    }
}

// Admin log in
const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    // Find admin 
    const isAdminExists = await UserModel.findOneData({ email });

    // if user is not exists
    if (!isAdminExists) {
        return sendError(res, {}, `Invalid credentials`, false, 401);
    } else {
        // Password comparison of that particular user ... 
        const isValidPassword = bcrypt.compareSync(password, isAdminExists.password);
        // User type
        const userType = isAdminExists.user_type;
        // IF password is valid and user type = "ADMIN"
        if (isValidPassword && userType === "Admin") {
            // Generating a JWT(Json Web Token) for admin 
            const token = generateToken(isAdminExists);
            return sendResponse(res, { email: isAdminExists.email, name: isAdminExists.name, user_type: isAdminExists.user_type }, `Welcome, ${isAdminExists.name}`, true, 200, token);
        }
        // If password is NOT valid and user_type is not admin
        else {
            return sendError(res, {}, `Incorrect credentials`, false, 401);
        }
    }
}

// Admin token verifier
const adminTokenVerifier = async (req, res) => {
    let foundAdmin;
    try {
        const token = req.cookies.jwtokenn;
        // Verify token
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        foundAdmin = await UserModel.findOneData({ email: verifyToken.user_email });
    } catch (err) {
        res.clearCookie('jwtokenn'); // Delete associated cookie ...
        return sendError(res, {}, `Unauthorized 🔴`, false, 401);
    }

    if (foundAdmin && foundAdmin.user_type === "Admin") {
        return sendResponse(res, { email: foundAdmin.email, name: foundAdmin.name }, `Admin is verified ✔️`, true, 200);
    } else {
        res.clearCookie('jwtokenn'); // Clear associated cookie ...
        return sendError(res, {}, `Unauthorized 🔴`, false, 401);
    }
}

// My Fav song playlist
const addMyFavSong = async (req, res) => {
    const { song_id } = req.params; // Song id
    try {
        await UserModel.findOneDataAndUpdate({ email: req.userEmail }, { $push: { favourite_songs: song_id} });
    } catch (err) {
        return sendError(res, {}, `Error while updating user's favourite song list: ${err}`, false, 500);
    }
    return sendResponse(res, {}, ``, true, 201);


}

// Show Fav Songs
const myFavsongs = async (req,res) => {
    let data;
    try {
       data = await UserModel.findOneData({ email: req.userEmail }).populate("favourite_songs");
    } catch (err) {
        return sendError(res, {}, `Error while fetching user's favourite song list: ${err}`, false, 500);
    }
    return sendResponse(res, data, ``, true, 200);
}
export { createUser, loginUser, adminLogin, adminTokenVerifier, addMyFavSong, myFavsongs }