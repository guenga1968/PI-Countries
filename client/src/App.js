import React from "react";
import "./App.css";
import Inicio from "./components/Inicio";
import Paises from "./components/Paises";
import Formulario from "./components/Formulario";
import PaisDetalle from "./components/PaisDetalle";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route exact path="/" element={<Inicio />} />
        <Route path="/home" element={<Paises />} />
        <Route path="/home/:id" element={<PaisDetalle />} />
        <Route exact path="/home/form" element={<Formulario />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
