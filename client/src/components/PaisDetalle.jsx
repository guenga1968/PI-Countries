import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { listarTodos } from '../store/actions';

const divContenedor = {

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    
}
const tarjeta ={
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 'auto',
    height: 'auto',
    padding: '20px',
    borderRadius: '10px',
    border: '14px solid #b7b7b7',
    backgroundColor: "#b7b7b7",
    boxShadow: '2px 2px 2px #333',
    lineHeight: '1.5',
    fontSize: '1.2rem',
    color: '#333',
    textAlign: 'left',
    textDecoration: 'none',
}


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
    <div style={divContenedor}>
        <div  style={tarjeta}> 
            <p>{pais.id}</p>
        <img style={{maxWidth:"250px", maxHeight: "150px", objectFit:"cover"}} src={pais.flag} alt={pais.name}  />
          <h2 >{pais.name}</h2>
            <h3 >Capital: {pais.capital}</h3>
            <h4>Continent: {pais.continents}</h4>
            <h4 style={{color:"brown"}}>SubRegion: {pais.subregion} </h4>
            <h4>Area: {pais.area} Km2</h4>
             <h4 >Population: {pais.population}</h4>
             <ul style={{listStyle:"none", fontWeight:"bold"}} >Tourism Activity:
                 {pais.tourisms && pais.tourisms.map((activ) => {
                     return ( <li style={{color:"blue", textAlign:"center"}} key ={activ.id}>{activ.activity}</li>)
                 })}
             </ul>
         </div>
         <div>
                <Link to="/home">
             <button className='boton' style={{marginTop: "20px"}} onClick={dispatch(listarTodos())}>Return</button>
                </Link>
         </div>
    </div>
        </React.Fragment>
    )
}