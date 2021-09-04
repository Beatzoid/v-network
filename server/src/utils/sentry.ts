import * as Sentry from "@sentry/node";
import { RewriteFrames } from "@sentry/integrations";

export const initSentry = () => {
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        tracesSampleRate: 1.0,
        integrations: [
            new RewriteFrames({
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                root: global.__rootdir__
            })
        ],
        beforeSend(event, hint) {
            const error = hint?.originalException as Error;
            console.log(error);
            if (
                error.message.includes("EADDRINUSE") ||
                error.message.includes("i/o error")
            )
                return null;

            return event;
        }
    });
};
