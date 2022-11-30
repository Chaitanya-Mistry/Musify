import mongoose from "mongoose";

// Song Schema 🎵
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

// Artist Schema 🧑‍🎤
const artistSchema = new mongoose.Schema({
    artist_name: {
        type: String,
        required: true,
        unique: true // Artist name must be unique
    },
    artist_image: {
        type: String,
        required: true
    },
    sung_songs: [{
        type: mongoose.Schema.Types.ObjectId, // To store song's id
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

const song = mongoose.model('song', songSchema);
const artist = mongoose.model('artist', artistSchema);

export {song,artist};