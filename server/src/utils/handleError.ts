import * as Sentry from "@sentry/node";
import { Response } from "express";

import logger from "./logger";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleError = (e: any, res: Response) => {
    logger.error(e);
    Sentry.captureException(e);
    return res.status(500).json({ err: e.message });
};
