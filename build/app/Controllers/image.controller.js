"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
        while (_) try {
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
exports.validateFile = exports.validateQuery = exports.ImageController = void 0;
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var sharp_1 = __importDefault(require("sharp"));
var ImageController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var queryObject, filePath, thumbsPath, thumbFileName, thumbFilePath, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                queryObject = {
                    file: req.query.file ? String(req.query.file) : '',
                    width: req.query.width ? String(req.query.width) : '',
                    height: req.query.height ? String(req.query.height) : ''
                };
                if (!(0, exports.validateQuery)(queryObject)) {
                    res.status(400).send('Invalid query, please make sure to follow the format: ?file=file-name&width=file-width&height=file-height');
                    return [2 /*return*/];
                }
                filePath = path.resolve(__dirname, '../../../public/', queryObject.file);
                if (!!(0, exports.validateFile)(filePath)) return [3 /*break*/, 1];
                res.status(404).send('file not found, make sure image exists in public folder');
                return [3 /*break*/, 4];
            case 1:
                thumbsPath = filePath.replace('public', 'public/thumbs');
                if (!fs.existsSync(thumbsPath)) {
                    fs.mkdirSync(thumbsPath);
                }
                thumbFileName = "thumb-".concat(queryObject.width, "-").concat(queryObject.height, "-").concat(queryObject.file);
                thumbFilePath = path.resolve(__dirname, '../../../public/thumbs/', thumbFileName);
                if (!!fs.existsSync(thumbFilePath)) return [3 /*break*/, 3];
                //create thumb file
                return [4 /*yield*/, (0, sharp_1.default)(filePath)
                        .resize(parseInt(queryObject.width), parseInt(queryObject.height))
                        .toFile(thumbFilePath)];
            case 2:
                //create thumb file
                _a.sent();
                _a.label = 3;
            case 3:
                //send thumb file
                res.sendFile(thumbFilePath);
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                res.status(500).json(err_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.ImageController = ImageController;
var validateQuery = function (query) {
    if (query.file === undefined || query.file === null || query.file === '') {
        return false;
    }
    if (query.width === undefined || query.width === null || query.width === '') {
        return false;
    }
    if (query.height === undefined || query.height === null || query.height === '') {
        return false;
    }
    return true;
};
exports.validateQuery = validateQuery;
var validateFile = function (filePath) {
    if (!fs.existsSync(filePath)) {
        return false;
    }
    return true;
};
exports.validateFile = validateFile;
