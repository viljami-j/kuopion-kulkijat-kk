import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Jasenet from "Jasenet";
import Matkakohteet from "./Matkakohteet";
import OmatMatkat from "OmatMatkat";
import OmatTiedot from "./OmatTiedot";
import PorukanMatkat from "./PorukanMatkat";
import Rekisterointi from "./Rekisterointi";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/jasenet" element={<Jasenet />} />
        <Route exact path="/matkakohteet" element={<Matkakohteet />} />
        <Route exact path="/omat_matkat" element={<OmatMatkat />} />
        <Route exact path="/omat_tiedot" element={<OmatTiedot />} />
        <Route exact path="/porukan_matkat" element={<PorukanMatkat />} />
        <Route exact path="/rekisterointi" element={<Rekisterointi />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
