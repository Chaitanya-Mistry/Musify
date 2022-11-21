import { UserModel } from "../Model/UserModel.js";
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
            sendResponse(res, {}, `Incorrect password `, false, 400);
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
            // Generating a JWT(Json Web Token) for user 
            const token = generateToken(isAdminExists);
            sendResponse(res, { email: isAdminExists.email, name: isAdminExists.name, profilePic: isAdminExists.profilePic, user_type: isAdminExists.user_type }, `Welcome, ${isAdminExists.name} `, true, 200, token);
        }
        // If password is NOT valid and user_type is not admin
        else {
            sendResponse(res, {}, `Incorrect credentials`, false, 401);
        }
    }
}


export { createUser, loginUser, adminLogin }