import type { Request, Response, NextFunction } from "express";

export const proxyLoggerMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(`Proxy path: ${req.method} ${req.path}`);
    next();
};