import { sendResponse, sendError } from "../Utility/responseMessage.js";
import { artist as ArtistModel } from "../Model/Artist_Song_Model.js";
import { song as SongModel } from "../Model/Artist_Song_Model.js";
import { resolve } from "path";
import fs from "fs";

// Get Artist By ID
const getArtist = async (req, res) => {
    let foundArtist;
    try {
        foundArtist = await ArtistModel.findOneData({ _id: req.params.artistID });
    } catch (err) {
        return sendError(res, {}, `${err} while fetching artist by id`, false, 500);
    }

    if (foundArtist) {
        return sendResponse(res, foundArtist, 'Successfully found artist ✔️', true, 200);
    } else {
        return sendError(res, "", `Artist not found ...😅`, false, 500);
    }
}
// Get all Artists
const getAllArtists = async (req, res) => {
    let artists;
    // Fetch all stored artists ...
    try {
        // artists = await ArtistModel.findData({}).populate("song");
        artists = await ArtistModel.findData({});
    } catch (error) {
        return sendError(res, {}, `${error}`, false, 500);
    }

    if (artists) {
        return sendResponse(res, artists, `Artists fetched successfully ...✅`, true, 200);
    } else {
        return sendError(res, {}, `No Artists were created ... 😕`, false, 204);
    }
}
// Create Artist
const createArtist = async (req, res) => {
    // First check if artist is already exist or not 
    let isArtistExists;
    try {
        isArtistExists = await ArtistModel.findOneData({ artist_name: req.body.artist_name });
    } catch (err) {
        return sendError(res, "", "Error while checking for a duplicate artist", false, 500);
    }

    // if artist is already exists 
    if (isArtistExists) {
        return sendError(res, "", "Artist is already exists !", false, 409);
    } else {
        const artistObj = new ArtistModel({
            artist_name: req.body.artist_name,
            artist_image: req.body.artist_image,
            artist_image_type: req.body.artist_image_type
        });

        // Saving artist's data to the database 
        try {
            await artistObj.saveData();
        } catch (err) {
            return sendError(res, {}, `Failed to create an artist: ${err}`, false, 500);
        }

        return sendResponse(res, {}, `Artist with name: ${artistObj.email} created successfully`, true, 201);
    }
}

// Update Artist 
const updateArtist = async (req, res) => {
    const { artistID } = req.params; // Artist id
    const { artist_name } = req.body; // Artist name 
    const { artist_image } = req.body; // Artist name 
    const { artist_image_type } = req.body; // Artist name 

    let foundArtist;
    let updatedArtist;

    // if admin wants to update artist's image as well
    if (artist_image) {

        try {
            foundArtist = await ArtistModel.findOneData({ _id: artistID });
        } catch (err) {
            return sendError(res, {}, `${err}`);
        }

        if (foundArtist) {
            try {
                updatedArtist = await ArtistModel.findOneDataAndUpdate({ _id: artistID },
                    {
                        $set: {
                            artist_name,
                            artist_image,
                            artist_image_type
                        }
                    });
            } catch (error) {
                return sendError(res, "", `${error} while updating artist's details`, false, 500);
            }

            // Finally, IF artist's details updated successfully .. 😃
            if (updateArtist) {
                return sendResponse(res, {}, "Artist's details along with image successfully updated 👍", true, 200);
            } else {
                return sendResponse(res, {}, "Unable to update artist's details ... 😑", false, 500);
            }
        }

    }
    // if admin only wants to update artist's name
    else {
        try {
            updatedArtist = await ArtistModel.findOneDataAndUpdate({ _id: artistID }, {
                artist_name
            });

        } catch (error) {
            return sendError(res, {}, `${error} while updating artist's name`);
        }

        // IF artist's details updated successfully ..
        if (updatedArtist) {
            return sendResponse(res, {}, `Artist's detail updated successfully 👍`, true, 200);
        } else {
            return sendError(res, {}, `Unable to update artist's details 😑`, false, 500);
        }
    }
}

// Delete Artist
const deleteArtist = async (req, res) => {
    // Get ID of an artist to be deleted ...
    const { artistID } = req.params;

    let artist;
    let artist_sung_songs;
    try {
        // Delete artist
        artist = await ArtistModel.findOneAndDelete({ _id: artistID });
        // Check if he sang any song
        if (artist.sung_songs.length > 0) {
            // Then delete his sung songs 
            artist_sung_songs = artist.sung_songs;
            await SongModel.deleteMany({ _id: { $in: artist_sung_songs } }); // Delete all the songs 🔥
        }

        // // Then delete artist image as well
        // let artistImagesDirectoryPath = resolve('Public/Artist_Images');
        // const filePath = `${artistImagesDirectoryPath}/${artist.artist_image}`;
        // fs.unlinkSync(filePath); // Remove associated artist image
    } catch (error) {
        return sendError(res, {}, `${err} while deleting artist image`, false, 500);
    }

    if (artist) {
        return sendResponse(res, {}, `Artist Deleted Successfully ✔️`, true, 200);
    } else {
        return sendError(res, {}, `Unable to delete artist`, false, 500);
    }
}

export { getAllArtists, createArtist, getArtist, updateArtist, deleteArtist }