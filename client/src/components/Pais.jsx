import React from 'react';
import {Link} from 'react-router-dom';

export default function Pais({id,name, flag, continents}) {
    
  return (
      
        <div className="tarjeta" > 
        <img src={flag} alt={name} className="bandera" />
        <Link to= {`/home/${id}`} className="link" >
          <h2 className="titulo">{name}</h2>
        </Link>
            <h3  >{continents}</h3> 
          
         </div>
    )
}