import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { storage } from "./storage";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={storage}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
