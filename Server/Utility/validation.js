import yup from "yup";
import { sendError } from "./responseMessage.js";
import jwt from "jsonwebtoken";

// Create User
const validateCreateUser = async (req, res, next) => {
    const userObjSchema = yup.object().shape({
        name: yup.string().required(),
        password: yup.string().required().length(6),
        email: yup.string().email().required(),
    });

    await validate(userObjSchema, req.body, res, next);
}

// User Login
const loginValidation = async (req, res, next) => {
    const loginSchema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required()
    });

    await validate(loginSchema, req.body, res, next);
}

// Validate 
const validate = async (schema, reqData, res, next) => {
    try {
        await schema.validate(reqData, { abortEarly: false });
        next();
    } catch (e) {
        const errors = e.inner.map(({ path, message, value }) => ({
            path,
            message,
            value
        }));
        sendError(res, errors, "Invalid user data");
    }
}

export {
    validateCreateUser,
    loginValidation,
    // logoutValidation,
}