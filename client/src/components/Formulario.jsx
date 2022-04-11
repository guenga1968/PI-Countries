import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cargarActividad,borrarEstado, listarTodos } from "../store/actions";
import s from "./css/formulario.module.css";
import { Link } from "react-router-dom";

export default function Formulario() {
  const dispatch = useDispatch();
  const actRedux = useSelector((state) => state.mensaje);
  const paises = useSelector((state) => state.paises.sort((a, b) => a.name.localeCompare(b.name)));


  const [error, setError] = useState({nombre: "",duracion: "",todos:""});
  const [actividad, setActividad] = useState({
    nombre: "",
    dificultad: 1,
    duracion: "",
    temporada: "",
    paises: [],
  });
  const [lista, setLista] = useState([]);
  React.useEffect( () => {
    dispatch(borrarEstado());
     dispatch(listarTodos());
  }, []);

  function handleChange(e) {

    let { name, value} = e.target;
    if (name === "nombre") {
      value = value.toUpperCase();
      !/^[A-Za-z\u00f1\u00d1\s]+$/g.test(value) || value.length <3 ?
        setError({ ...error, nombre:"Solo se permiten letras, mínimo tres caracteres" }):
        setError({ ...error, nombre: "" });
    }
     if(name === "duracion") {
      !/^[0-9]+$/g.test(value) || value >100 ?
        setError({ ...error, duracion:"Solo se permiten numeros hasta 100" }):
        setError({ ...error, duracion: "" });   
    }
     if (e.target.selected) {
      if (!lista.includes(e.target.text)) {
        setLista([...lista, e.target.text]);
        setActividad({ ...actividad, paises: [...actividad.paises,value] });
        e.target.selected = false;
      }
    }
    setActividad({ ...actividad, [name]: value });
   if(error.todos !== ""){
    setError({...error,todos:""})
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
      error.nombre != "" ||
      error.duracion !=""
    ) {
   return setError({...error,todos:"Todos los campos son obligatorios"});

    } else {
      setError({ nombre: "", duracion: "",todos: ""});
      setActividad({...actividad, dificultad:  parseInt(actividad.dificultad)}) 
      setActividad({...actividad, duracion: parseInt(actividad.duracion)});
      dispatch(cargarActividad(actividad));
      //-------------------------------------BORRAR --------------------------------------------
      setActividad({nombre: "",dificultad: 1,duracion: "",temporada: "",paises: []});
      setLista([]); 
      document.querySelector("#formulario").reset();
    } 
  }

  function borrarPais(e) {
     setLista(lista.filter((pais) => pais !== e.target.value));
      let result = paises.find((pais) => pais.name === e.target.value);
      setActividad({ ...actividad, paises: actividad.paises.filter((pais) => pais !== result.id) });
    console.log(e.target.value, lista , actividad)
  }

  return (
    <>
    <div className="pruebaFondo">
      <form className={s.formulario} onSubmit={handleSubmit} id="formulario">

        <h1 >Cargar Actividad</h1>
        {error.todos !=="" && <span className={s.error}>{error.todos}</span>}
      
        <input className={s.input}  type="text" name="nombre"  value={actividad.nombre}
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
      
          <select className={s.select} name="select" id="paises"  >
            <option value="">Seleccione un País</option>
            {paises.map((pais) => (
              <option key={pais.id} value={pais.id} onClick={handleChange}>
                {pais.name}
              </option>
            ))}
          </select>
         
        <div>
          {lista.map((data) => (
            <button  className={s.boton} key={data} value={data}  onClick={borrarPais}>{data} </button>
          ))}
        </div>
          <input className={s.cargar} type="submit" name={"boton"} value="Cargar Actividad" />
      </form>
      
      <div className={s.regreso}>
      {actRedux && <span className={s.cargado}>{actRedux}</span>}
        <Link to="/home" > <button  >Volver</button></Link>
      </div>
    </div>
    </>
  );
}
