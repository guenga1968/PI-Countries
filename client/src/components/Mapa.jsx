import React from "react";



export default function Mapa({nombre}) {
    let name ="https://maps.google.com/maps?q=" + nombre + "&t=k&z=4&ie=UTF8&iwloc=&output=embed"
    return(
        
        
            <div style={{position:"absolute", top:"15%",right:"20%", zIndex:"1"}} >
                <iframe width="300" height="400" id="gmap_canvas" 
                src={name} 
                frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                </div>
                
       
    
    )
}