import React from 'react';
import axios from 'axios';
import { useDispatch} from 'react-redux';
import {useParams, Link} from 'react-router-dom';
import { listarTodos } from '../store/actions';
import s from './css/detalle.module.css';



export default function Pais(props) {
    const dispatch = useDispatch();
    const id = useParams().id;
    const [pais, setPais] = React.useState({});
    
    React.useEffect( async() => {
       let datos = await axios.get('http://localhost:3001/api/countries/' + id)
       datos.data.area = datos.data.area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
       datos.data.population = datos.data.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
       if(datos.data.tourisms.length===0) datos.data.tourisms = [{
        id: 0,   
        activity:"No tourism activities"}];
       setPais(datos.data);
    },[])
    


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
             <button  onClick={dispatch(listarTodos())}>Return</button>
                </Link>
         </div>
    </div>
        </React.Fragment>
    )
}