"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuery = void 0;
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
