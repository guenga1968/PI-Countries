const initialState = {
  paises: [],
  pais: {},
  mensaje:"",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SHOW_PAISES":
      return { ...state, paises: action.payload };

    case "MOSTRAR_PAIS":
      return { ...state, pais: action.payload };

    case "SEARCH_PAISES":
      return { ...state, paises: action.payload };

    case "FILTRAR_CONTINENTE":
      return { ...state, paises: action.payload};

    case "ORDENAR_NOMBRE":
      let val = action.payload;
      let orderCountry = [...state.paises];
      orderCountry =  orderCountry.sort((a,b) => {
        if(val === "ASC"){
          return a.name.localeCompare(b.name);
        }else{
          return b.name.localeCompare(a.name);
        }
      });
      return { ...state, paises: orderCountry};
     
       case "ORDENAR_POBLACION":
       let val2 = action.payload;
      let orderCountry2 = [...state.paises];
      if(val2 === "ASC"){
        orderCountry2 =  orderCountry2.sort((a,b) => {
          return a.population - b.population;
        });
      }else{
        orderCountry2 =  orderCountry2.sort((a,b) => {
          return b.population - a.population;
        });
      }
       return { ...state, paises: orderCountry2};

    case "CARGAR_ACTIVIDAD":
      return { ...state, mensaje: action.payload};

      case "FILTRAR_ACTIVIDAD":
      return { ...state, paises: action.payload};

    case "BORRAR_ESTADO":
      return { ...state, mensaje: "" };

      case 'LIMPIAR_PAIS':
      return { ...state, pais: {} };

      case "PAISES_POR_AREA":
        let val3 = [...state.paises];
        val3 = val3.filter(pais => {
          return pais.area < 10000;
        });
        return { ...state, paises: val3};

    default:
      return state;
  }
}
