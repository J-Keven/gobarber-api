"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var celebrate_1 = require("celebrate");
var ensureAuthenticated_1 = __importDefault(require("@modules/users/infra/http/middlewares/ensureAuthenticated"));
var upload_1 = __importDefault(require("@config/upload"));
var UsersController_1 = __importDefault(require("../controllers/UsersController"));
var UsersAvatarController_1 = __importDefault(require("../controllers/UsersAvatarController"));
var usersController = new UsersController_1.default();
var usersAvatarController = new UsersAvatarController_1.default();
var usersRoutes = express_1.Router();
var upload = multer_1.default({
    storage: upload_1.default.multer,
});
usersRoutes.post('/', celebrate_1.celebrate((_a = {},
    _a[celebrate_1.Segments.BODY] = {
        email: celebrate_1.Joi.string().email().required(),
        name: celebrate_1.Joi.string().required(),
        password: celebrate_1.Joi.string().required().min(6),
    },
    _a)), usersController.create);
usersRoutes.patch('/avatar', upload.single('avatar'), ensureAuthenticated_1.default, usersAvatarController.update);
exports.default = usersRoutes;
