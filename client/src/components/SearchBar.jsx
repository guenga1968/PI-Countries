import s from "./css/menu.module.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { buscarPais } from "../store/actions/index.js";


export default function SearchBar() {
  
  const [search, setSearch] = useState("");
  let dispatch = useDispatch();

  function envioForm(e) {
    e.preventDefault();
    dispatch(buscarPais(search));
  }

  function onInputChange(e) {
    setSearch(e.target.value);
  }

  return (
    <React.Fragment>
      <form onSubmit={envioForm} className={s.menu}>
        <input type="text" placeholder="Search..." className="input" onChange={onInputChange} value={search}/>
        <input type="submit" value="Search" />
      </form>
     
    </React.Fragment>
  );
}
