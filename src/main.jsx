import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";

import { RecoilRoot } from "recoil";

import { ThemeProvider } from "@material-tailwind/react";

import { BrowserRouter } from "react-router-dom";

import App from './App'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter> 
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);
