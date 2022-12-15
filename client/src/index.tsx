import React from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import "./index.css";
import App from "./App";

Sentry.init({
  dsn: "https://a0387b6bb97245b78190f420f60be0b2@o4504332851609600.ingest.sentry.io/4504333838581760",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
