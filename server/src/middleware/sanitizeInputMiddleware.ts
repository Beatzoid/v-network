import { NextFunction, Request, Response } from "express";

import { sanitizeInput } from "../utils/sanitizeInput";

export const sanitizeInputMW = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    sanitizeInput(req.body);
    next();
};
