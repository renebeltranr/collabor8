"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var index_1 = __importDefault(require("./models/index"));
var user_router_1 = __importDefault(require("./router/user.router"));
var collab_router_1 = __importDefault(require("./router/collab.router"));
var express_session_1 = __importDefault(require("express-session"));
var PORT = 3001;
var app = (0, express_1.default)();
var corsConfig = {
    origin: "http://localhost:3000",
    credentials: true,
};
app.use((0, cors_1.default)(corsConfig));
app.use(express_1.default.json());
var sid = {
    name: "sid",
    secret: "SuperSecretPassword",
    saveUninitialized: false,
    resave: false,
    cookie: {
        httpOnly: false,
        secure: false,
    },
};
app.use((0, express_session_1.default)(sid));
app.use(user_router_1.default);
app.use("/collab", collab_router_1.default);
var notFound = function (req, res) {
    res.status(404).send("404 not found");
};
app.get("*", notFound);
var serverDidntStart = function (err) {
    if (err) {
        console.log("Server couldn't start. Error: ".concat(err));
    }
    else {
        console.log("Server listening on port ".concat(PORT));
        (0, index_1.default)();
    }
};
app.listen(PORT, serverDidntStart);
