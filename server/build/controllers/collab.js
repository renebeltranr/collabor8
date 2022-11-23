"use strict";
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
var collab_1 = __importDefault(require("../models/collab"));
var user_1 = __importDefault(require("../models/user"));
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newCollab, collab, user, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                newCollab = new collab_1.default({
                    owner: req.session.uid,
                    name: req.body.name,
                    tracks: req.body.tracks,
                });
                return [4 /*yield*/, newCollab.save()];
            case 1:
                collab = _a.sent();
                return [4 /*yield*/, user_1.default.findById(req.session.uid)];
            case 2:
                user = _a.sent();
                user === null || user === void 0 ? void 0 : user.owncollabs.push(collab._id);
                res.set({ 'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Access-Control-Allow-Credentials': true,
                    'Access-Control-Allow-Headers': 'Accept' })
                    .status(201)
                    .send(collab);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log('Controller Create error:', error_1);
                res.status(400)
                    .send({ error: error_1, message: "Could not create Collab" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var collab, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, collab_1.default.find().sort({ createdAt: -1 }).populate("owner")];
            case 1:
                collab = _a.sent();
                res.status(200).send(collab);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.log('Controller getAll error:', error_2);
                res.status(400).send({ error: error_2, message: "Could not get all Collabs" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getUserCollabs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var uid, cb, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                uid = req.params.id;
                return [4 /*yield*/, collab_1.default.find({ owner: uid })];
            case 1:
                cb = _a.sent();
                res.status(200).send(cb);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.log('Controller getUserCollabs error:', error_3);
                res.status(400).send({ error: error_3, message: "Could not get user Collabs" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getCollab = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var collabId, collab, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                collabId = req.params;
                return [4 /*yield*/, collab_1.default.find({ _id: collabId.id }).populate("owner")];
            case 1:
                collab = _a.sent();
                collab[0].owner.password = "-";
                res.status(200).send(collab);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.log('Controller getCollab error:', error_4);
                res.status(400).send({ error: error_4, message: "Could not get the Collab" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var saveTrack = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, saveresult, saveresult, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, collab_1.default.findOne({ _id: req.body.cid })];
            case 1:
                result = _a.sent();
                if (!((result === null || result === void 0 ? void 0 : result.owner.valueOf()) === req.session.uid)) return [3 /*break*/, 3];
                result === null || result === void 0 ? void 0 : result.tracks.push({
                    url: req.body.url,
                    owner: req.session.uid,
                    volume: 100,
                    username: req.body.username,
                });
                return [4 /*yield*/, (result === null || result === void 0 ? void 0 : result.save())];
            case 2:
                saveresult = _a.sent();
                res.status(201).send(saveresult);
                return [3 /*break*/, 5];
            case 3:
                result === null || result === void 0 ? void 0 : result.pendingtracks.push({
                    url: req.body.url,
                    owner: req.session.uid,
                    volume: 100,
                    username: req.body.username,
                });
                return [4 /*yield*/, (result === null || result === void 0 ? void 0 : result.save())];
            case 4:
                saveresult = _a.sent();
                res.status(201).send(saveresult);
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_5 = _a.sent();
                console.log('Controller saveTrack error:', error_5);
                res.status(400).send({ error: error_5, message: "Could not save the Collab" });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
var saveSettings = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, saveresult, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, collab_1.default.findOne({ _id: req.params.id })];
            case 1:
                result = _a.sent();
                if (!((result === null || result === void 0 ? void 0 : result.owner.valueOf()) === req.session.uid)) return [3 /*break*/, 3];
                (result === null || result === void 0 ? void 0 : result.tracks) ? result.tracks = req.body.tracks : null;
                return [4 /*yield*/, (result === null || result === void 0 ? void 0 : result.save())];
            case 2:
                saveresult = _a.sent();
                res.status(201).send(saveresult);
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_6 = _a.sent();
                console.log('Controller saveSettings error:', error_6);
                res.status(400).send({ error: error_6, message: "Could not save the settings" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var acceptTrack = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result_1, trackToDelete_1, savedResult, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                console.log("id params", req.params.id);
                console.log("body url", req.body.url);
                console.log("body id", req.body.cid);
                return [4 /*yield*/, collab_1.default.findOne({ _id: req.params.id })];
            case 1:
                result_1 = _a.sent();
                if (!((result_1 === null || result_1 === void 0 ? void 0 : result_1.owner.valueOf()) === req.session.uid)) return [3 /*break*/, 3];
                result_1 === null || result_1 === void 0 ? void 0 : result_1.pendingtracks.forEach(function (track) {
                    if (track.url === req.body.url) {
                        result_1.tracks.push(track);
                        trackToDelete_1 = track.cid;
                    }
                });
                (result_1 === null || result_1 === void 0 ? void 0 : result_1.pendingtracks) ? result_1.pendingtracks =
                    result_1.pendingtracks.filter(function (removeTrack) {
                        removeTrack != trackToDelete_1;
                        console.log("track to remove", removeTrack);
                    }) : null;
                return [4 /*yield*/, (result_1 === null || result_1 === void 0 ? void 0 : result_1.save())];
            case 2:
                savedResult = _a.sent();
                res.status(201).send(savedResult);
                return [3 /*break*/, 3];
            case 3: return [3 /*break*/, 5];
            case 4:
                error_7 = _a.sent();
                console.log('Controller acceptTrack error:', error_7);
                res.status(400).send({ error: error_7, message: "Could not accept the track" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var denyTrack = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, trackToDelete_2, savedResult, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, collab_1.default.findOne({ _id: req.params.id })];
            case 1:
                result = _a.sent();
                if (!((result === null || result === void 0 ? void 0 : result.owner.valueOf()) === req.session.uid)) return [3 /*break*/, 3];
                result === null || result === void 0 ? void 0 : result.pendingtracks.forEach(function (track) {
                    if (track.url === req.body.url) {
                        trackToDelete_2 = track.cid;
                    }
                });
                (result === null || result === void 0 ? void 0 : result.pendingtracks) ? result.pendingtracks = result.pendingtracks.filter(function (track) { return track.cid != trackToDelete_2; }) : null;
                return [4 /*yield*/, (result === null || result === void 0 ? void 0 : result.save())];
            case 2:
                savedResult = _a.sent();
                res.status(201).send(savedResult);
                return [3 /*break*/, 3];
            case 3: return [3 /*break*/, 5];
            case 4:
                error_8 = _a.sent();
                console.log('Controller denyTrack error:', error_8);
                res.status(400).send({ error: error_8, message: "Could not delete the track" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var deleteTrack = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, _a, trackToDelete_3, savedResult, error_9;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = collab_1.default.bind;
                return [4 /*yield*/, collab_1.default.findOne({ _id: req.params.id })];
            case 1:
                result = new (_a.apply(collab_1.default, [void 0, _b.sent()]))();
                if (!(result.owner.valueOf() === req.session.uid)) return [3 /*break*/, 3];
                result.tracks.forEach(function (track) {
                    if (track.url === req.body.url) {
                        trackToDelete_3 = track.username;
                    }
                });
                result.tracks = result.tracks.filter(function (track) { return track.username != trackToDelete_3; });
                return [4 /*yield*/, result.save()];
            case 2:
                savedResult = _b.sent();
                res.status(201).send(savedResult);
                return [3 /*break*/, 3];
            case 3: return [3 /*break*/, 5];
            case 4:
                error_9 = _b.sent();
                console.log('Controller deleteTrack error:', error_9);
                res.status(400).send({ error: error_9, message: "Could not delete the track" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var deleteCollab = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, result2, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                if (!(req.body.uid === req.session.uid)) return [3 /*break*/, 4];
                return [4 /*yield*/, collab_1.default.deleteOne({ _id: req.params.cid })];
            case 1:
                result = _a.sent();
                if (!(result.deletedCount === 1)) return [3 /*break*/, 3];
                return [4 /*yield*/, user_1.default.update({ _id: req.body.uid }, { $pull: { owncollabs: req.params.cid } })];
            case 2:
                result2 = _a.sent();
                if (result2.modifiedCount === 1)
                    console.log("Collab successfully deleted");
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4: throw new Error("Not authorized");
            case 5:
                res.sendStatus(201);
                return [3 /*break*/, 7];
            case 6:
                error_10 = _a.sent();
                console.log('Controller deleteCollab error:', error_10);
                res.status(400).send({ error: error_10, message: "Could not delete the Collab" });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.default = {
    create: create,
    getAll: getAll,
    getUserCollabs: getUserCollabs,
    getCollab: getCollab,
    deleteCollab: deleteCollab,
    saveTrack: saveTrack,
    acceptTrack: acceptTrack,
    denyTrack: denyTrack,
    deleteTrack: deleteTrack,
    saveSettings: saveSettings
};
