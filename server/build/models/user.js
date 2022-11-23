"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        index: { unique: true },
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        default: "Hey, I'm looking forward to collaborating with new fellow musicians!",
        required: true,
    },
    profilepic: {
        type: String,
        default: "./images/default.jpg",
    },
    country: {
        type: String,
        required: true,
    },
    instruments: {
        type: Array,
        default: [],
    },
    owncollabs: {
        type: [{ type: Schema.Types.ObjectId, ref: "Collab" }],
        default: [],
    },
    othercollabs: {
        type: Array,
        default: [],
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("User", UserSchema);
