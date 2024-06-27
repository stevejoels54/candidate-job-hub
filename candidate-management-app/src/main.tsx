import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import { Provider as StoreProvider } from "react-redux";
import store from "./config/store/index.ts";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StoreProvider store={store}>
    <ConfigProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ConfigProvider>
  </StoreProvider>
);
