
import React from "react";
import { useSelector } from "react-redux";
import Pais from "./Pais.jsx";
import Menu from "./Menu.jsx";
import s from "./css/paginado.module.css"



export default function Paises() {
  let inicio, fin;
  let paises = useSelector((state) => state.paises);

  const [paginado, setPaginado]= React.useState([...paises]);
  const[paginaActual, setPaginaActual] =React.useState(1)
  React.useEffect(() => {
    setPaginaActual(1)
    setPaginado([...paises])
  }, [paises]);

React.useEffect(()=>{
 
  if(paginaActual < 1){
    setPaginaActual(1)
  }
  if(paginaActual===1){
  inicio = (paginaActual -1) * 9;
  fin = inicio + 9;
  setPaginado(paises.slice(inicio,fin))
    
  }
  else if( paginaActual === 2){
    inicio = (paginaActual -1) * 9;
    fin = inicio + 10;
    setPaginado(paises.slice(inicio,fin))
  }else {
    inicio = (paginaActual -1) * 10;
    fin = inicio + 10;
    setPaginado(paises.slice(inicio,fin))
  }
  
},[paises,paginaActual])

let total = Math.ceil(paises.length / 10);

function paginaAnterior() {
setPaginaActual(paginaActual-1)
}

function paginaSiguiente() {
  if(paginaActual<Math.ceil(paises.length/10)){
  setPaginaActual(paginaActual+1)
 }
}

if(paises.length === 0){
  return(
    <div className="pruebaFondo" >
    <Menu />
    <div className="paises">
      <h1>Upss Not Found</h1>
    </div>
    </div>
  )
} else {

  return (
  
    <div className ="pruebaFondo">
      <Menu />
    
      <div className="paises" style={{marginTop:"5em"}}>
    {paginado.map((pais) => (
    <Pais
      key={pais.id}
      id={pais.id}
      name={pais.name}
      flag={pais.flag}
      continents={pais.continents}
      population={pais.population}
      area={pais.area}
      capital={pais.capital}
      subregion={pais.subregion}
      tourisms={pais.tourisms}
    />
  ))}
      </div>
      <div className={s.paginado}>
        <button onClick={paginaAnterior}>Previous</button>
        <span>{paginaActual + " - " + total }</span>
        <button onClick={paginaSiguiente} >Next</button>
      </div>
      </div>

  );
    }
}
