"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var cors_1 = __importDefault(require("cors"));
require("express-async-errors");
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
var logsMiddleware_1 = __importDefault(require("@shared/infra/http/middlewares/logsMiddleware"));
var routes_1 = __importDefault(require("@shared/infra/http/routes"));
var upload_1 = __importDefault(require("@config/upload"));
var rateLimiterMiddleware_1 = __importDefault(require("./middlewares/rateLimiterMiddleware"));
require("@shared/container");
require("@shared/infra/typeorm");
var app = express_1.default();
app.use(rateLimiterMiddleware_1.default);
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(logsMiddleware_1.default);
app.use('/files', express_1.default.static(upload_1.default.uploadPath));
app.use(routes_1.default);
app.use(celebrate_1.errors());
app.use(function (err, req, res, _) {
    console.log(err);
    if (err instanceof AppError_1.default) {
        return res.status(err.statusCode).json({
            status: 'Error',
            message: err.message,
        });
    }
    return res.status(500).json({
        status: 'Error',
        message: 'Intarnal server error',
    });
});
var PORT = process.env.PORT || 3333;
app.listen(PORT, function () {
    console.log("\uD83D\uDE80  server Started in http://localhost:" + PORT);
});
