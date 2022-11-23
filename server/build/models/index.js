"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var PORT = 27017;
var NAME = "collabor8";
var URI = "mongodb://127.0.0.1:".concat(PORT, "/").concat(NAME);
var db = function () {
    mongoose_1.default.connect(URI);
    mongoose_1.default.connection.once("open", function () {
        console.log("DB Service listening on port ".concat(PORT));
    });
    mongoose_1.default.connection.on("Error connecting to DB", console.error);
};
exports.default = db;
