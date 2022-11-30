import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    song_name: {
        type: String,
        required: true
    },
    song_image: {
        type: String,
        required: true
    },
    song_location: {
        type: String,
        required: true
    },
    sung_by: {
        type: mongoose.Schema.Types.ObjectId, // To store artist's id
        ref: 'artist',
        required: true,
    },
    genre: {
        type: String,
        required: true
    }
});

// Instance Methods 
songSchema.method({
    saveData: async function () {
        return await this.save();
    }
});

// Static methods
songSchema.static({
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

export default mongoose.model('song', songSchema);