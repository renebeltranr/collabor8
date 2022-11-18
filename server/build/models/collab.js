"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var CollabSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        default: "My new collab",
        required: true,
    },
    tracks: {
        type: Array,
        default: [],
        required: true,
    },
    pendingtracks: {
        type: Array,
        default: [],
        required: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Collab", CollabSchema);
