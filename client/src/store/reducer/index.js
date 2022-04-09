const initialState = {
  paises: [],
  mensaje: false,

};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SHOW_PAISES":
      return { ...state, paises: action.payload };

    case "SEARCH_PAISES":
      return { ...state, paises: action.payload };

    case "FILTRAR_CONTINENTE":
      return { ...state, paises: action.payload};

    case "ORDENAR":
      let orderCountry = [...state.paises];
      let tipo = action.payload.tipo;
      let val = action.payload.valor;
      if(tipo === "population"){
      orderCountry =  orderCountry.sort((a,b) => {
          if(a.population < b.population) {
            return val === "ASC" ? -1 : 1;
          } 
          if(a.population > b.population) {
            return val === "ASC" ? 1 : -1;
          }
          return 0;
        });
      }else{
       orderCountry= orderCountry.sort((a,b) => {
          if(a.name < b.name) {
            return val === "ASC" ? -1 : 1;
          } 
          if(a.name > b.name) {
            return val === "ASC" ? 1 : -1;
          }
          return 0;
        
        });
      }
      return { ...state, paises: orderCountry};

    case "CARGAR_ACTIVIDAD":
      return { ...state, mensaje: true };
      case "FILTRAR_ACTIVIDAD":
      return { ...state, paises: action.payload};
    case "BORRAR_ESTADO":
      return { ...state, mensaje: false };
    default:
      return state;
  }
}
