const { Router } = require('express');
const { Op } = require('sequelize');
const axios = require('axios');
const { Country, Tourism } = require('../db');

const router = Router();
let primeraCarga = false;
async function guardar() {
    let pregunta = axios.get('https://restcountries.com/v2/all')
    try {
        let respuesta = await pregunta;
        let paises = respuesta.data.map(async (pais) => {
            return await Country.create({
                id: pais.alpha3Code,
                name: pais.translations.es,
                flag: pais.flag,
                continent: pais.region,
                capital: pais.capital,
                subregion: pais.subregion,
                area: pais.area,
                population: pais.population,
            })
        })
        primeraCarga = true;
        return paises
    } catch (err) {
        return 'Algo salió mal, vuelva a intentarlo'
    }
};


router.get("/", async function (req, res) {
    if (!primeraCarga) {
    let carga=   await guardar();
      return  res.json(carga)
        
    } else {
        
        if (!req.query.nombre) {
            let paisesDb = await Country.findAll({ 
                atributes: ['id', 'name', 'flag', 'continent', 'capital', 'subregion', 'area', 'population'],
            })
            return res.json(paisesDb)
        } else {
            let paisQuery = await Country.findAll({
                where: {
                    name: {
                     [Op.iLike]: `%${req.query.nombre}%`,
                }
            }
            })
           if(paisQuery.length === 0){
               return res.json({msg: 'No se encontraron resultados'})
           } else {
                return res.json(paisQuery)
           }
        }
    }
});


router.get('/:idPais', async function (req, res) {
    const { idPais } = req.params;
    let pais = await Country.findOne({
        where: {
            id: idPais
        }
    })
    if (pais !== null) {
        return res.json(pais)
    } else {
        res.json({msg:'Pais no Encontrado'})
    }

});

module.exports = router;
