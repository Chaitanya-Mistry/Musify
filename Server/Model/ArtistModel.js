import mongoose from "mongoose";
// import song from "./SongModel.js";

const artistSchema = new mongoose.Schema({
    artist_name: {
        type: String,
        required: true,
        unique:true // Artist name must be unique
    },
    artist_image: {
        type: String,
        required: true
    },
    sung_songs: [{
        type: mongoose.Types.ObjectId, // To store song's id
        ref: 'song',
        required: true,
    }],
    total_listeners: [{
        type: mongoose.Types.ObjectId, // To store users's id
        ref: "user",
        required: true,
    }]
});

// Instance Methods 
artistSchema.method({
    saveData: async function () {
        return await this.save();
    }
});

// Static methods
artistSchema.static({
    findData: function (findObj) {
        return this.find(findObj);
    },
    findOneData: function (findOneObj) {
        return this.findOne(findOneObj);
    },
    findOneDataAndUpdate: function (findObj, updateObj) {
        return this.findOneAndUpdate(findObj, updateObj, {
            upsert: true,
            setDefaultsOnInsert: true,
            new: true // To return modified document ...
        });
    }
});

export default mongoose.model('artist', artistSchema);