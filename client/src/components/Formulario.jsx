import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cargarActividad,borrarEstado } from "../store/actions";
import s from "./css/formulario.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Formulario() {
const actRedux = useSelector((state) => state.mensaje);


  const [paises, setPaises] = useState([]);
  const dispatch = useDispatch();

  React.useEffect( () => {
    dispatch(borrarEstado());
   axios.get("http://localhost:3001/api/countries")
      .then(res => {
    setPaises(res.data);
      })  
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
      
        setError({
          todos:
            "Todos los campos son obligatorios y no deben contener errores",
        });

    } else {
      
      setError({ todos: "" });
      setActividad({...actividad, dificultad:  parseInt(actividad.dificultad)}) 
      setActividad({...actividad, duracion: parseInt(actividad.duracion)});
      console.log(actividad);
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
      <form className={s.formulario} onSubmit={handleSubmit} >
        <h1 >Carga de actividades turísticas</h1>
        {error.todos && <span className={s.error}>{error.todos}</span>}
      
        <input className={s.input} name="nombre"  type="text" value={actividad.nombre}
          placeholder="Nombre de la Actividad" onChange={handleChange}/>
        
        {error.nombre && <span className={s.error}>{error.nombre}</span>}
        <div className={s.dificultad}>
          <label htmlFor="dificultad">Dificultad: {actividad.dificultad}</label>
          <input name="dificultad"  type="range" min="1"
            max="5" value={actividad.dificultad} step="1" onChange={handleChange} />
        </div>
        
          <input className={s.input} name="duracion" type="text" value={actividad.duracion} onChange={handleChange} 
          placeholder ="Duración de la Actividad"/>
      
        {error.duracion && <span className={s.error}>{error.duracion}</span>}
        <div className={s.temporada}>
          <label htmlFor="">Temporada</label>
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
        
          <select className={s.select} name="paises" id="paises"  >
            <option value="">Seleccione un País</option>
            {paises.map((pais) => (
              <option key={pais.id} value={pais.id} onClick={handleChange}>
                {pais.name}
              </option>
            ))}
          </select>
        
        <div>
          {lista.map((data) => (
              <button  className={s.boton} key={data} name={data} onClick={borrarPais}>{data}{" X "}</button>
          ))}
        </div>
          <input className={s.cargar} type="submit" name={"boton"} value="Cargar Actividad" />
      </form>
      <div>
        {actRedux && <span className={s.error}>Cargado Correctamente</span>}
      </div>
      <div className={s.regreso}>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <button >Volver</button>
        </Link>
      </div>
    </div>
    </>
  );
}
