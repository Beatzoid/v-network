import * as Sentry from "@sentry/node";
import { RewriteFrames } from "@sentry/integrations";

export const initSentry = () => {
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        tracesSampleRate: 1.0,
        integrations: [
            new RewriteFrames({
                root: global.__rootdir__
            })
        ]
    });
};