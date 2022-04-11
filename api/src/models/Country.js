const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

//  País con las siguientes propiedades
// ID (Código de 3 letras) *
// Nombre *
// Imagen de la bandera *
// Continente *
// Capital *
// Subregión
// Área
// Población
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id: {
      type: DataTypes.STRING(3),
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        const valor=this.getDataValue('name');
        if(valor === "Falkland Islands"){
          return "Falkland Islands (Islas Malvinas)";
        }
        return valor;
      },
    },
    flag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    continents: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    capital: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      get() {
        const valor = this.getDataValue('capital');
        return valor ? valor : ["Sin capital"];
    },
    },
    subregion: {
      type: DataTypes.STRING,
      allowNull: true,
      get() {
        const valor = this.getDataValue('subregion');
        return valor ? valor : this.continents;
    },
    },
    area: {
      type: DataTypes.REAL,
      allowNull: true,
    },
    population: {
      type: DataTypes.BIGINT,
      allowNull: true,
      get() {
        const valor = this.getDataValue('population');
        return valor === 0 ? "Sin Datos" : valor;
      },
    },
  });
 
};
