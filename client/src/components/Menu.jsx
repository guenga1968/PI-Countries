import React from "react";
import SearchBar from "./SearchBar.jsx";
import FilterBar from "./FilterBar.jsx";
import s from "./css/menu.module.css";

export default function Menu(){
    return(
        <div className={s.menu} >
             <div><FilterBar /></div>   
            <div><SearchBar /></div>
         
        </div>
    )
}