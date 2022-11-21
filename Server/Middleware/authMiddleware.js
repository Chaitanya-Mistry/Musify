import jwt from "jsonwebtoken";
import {UserModel} from '../Model/UserModel.js';

export const authMiddleware = async (req, res, next) => {
    let foundUser;
    try {
        const token = req.cookies.jwtoken;
        // Verify token
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        foundUser = await UserModel.findOneData({ email: verifyToken.user_email });      
    } catch (err) {
        return res.status(401).json({ message: `Unathorized : Token was not provided ..` });
    }

    if (foundUser) {
        req.rootUser = foundUser;
        req.userEmail = foundUser.email;
        next();
    } else {
        return res.status(401).json({ message: `Unathorized : Token was provided but user data is tempered ..` });
    }
}