import { useSelector } from "react-redux";
import React from "react";
import Pais from "./Pais.jsx";
import Menu from "./Menu.jsx";
import "./css/paginado.css"



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
    <>
    <div className ="pruebaFondo"style ={{backgroundColor:"#f5f5f5"}}>
      <Menu />
      
      <div className="paises">
    {paginado.map((pais) => (
    <Pais
      key={pais.id}
      id={pais.id}
      name={pais.name}
      flag={pais.flag}
      continents={pais.continents}
      population={pais.population}
    />
  ))}
      </div>
      <div className="paginado">
        <button onClick={() => paginaAnterior()} className="botonPaginado">Anterior</button>
        <span>{"  " + paginaActual + "  " }</span>
        <button onClick={paginaSiguiente} className="botonPaginado">Siguiente</button>
      </div>
      </div>
    </>
  );
    }
}
