const initialState = {
  paises: [],
  mensaje:"",

};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SHOW_PAISES":
      return { ...state, paises: action.payload };

    case "SEARCH_PAISES":
      return { ...state, paises: action.payload };

    case "FILTRAR_CONTINENTE":
      return { ...state, paises: action.payload};

    case "ORDENAR_NOMBRE":
      let val = action.payload;
      let orderCountry = [...state.paises];
      orderCountry =  orderCountry.sort((a,b) => {
          if(a.name < b.name) {
            return val === "ASC" ? -1 : 1;
          } 
          if(a.name > b.name) {
            return val === "ASC" ? 1 : -1;
          }
          return 0;
        });
      return { ...state, paises: orderCountry};
     
      case "ORDENAR_POBLACION":
      let val2 = action.payload;
      let orderCountry2 = [...state.paises];
      orderCountry2 =  orderCountry2.sort((a,b) => {
          if(a.population < b.population) {
            return val2 === "ASC" ? -1 : 1;
          }
          if(a.population > b.population) {
            return val2 === "ASC" ? 1 : -1;
          }
          return 0;
        });
      return { ...state, paises: orderCountry2};

    case "CARGAR_ACTIVIDAD":
      return { ...state, mensaje: action.payload};
      case "FILTRAR_ACTIVIDAD":
      return { ...state, paises: action.payload};
    case "BORRAR_ESTADO":
      return { ...state, mensaje: "" };
    default:
      return state;
  }
}
