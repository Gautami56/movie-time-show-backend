"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const webpush = require("web-push");
const port = 8443;
const routes_1 = __importDefault(require("./routes"));
const controlCorsIssue = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Replace * with the appropriate origin if you want to restrict access
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
};
const setVapidKeys = (req, res, next) => {
    const apikKeys = {
        publicKey: "BAPP3Q6SPrY0fDjzugje1gjYNJev7M1c4JeYNnTxIjy2lYX9oPKgDfujFG5skA1ph-kLDEZy3JGYD3lI6DqvS-0",
        privateKey: "0bUwmDofZWCdi2tu7CZIJi4ZPQAjevdHCgE6K4W1R5A",
    };
    webpush.setVapidDetails("mailto: gautu.pinkyar@gmail.com", apikKeys.publicKey, apikKeys.privateKey);
    next();
};
exports.default = (0, express_1.default)()
    .use(express_1.default.urlencoded({ extended: false }))
    .use((0, cookie_parser_1.default)())
    .use(controlCorsIssue)
    .use(express_1.default.json())
    .use(express_1.default.raw())
    .use(express_1.default.text())
    .use((0, compression_1.default)())
    .use(setVapidKeys)
    .use(routes_1.default);
