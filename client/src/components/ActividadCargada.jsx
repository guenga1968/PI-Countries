import React from "react";
import {useSelector} from "react-redux";

 export default function ActividadCargada(){
    const actividadCargada = useSelector((state) => state.actividades);
    return(
        <div>
            <h1>Actividad Cargada</h1>
            <p>{actividadCargada.nombre}</p>
            <p>{actividadCargada.dificultad}</p>
            <p>{actividadCargada.duracion}</p>
            <p>{actividadCargada.temporada}</p>
            <p>{actividadCargada.paises}</p>
        </div>
    )
}