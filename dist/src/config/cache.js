"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    driver: 'redis',
    configs: {
        redis: {
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
            password: process.env.REDIS_PASS || undefined,
        },
    },
};
