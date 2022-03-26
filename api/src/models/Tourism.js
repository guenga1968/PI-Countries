const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

// Actividad Turística con las siguientes propiedades:
// ID
// Nombre
// Dificultad (Entre 1 y 5)
// Duración
// Temporada (Verano, Otoño, Invierno o Primavera)
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('tourism', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        difficulty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 100,
            },
        },
        season: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['Verano', 'Otoño', 'Invierno', 'Primavera']],
            },
        },
    });
};
