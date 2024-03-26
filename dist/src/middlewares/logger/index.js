"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxyLoggerMiddleware = void 0;
const proxyLoggerMiddleware = (req, res, next) => {
    console.log(`Proxy path: ${req.method} ${req.path}`);
    next();
};
exports.proxyLoggerMiddleware = proxyLoggerMiddleware;
