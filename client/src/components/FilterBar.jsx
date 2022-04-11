import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { filtrarContinente, ordenarNombre, ordenarPoblacion, filtrarActividad } from "../store/actions";
import { Link } from "react-router-dom";
import s from "./css/filter.module.css";

var continente = [];
export default function FilterBar() {
  const paises = useSelector((state) => state.paises);
  const [paisAct, setPaisAct] = React.useState(paises);
  const [act, setAct] = React.useState([]);
  const dispatch = useDispatch();

  var pruebaAct=[...paises];

  React.useEffect(async () => {
    pruebaAct = paises.filter(pais => pais.tourisms.length > 0).map(pais => pais.tourisms.map(a => a.activity));
    pruebaAct = [...new Set(pruebaAct.flat())];
    setAct(pruebaAct);
    
  }, [paises]);

  if (continente.length === 0) {
    continente = paises.map((pais) => pais.continents);
    continente = [...new Set(continente.flat())];
  }

  function selectCont(e) {
    dispatch(filtrarContinente(e.target.value));
  }
  function ordenP(e) {
    dispatch(ordenarPoblacion(e.target.value));
   e.target.value = "";
  }
  function ordenN(e) {
    dispatch(ordenarNombre(e.target.value));
    e.target.value = "";
  }
  
  function porActividad(e) {
    let prueba
    prueba = paises.filter(p => p.tourisms.map(a => a.activity).includes(e.target.value));
    dispatch(filtrarActividad(prueba));
     e.target.value = "";
  }

  return (
    <React.Fragment>
      <div className={s.barra}>
        <select name="contFilter" id="contFilter" >
          <option value="">Select a continent</option>
          <option value="ALL" onClick={selectCont}>
            All
          </option>
          {continente.sort().map((cont) => {
            return (
              <option key={cont} value={cont} onClick={selectCont}>
                {cont}
              </option>
            );
          })}
        </select>
        <select name="filterAct" id="filterAct" >
          <option value="">Select an activity</option>
          {act.sort().map((actividad) => {
            return (
              <option key={actividad} value={actividad} onClick={porActividad}>
                {actividad}
              </option>
            );
          })}
        </select>

        <select name="name" id="order" onChange={ordenN} >
          <option value="">Order by Name</option>
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
        <select name="population" id="order2" onChange={ordenP} >
          <option value="">Order by Poupulation</option>
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
        <Link to="/home/form">
          {" "}
          <button >Charge Activity</button>
        </Link>
      </div>
    </React.Fragment>
  );
}
