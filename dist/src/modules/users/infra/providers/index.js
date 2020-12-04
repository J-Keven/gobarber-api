"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
var BCryptHashProviders_1 = __importDefault(require("./hashProviders/implementations/BCryptHashProviders"));
tsyringe_1.container.registerSingleton('HashProvider', BCryptHashProviders_1.default);
