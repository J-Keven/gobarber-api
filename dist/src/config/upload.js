"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var crypto_1 = __importDefault(require("crypto"));
var path_1 = require("path");
var filePath = path_1.resolve(__dirname, '..', '..', 'tmp');
exports.default = {
    driver: process.env.STORAGE_DRIVER,
    tempPath: filePath,
    uploadPath: path_1.resolve(filePath, 'uploads'),
    multer: multer_1.default.diskStorage({
        destination: filePath,
        filename: function (req, file, cb) {
            var hash = crypto_1.default.randomBytes(8).toString('hex');
            var fileHash = hash + "-" + file.originalname;
            return cb(null, fileHash);
        },
    }),
    configs: {
        disk: {},
        s3: {
            bucket: 'my-app-gobarber1234',
        },
    },
};
