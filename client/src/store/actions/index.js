import axios from 'axios';

export function listarTodos(){
    return function(dispatch) {
         axios.get('http://localhost:3001/api/countries')
        .then(paises => {
            dispatch({
                type: 'SHOW_PAISES',
                payload: paises.data
            })
        })
        .catch(error => {
            console.log(error); // hacer cartel que hubo error en carga de paises
        })
    }
}
export function buscarPais(search){
    return function(dispatch) {
        axios.get('http://localhost:3001/api/countries?name=' + search)
        .then(paises => {
            dispatch({
                type: 'SEARCH_PAISES',
                payload: paises.data
            })
        })
        .catch(error => {
            console.log(error); // hacer cartel que hubo error en carga de paises
        })
    }
}

export function filtrarContinente(continent) {
  
    return function(dispatch) {
        continent === "ALL" ? continent  ='': continent = "?cont=" + continent;
        axios.get('http://localhost:3001/api/countries' + continent)
        .then(paises => {
            dispatch({
                type: 'FILTRAR_CONTINENTE',
                payload: paises.data
            })
        })
        .catch(error => {
            console.log(error); // hacer cartel que hubo error en carga de paises
        })
    }
}
export function ordenar(tipo,valor){

    return function(dispatch) {
        dispatch({
            type: 'ORDENAR',
            payload: {tipo,valor},
    })  
}
}
export function cargarActividad(objeto) {
    return function(dispatch) {
        axios.post('http://localhost:3001/api/activity', objeto)
        .then(respuesta => {
        dispatch({
            type: 'CARGAR_ACTIVIDAD',
            payload: respuesta.data.activity,
        })
    })
}
}

export function filtrarActividad(value){
    return function(dispatch) {
        
            dispatch({
                type: 'FILTRAR_ACTIVIDAD',
                payload: value
            })
    
}
}


