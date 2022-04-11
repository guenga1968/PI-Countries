const { Router } = require("express");
const { Op } = require("sequelize");
const axios = require("axios");
const { Country, Tourism} = require("../db");


const router = Router();

router.get("/", async (req, res,next) => {

    try {
      if ( req.query.name || req.query.cont) {
        let paises = await Country.findAll({
          include: [
            {
              model: Tourism,
            },
          ],
          where: {
            [Op.or]: [
              { name: { [Op.iLike]: `%${req.query.name}%` } },
              { continents: [req.query.cont] }
            ]
          },
        });
        return res.json(paises);
      } 
  let pregunta = await Country.findAll({
    include: [ {model: Tourism}],
  })
  if(pregunta.length > 0) {
  return  res.json(pregunta)
  }else {
    let carga = await axios.get(' https://restcountries.com/v3/all')
    let cargados = carga.data.map(async (pais) => {
    return  await Country.create({
        id: pais.cca3,
        name: pais.name.common,
        flag: pais.flags[0],
        capital: pais.capital,
        continents: pais.continents,
        subregion: pais.subregion,
        population: pais.population,
        area: pais.area,
      });
    })
    return res.json(cargados);
  }
    } catch (error) {
      next(error)
    }
} );

router.get("/:idPais", async function (req, res, next) {
  const { idPais } = req.params;
  try {
  let pais = await Country.findByPk(idPais, {
    include: [
      {model: Tourism},],
        });
  return res.json(pais);
   
  } catch (error) {
    next(error)
  }
})
/* SIN USAR 
router.post("/", async function (req, res, next) {
  const { idPais, idActividad } = req.body;
  try {
    let pais = await Country.findByPk(idPais);
    await pais.addTourism(idActividad);
    res.send(200);
  } catch (error) {
    next(error)
  }
})
*/

module.exports = router;
