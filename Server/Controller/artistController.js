import { sendResponse, sendError } from "../Utility/responseMessage.js";
import ArtistModel from '../Model/ArtistModel.js';
import fs from "fs";
import { resolve } from "path";

// Create Artist
const createArtist = async (req, res) => {
    // First check if artist is already exist or not 
    let isArtistExists;
    try {
        isArtistExists = await ArtistModel.findOneData({ artist_name: req.body.artist_name });
    } catch (err) {
        sendError(res, "", "Error while checking for a duplicate artist", false, 500);
    }

    // if artist is already exists 
    if (isArtistExists) {
        sendError(res, "", "Artist is already exists !", false, 409);
    } else {
        const currentTimeStamp = new Date().getTime();
        const artist_image = req.files.artist_image;
        let artistImagesDirectoryPath = resolve('Public/Artist_Images');

        artistImagesDirectoryPath = resolve(`${artistImagesDirectoryPath}`, `${currentTimeStamp}_${artist_image.name}`);

        const artistObj = new ArtistModel({
            artist_name: req.body.artist_name,
            artist_image: `${currentTimeStamp}_${artist_image.name}`,
        });

        // Saving artist's data to the database 
        try {
            await artistObj.saveData();
        } catch (err) {
            return sendError(res, {}, `Failed to create an artist: ${err}`, false, 500);
        }

        // Then move artist's image to the public folder ... 📁
        await artist_image.mv(artistImagesDirectoryPath, function (err) {
            if (err) {
                return sendError(res, {}, `${err} while moving artist's pic`, false, 500);
            }
        });

        return sendResponse(res, {}, `Artist with name: ${artistObj.email} created successfully`, true, 201);
    }
}

export { createArtist }