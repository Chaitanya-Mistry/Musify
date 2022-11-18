import { sendResponse, sendError } from "../Utility/responseMessage.js";
import ArtistModel from '../Model/ArtistModel.js';

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
        sendError(res, "", "Artist is already exists !", false, 200);
    } else {       

        const artistObj = new ArtistModel({
            artist_name: req.body.artist_name,
            artist_image: req.body.email,         
        });

        try {
            // Saving artist's data to the database 
            await artistObj.saveData();
        } catch (err) {
            return sendError(res, {}, `Failed to create an artist: ${err}`, false, 500);
        }

        return sendResponse(res, {}, `Artist with name: ${artistObj.email} created successfully`, true, 201);
    }
}

export {createArtist}