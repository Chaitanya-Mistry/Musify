import { sendResponse, sendError } from "../Utility/responseMessage.js";
import { song as SongModel } from "../Model/Artist_Song_Model.js";
import { artist as ArtistModel } from "../Model/Artist_Song_Model.js";
// import { resolve } from "path";

// Get Sample Songs
const getSampleSongs = async (req,res) => {
    let songs;
    // Fetch all stored songs ...
    try {
        songs = await SongModel.findData({}).limit(3).populate("sung_by");
    } catch (error) {
        return sendError(res, {}, `${error}`, false, 500);
    }

    if (songs) {
        return sendResponse(res, songs, `Songs fetched successfully ...✅`, true, 200);
    } else {
        return sendError(res, {}, `No songs were uploaded ... 😕`, false, 204);
    }
}
// Get all songs
const getAllSongs = async (req, res) => {
    let songs;
    // Fetch all stored songs ...
    try {
        songs = await SongModel.findData({}).populate("sung_by");
    } catch (error) {
        return sendError(res, {}, `${error}`, false, 500);
    }

    if (songs) {
        return sendResponse(res, songs, `Songs fetched successfully ...✅`, true, 200);
    } else {
        return sendError(res, {}, `No songs were uploaded ... 😕`, false, 204);
    }
}

// Create song
const createSong = async (req, res) => {
    // const currentTimeStamp = new Date().getTime();
    const { song_name } = req.body; // Song name
    const { song_image } = req.body; // Song image
    const { song_image_type } = req.body; // Song image type
    const { song_file } = req.body; // Song file
    const { song_file_type } = req.body; // Song file type
    const { genre } = req.body; // Song genre

    // First findSongArtist Details
    let foundArtist;
    try {
        foundArtist = await ArtistModel.findOneData({ artist_name: req.body.sung_by });
    } catch (err) {
        return sendError(res, {}, `${err} while fetching artist's details`, false, 500);
    }

    // If artist has been found ...
    if (foundArtist) {
        // let songImagesDirectoryPath = resolve('Public/Song_Images'); // Song images public folder
        // let songFilesDirectoryPath = resolve('Public/Song_Files'); // Song files public folder

        // Public folder references
        // songImagesDirectoryPath = resolve(`${songImagesDirectoryPath}`, `${currentTimeStamp}_${song_image.name}`);
        // songFilesDirectoryPath = resolve(`${songFilesDirectoryPath}`, `${currentTimeStamp}_${song_file.name}`);

        // Song object
        const songObj = new SongModel({
            song_name,
            song_image,
            song_image_type,
            song_file,
            song_file_type,
            sung_by: foundArtist._id,
            genre
        });

        // // Then move songs image to the public folder ... 📁
        // await song_image.mv(songImagesDirectoryPath, function (err) {
        //     if (err) {
        //         return sendError(res, {}, `${err} while moving song's pic`, false, 500);
        //     }
        // });
        // // Then move song file to the 
        // await song_file.mv(songFilesDirectoryPath, (err) => {
        //     if (err) {
        //         return sendError(res, {}, `${err} while moving song file`, false, 500);
        //     }
        // });

        // Saving Song data to the database 
        let savedSong;
        try {
            savedSong = await songObj.saveData();
        } catch (err) {
            return sendError(res, {}, `Failed to create a song: ${err}`, false, 500);
        }

        // IF Song saved successfully update Artist sung songs ...
        try {
            await ArtistModel.findOneDataAndUpdate({ _id: foundArtist._id }, { $push: { sung_songs: savedSong._id } });
        } catch (err) {
            return sendError(res, {}, `Error while updating artist sung song list: ${err}`, false, 500);
        }
        return sendResponse(res, {}, `Song: ${songObj.song_name} created successfully`, true, 201);
    }
}

export { getAllSongs, createSong, getSampleSongs }