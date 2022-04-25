"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var image_controller_1 = require("../Controllers/image.controller");
exports.router = express_1.default.Router();
//make get router on / that have query of file, width, height
exports.router.get('/', image_controller_1.ImageController);
