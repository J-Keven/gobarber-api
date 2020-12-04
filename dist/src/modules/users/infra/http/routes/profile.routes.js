"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var ensureAuthenticated_1 = __importDefault(require("@modules/users/infra/http/middlewares/ensureAuthenticated"));
var UserProfileController_1 = __importDefault(require("../controllers/UserProfileController"));
var uerProfileController = new UserProfileController_1.default();
var profileRoutes = express_1.Router();
profileRoutes.use(ensureAuthenticated_1.default);
profileRoutes.get('/', uerProfileController.show);
profileRoutes.put('/', celebrate_1.celebrate((_a = {},
    _a[celebrate_1.Segments.BODY] = {
        email: celebrate_1.Joi.string().email().required(),
        name: celebrate_1.Joi.string().required(),
        oldPassword: celebrate_1.Joi.string().optional(),
        password: celebrate_1.Joi.string().optional(),
        confirmPassword: celebrate_1.Joi.string().optional().valid(celebrate_1.Joi.ref('password')),
    },
    _a)), uerProfileController.update);
exports.default = profileRoutes;
