"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    jwt: {
        secretKey: process.env.SECRET_KEY || 'default',
        expiresIn: '1d',
    },
};
