import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cargarActividad } from "../store/actions";
import s from "./css/formulario.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Formulario() {

  const [paises, setPaises] = useState([]);
  const dispatch = useDispatch();
  React.useEffect(async () => {
    let data = await axios.get("http://localhost:3001/api/countries");
    setPaises(data.data);
  }, []);

  paises.sort((a, b) => a.name.localeCompare(b.name));

  const [actividad, setActividad] = useState({
    nombre: "",
    dificultad: 1,
    duracion: "",
    temporada: "",
    paises: [],
  });
  const [lista, setLista] = useState([]);

  const [error, setError] = useState({
    nombre: "",
    dificultad: "",
    duracion: "",
    temporada: "",
    paises: [],
    todos: "",
  });
  // patron = !/^[A-Za-z\s]+$/g.test(value)patron = !/^[0-9]+$/g.test(value);
  function handleChange(e) {
    let { name, value } = e.target;
    if (name === "nombre") {
      value = value.toUpperCase();
    }
    let patron, mensaje;
    name === "nombre"
      ? (patron = !/^[A-Za-z\u00f1\u00d1\s]+$/g.test(value))
      : (patron = !/^[0-9]+$/g.test(value));
    name === "nombre"
      ? (mensaje = "Solo se permiten letras")
      : (mensaje = "Solo se permiten numeros");
    if (name === "nombre" || name === "duracion") {
      if (patron) {
        setError({ ...error, [name]: mensaje });
      } else {
        setError({ ...error, [name]: "" });
      }
    }
    if (e.target.selected) {
      if (!actividad.paises.includes(value)) {
        setLista([...lista, e.target.text]);
        setActividad({ ...actividad, paises: [...actividad.paises, value] });
      }
    } else {
      setActividad({ ...actividad, [name]: value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      actividad.nombre === "" ||
      actividad.dificultad === "" ||
      actividad.duracion === "" ||
      actividad.temporada === "" ||
      actividad.paises.length === 0 ||
      error.nombre !== "" ||
      error.dificultad !== ""
    ) {
      setTimeout(() => {
        setError({
          todos:
            "Todos los campos son obligatorios y no deben contener errores",
        });
      }, 2000);
    } else {
      setError({ todos: "" });
      actividad.dificultad = parseInt(actividad.dificultad);
      actividad.duracion = parseInt(actividad.duracion);
      dispatch(cargarActividad(actividad));
    }
  }

  function borrarPais(e) {
    let encontrado = paises.find((item) => item.name === e.target.name);
    setActividad({
      ...actividad,
      paises: actividad.paises.filter((item) => item !== encontrado.id),
    });
    setLista(lista.filter((item) => item !== e.target.name));
  }

  return (
    <>
    <div className="pruebaFondo">
      <form  onSubmit={handleSubmit} >
        <h1 >Carga de actividades turísticas</h1>
        {error.todos && <span className="error">{error.todos}</span>}
      
        <input className={s.field} name="nombre"  type="text" value={actividad.nombre}
          placeholder="Nombre de la Actividad" onChange={handleChange}/>
        
        {error.nombre && <span>{error.nombre}</span>}
        <div className={s.field}>
          <label htmlFor="dificultad">Dificultad: {actividad.dificultad}</label>
          <input name="dificultad"  type="range" min="1"
            max="5" value={actividad.dificultad} step="1" onChange={handleChange} />
        </div>
        
         
          <input className={s.field} name="duracion" type="number" value={actividad.duracion} onChange={handleChange} 
          placeholder ="Duración de la Actividad"/>
      
        {error.duracion && <span className="error">{error.duracion}</span>}
        <div className={s.field}>
          Temporada:
          <label htmlFor="">
            <input type="radio" name="temporada" value="Verano" onClick={handleChange}/>{" "}
            Verano
          </label>
          <label htmlFor="">
            <input type="radio" name="temporada" value="Otoño" onClick={handleChange}/>{" "}
            Otoño
          </label>
          <label htmlFor="">
            <input type="radio" name="temporada" value="Invierno" onClick={handleChange}/>{" "}
            Invierno
          </label>
          <label htmlFor="">
            <input type="radio" name="temporada" value="Primavera" onClick={handleChange}/>{" "}
            Primavera
          </label>
        </div>
        <div >
          <select className={s.field} name="paises" id="paises" size={10} >
            <option value="">Seleccione un país</option>
            {paises.map((pais) => (
              <option key={pais.id} value={pais.id} onClick={handleChange}>
                {pais.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          {lista.map((data) => (
            <span key={data}> {data}
              <button name={data} onClick={borrarPais}>X</button>
            </span>
          ))}
        </div>

        <div className="enviar">
          <input className={s.btn} type="submit" name={"boton"} value="Cargar Actividad" />
        </div>
      </form>
      <div>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <button className={s.btn}>Volver</button>
        </Link>
      </div>
    </div>
    </>
  );
}
