"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
var mail_1 = __importDefault(require("@config/mail"));
var EtherealMailProvider_1 = __importDefault(require("./implementations/EtherealMailProvider"));
var SESMailProvider_1 = __importDefault(require("./implementations/SESMailProvider"));
var providers = {
    ethereal: tsyringe_1.container.resolve(EtherealMailProvider_1.default),
    ses: tsyringe_1.container.resolve(SESMailProvider_1.default),
};
tsyringe_1.container.registerInstance('SendEmail', providers[mail_1.default.driver]);
