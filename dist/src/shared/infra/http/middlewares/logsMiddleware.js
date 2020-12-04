"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function logsMiddleware(req, res, next) {
    console.time();
    console.log("[method]: " + req.method + " [URL]: " + req.url);
    next();
    console.timeEnd();
}
exports.default = logsMiddleware;
