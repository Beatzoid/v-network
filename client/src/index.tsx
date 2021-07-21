import React from "react";
import ReactDOM from "react-dom";
import "./styles/global.css";
import App from "./App";
import DataProvider from "./redux/store";
import axios from "axios";

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

if (
    process.env.REACT_APP_ENABLE_SENTRY === "true" &&
    process.env.NODE_ENV !== "development"
)
    Sentry.init({
        dsn: process.env.REACT_APP_SENTRY_DSN,
        integrations: [new Integrations.BrowserTracing()],
        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
        normalizeDepth: 10
    });

axios.defaults.baseURL =
    process.env.REACT_APP_BASE_URL || "http://localhost:4000";

ReactDOM.render(
    <React.StrictMode>
        <DataProvider>
            <App />
        </DataProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
