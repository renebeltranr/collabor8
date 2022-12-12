"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1["default"].Schema;
var CollabSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        "default": "My new collab",
        required: true
    },
    tracks: {
        type: Array,
        "default": [],
        required: true
    },
    pendingtracks: {
        type: Array,
        "default": [],
        required: true
    }
}, { timestamps: true });
exports["default"] = mongoose_1["default"].model("Collab", CollabSchema);
