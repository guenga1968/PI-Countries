import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listarTodos } from "../store/actions";
import "./css/Inicio.css";


export default function Inicio() {
  const paises = useSelector((state) => state.paises);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(listarTodos());
  }, []);
  
  return (
    <>
    <div className="imagenFondo">
      <Link to="/home" style={{textDecoration:"none"}}>
        
          <div className="box" >
          <h1 >Countries Information</h1>
          <p style={{color:"white"}}>Click to Continue</p>
          </div>
     
      </Link>
      </div>
    </>
  );
}
