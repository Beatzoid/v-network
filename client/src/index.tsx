import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import DataProvider from "./redux/store";
import axios from "axios";

axios.defaults.baseURL = process.env.BASE_URL || "http://localhost:4000";

ReactDOM.render(
    <React.StrictMode>
        <DataProvider>
            <App />
        </DataProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
