"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1["default"].Schema;
var UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        "default": "Hey, I'm looking forward to collaborating with new fellow musicians!",
        required: true
    },
    profilepic: {
        type: String,
        "default": "./images/default.jpg"
    },
    country: {
        type: String,
        required: true
    },
    instruments: {
        type: Array,
        "default": []
    },
    owncollabs: {
        type: [{ type: Schema.Types.ObjectId, ref: "Collab" }],
        "default": []
    },
    othercollabs: {
        type: Array,
        "default": []
    }
}, { timestamps: true });
exports["default"] = mongoose_1["default"].model("User", UserSchema);
var Users = mongoose_1["default"].model("User", UserSchema);
module.exports = Users;
