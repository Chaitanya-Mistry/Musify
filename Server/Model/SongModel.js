import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "",
        required: true
    },
    email: {
        type: String,
        default: "",
        required: true,
        unique: true // `email` must be unique
    },
    password: {
        type: String,
        default: "",
        required: true,
        length:6
    },
    profilePic: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/128/1077/1077012.png" //https://www.freepik.com/free-icon/user_15334495.htm#query=default%20user&position=27&from_view=keyword
    },
    user_type:{
        type: String,
        default : "Customer"
    },
    favourite_songs : {}    
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

export default mongoose.model('user', songSchema);