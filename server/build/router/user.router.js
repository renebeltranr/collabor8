"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_1 = __importDefault(require("./../controllers/user"));
var auth_1 = __importDefault(require("./../middlewares/auth"));
var router = (0, express_1.Router)();
router.post("/register", user_1.default.create);
router.post("/login", user_1.default.login);
router.get("/me", auth_1.default, user_1.default.me);
router.get("/profile/:username", user_1.default.profile);
router.post("/logout", auth_1.default, user_1.default.logout);
router.put("/profileupdate/:id", auth_1.default, user_1.default.profileUpdate);
exports.default = router;
