"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var ForgotPasswordController_1 = __importDefault(require("../controllers/ForgotPasswordController"));
var ResetPasswordController_1 = __importDefault(require("../controllers/ResetPasswordController"));
var sendPasswordRecoveryEmailController = new ForgotPasswordController_1.default();
var resetPasswordController = new ResetPasswordController_1.default();
var passwordRoutes = express_1.Router();
passwordRoutes.post('/forgot', celebrate_1.celebrate((_a = {},
    _a[celebrate_1.Segments.BODY] = {
        email: celebrate_1.Joi.string().email().required(),
    },
    _a)), sendPasswordRecoveryEmailController.create);
passwordRoutes.post('/reset', celebrate_1.celebrate((_b = {},
    _b[celebrate_1.Segments.BODY] = {
        token: celebrate_1.Joi.string().uuid().required(),
        password: celebrate_1.Joi.string().min(6),
        confirmPassword: celebrate_1.Joi.string().valid(celebrate_1.Joi.ref('password')),
    },
    _b)), resetPasswordController.create);
exports.default = passwordRoutes;
