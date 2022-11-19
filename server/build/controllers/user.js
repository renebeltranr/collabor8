"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
var user_1 = __importDefault(require("../models/user"));
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, user, hash, newUser, user_2, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, user_1.default.findOne({ username: username })];
            case 1:
                user = _b.sent();
                if (user)
                    return [2 /*return*/, res
                            .status(409)
                            .send({ error: "409", message: "User already exists" })];
                _b.label = 2;
            case 2:
                _b.trys.push([2, 5, , 6]);
                if (password === "")
                    throw new Error();
                return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
            case 3:
                hash = _b.sent();
                newUser = new user_1.default(__assign(__assign({}, req.body), { password: hash }));
                return [4 /*yield*/, newUser.save()];
            case 4:
                user_2 = _b.sent();
                req.session.uid = user_2._id;
                res.status(201).send(user_2);
                return [3 /*break*/, 6];
            case 5:
                error_1 = _b.sent();
                console.log(error_1);
                res.status(400).send({ error: error_1, message: "Could not create user" });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, user, validatedPass, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, user_1.default.findOne({ username: username })];
            case 1:
                user = _b.sent();
                if (!(user !== null)) return [3 /*break*/, 3];
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
            case 2:
                validatedPass = _b.sent();
                if (!validatedPass)
                    throw new Error();
                _b.label = 3;
            case 3:
                if (user !== null)
                    req.session.uid = user._id;
                res.status(200).send(user);
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                res
                    .status(401)
                    .send({ error: "401", message: "Username or password is incorrect" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var profile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_1.default.findOne({ username: req.params.username })];
            case 1:
                user = _b.sent();
                res.status(200).send(user);
                return [3 /*break*/, 3];
            case 2:
                _a = _b.sent();
                res.status(404).send({ error: Error, message: "User not found" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var profileUpdate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uid, dataToUpdate, result, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                uid = req.params.id;
                if (!(uid === req.body._id)) return [3 /*break*/, 2];
                dataToUpdate = {};
                if (req.body.country)
                    dataToUpdate.country = req.body.country;
                if (req.body.bio)
                    dataToUpdate.bio = req.body.bio;
                return [4 /*yield*/, user_1.default.findOneAndUpdate({ _id: uid }, dataToUpdate, {
                        new: true,
                    })];
            case 1:
                result = _a.sent();
                if (result !== null)
                    result.password = undefined;
                res.status(201).send(result);
                return [3 /*break*/, 3];
            case 2: throw new Error();
            case 3: return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                console.log(error_3);
                res.status(400).send({ error: error_3, message: "Error updating profile" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var me = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _id, username, country, bio, owncollabs, user;
    return __generator(this, function (_b) {
        try {
            _a = req.user, _id = _a._id, username = _a.username, country = _a.country, bio = _a.bio, owncollabs = _a.owncollabs;
            user = { _id: _id, username: username, country: country, bio: bio, owncollabs: owncollabs };
            res.status(200).send(user);
        }
        catch (_c) {
            res.status(404).send({ error: Error, message: "User not found" });
        }
        return [2 /*return*/];
    });
}); };
var logout = function (req, res) {
    req.session.destroy(function (error) {
        if (error) {
            res
                .status(500)
                .send({ error: error, message: "Could not log out, please try again" });
        }
        else {
            res.clearCookie("sid");
            res.status(200).send({ message: "Logout successful" });
        }
    });
};
exports.default = { create: create, login: login, profile: profile, me: me, logout: logout, profileUpdate: profileUpdate };
