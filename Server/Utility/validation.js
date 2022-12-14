import yup from "yup";
import { sendError } from "./responseMessage.js";
import jwt from "jsonwebtoken";

// Create User
const validateCreateUser = async (req, res, next) => {

    const userObjSchema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required().length(6),
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

// Create Artist Validation
const validateCreateArtist = async (req, res, next) => {
    const artistObjSchema = yup.object().shape({
        artist_name: yup.string().required(),
        artist_image: yup.string().required(),
        artist_image_type: yup.string().required(),
    });
    await validate(artistObjSchema, { artist_name: req.body.artist_name, artist_image: req.body.artist_image, artist_image_type: req.body.artist_image_type }, res, next);
}

// Create Song Validation
const validateCreateSong = async (req, res, next) => {
    const songObjSchema = yup.object().shape({
        song_name: yup.string().required(),
        song_image: yup.string().required(),
        song_file: yup.string().required(),
        sung_by: yup.string().required(),
        genre: yup.string().required(),
    });
    await validate(songObjSchema, { song_name: req.body.song_name, song_image: req.body.song_image, song_file: req.body.song_file, sung_by: req.body.sung_by, genre: req.body.genre }, res, next);
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
    validateCreateArtist,
    validateCreateSong
    // logoutValidation,
}