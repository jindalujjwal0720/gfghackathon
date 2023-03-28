import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./variables.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CallScreen } from "./presentation/pages/Call/CallScreen";
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/*" element={<App />} />
        <Route path="/call/:chatID" element={<CallScreen />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
