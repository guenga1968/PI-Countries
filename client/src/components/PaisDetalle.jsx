import React from 'react';
import { useSelector} from 'react-redux';
import {useParams, Link} from 'react-router-dom';
import s from './css/detalle.module.css';

export default function Pais(props) {
   
    const {id} = useParams();
   const paises = useSelector((state) => state.paises);
    const pais = paises.find((pais) => pais.id === id);

    return (
        <React.Fragment>
    <div className='pruebaFondo' style={{padding:"50px"}}>
        <div className={s.detalle} > 
            <span>{pais.id}</span>
        <img  src={pais.flag} alt={pais.name}  />
          <h2 >{pais.name}</h2>
          <label htmlFor="">Capital:</label>  <h3 > {pais.capital}</h3>
          <label htmlFor="">Continent:</label>  <h4>{pais.continents}</h4>
          <label htmlFor="">Subregion:</label>  <h4 > {pais.subregion} </h4>
         <label htmlFor="">Area:</label>   <h4> {pais.area} Km2</h4>
         <label htmlFor="">Population:</label>    <h4 > {pais.population}</h4>
             <ul  >Tourism Activity:
                 {pais.tourisms && pais.tourisms.map((activ) => {
                     return ( <li  key ={activ.id}>{activ.activity}</li>)
                 })}
             </ul>
         </div>
         <div className={s.regreso}>
                <Link to="/home">
             <button  >Return</button>
                </Link>
         </div>
    </div>
        </React.Fragment>
    )
}