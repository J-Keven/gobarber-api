"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var ensureAuthenticated_1 = __importDefault(require("@modules/users/infra/http/middlewares/ensureAuthenticated"));
var ProvidersController_1 = __importDefault(require("../controllers/ProvidersController"));
var ProvidersMonthAvailabilityController_1 = __importDefault(require("../controllers/ProvidersMonthAvailabilityController"));
var ProvidersDayAvailabilityController_1 = __importDefault(require("../controllers/ProvidersDayAvailabilityController"));
var listProviders = express_1.Router();
listProviders.use(ensureAuthenticated_1.default);
var listProvidersController = new ProvidersController_1.default();
var providersDayAvailabilityController = new ProvidersDayAvailabilityController_1.default();
var providersMonthAvailabilityController = new ProvidersMonthAvailabilityController_1.default();
listProviders.get('/', listProvidersController.index);
listProviders.get('/:provider_id/month-availability', celebrate_1.celebrate((_a = {},
    _a[celebrate_1.Segments.QUERY] = {
        month: celebrate_1.Joi.number().required(),
        year: celebrate_1.Joi.number().required(),
    },
    _a)), providersMonthAvailabilityController.index);
listProviders.get('/:provider_id/day-availability', celebrate_1.celebrate((_b = {},
    _b[celebrate_1.Segments.QUERY] = {
        day: celebrate_1.Joi.number().required(),
        month: celebrate_1.Joi.number().required(),
        year: celebrate_1.Joi.number().required(),
    },
    _b)), providersDayAvailabilityController.index);
exports.default = listProviders;
