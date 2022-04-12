import React from 'react';
import{ detallePais,listarTodos, limpiarPais} from '../store/actions/index';
import { useSelector, useDispatch} from 'react-redux';
import {useParams, Link} from 'react-router-dom';
import s from './css/detalle.module.css';

export default function Pais(props) {
    const {id} = useParams();
    const dispatch = useDispatch();
   
    let pais = useSelector(state => state.pais)
    
React.useEffect(() => {
    dispatch(detallePais(id));
}, [])

function limpiar(){
    dispatch(limpiarPais());
    dispatch(listarTodos());
}

if (pais.name === undefined) {
    return (
        <div>
            <h1>Loading...</h1>
        </div>
    )
} else {
    let area = pais.area;
    let population = pais.population;
    return (
      
    <div className='pruebaFondo' style={{padding:"50px"}}>
        <div className={s.detalle} > 
            <span>{pais.id}</span>
        <img  src={pais.flag}  />
          <h2 >{pais.name}</h2>
          <label htmlFor="">Capital:</label>  <h3 > {pais.capital}</h3>
          <label htmlFor="">Continent:</label>  <h4>{pais.continents}</h4>
          <label htmlFor="">Subregion:</label>  <h4 > {pais.subregion} </h4>
         <label htmlFor="">Area:</label>  
           <h4> {area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Km2</h4> 
         <label htmlFor="">Population:</label>    
     <h4 > {population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h4> 
             <ul  >Tourism Activity:
                 { pais.tourisms.length > 0 ? pais.tourisms.map(tourism => (
                        <li key={tourism.id}>{tourism.activity}</li>
                 )): <li>No tourism activity</li>}
                
             </ul>
         </div> 
         <div className={s.regreso}>
                <Link to="/home">
             <button onClick={limpiar} >Return</button>
                </Link>
         </div>
    </div>
     
    )
        }
}