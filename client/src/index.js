import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "antd/dist/reset.css";

import "aos/dist/aos.css"; // import AOS styles
import AOS from "aos";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { SearchProvider } from "./context/search";

const root = ReactDOM.createRoot(document.getElementById("root"));

AOS.init({
  offset: 120,
  delay: 1000,
  duration: 800,
  easing: "ease",
  once: true,
  mirror: false,
  anchorPlacement: "top-bottom",
});

root.render(
  <AuthProvider>
    <SearchProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SearchProvider>
  </AuthProvider>
);

reportWebVitals();
