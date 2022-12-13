import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import MapPage from "./map/MapPage";
import React from "react";
import ReactDOM from "react-dom/client";
import Vis from "./Vis";
import reportWebVitals from "./reportWebVitals";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Vis />}></Route>
        <Route path="1" element={<MapPage />} />
      </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
