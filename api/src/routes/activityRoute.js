const { Router } = require('express');
const { Op } = require('sequelize');
const {Country,Tourism} = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', async (req, res, next) => {
   try{ let actividad = await Tourism.findAll()
    res.json(actividad);
} catch (err) {
    next(err);
}
});

router.post('/', async function (req, res,next) {
    const {nombre, dificultad, duracion, temporada, paises } = req.body;
    try {
    const actividad = {
        activity: nombre,
        difficulty: dificultad,
        duration: duracion,
        season: temporada,
        countriesActivity: paises,
    };
    let cargada=  await Tourism.create(actividad);
    cargada.countriesActivity.map(async (pais) => {
        let paisActividad = await Country.findByPk(pais);
        paisActividad.addTourism(cargada.id);
    });
       res.send('Activity loaded successfully');
    } catch (err) {
        res.send('Error loading activity');
    }
});
router.get('/:actividad', async function (req, res, next) {
    const { actividad } = req.params;
    try {
        let actividad = await Tourism.findAll({
            where: {
                activity: actividad
            }
        })
        res.json(actividad);
    } catch (err) {
        next(err);
    }
});

// router.put('/', function (req, res, next) {
//     const {id, name, dificulty, duration, season, countriesActivity } = req.body;
//     const tourism = {
//         id,
//         name,
//         dificulty,
//         duration,
//         season,
//         countriesActivity,
//     }
//     return Tourism.update(tourism, {
//         where: {
//             id,
//         },
//     }).then(() => {
//         return res.json({
//             message: 'Actividad turística actualizada correctamente',
//         });
//     }).catch(err => {
//         return next(err);
//     }) 
// });

// router.delete('/:id', function (req, res, next) {
//     const {id} = req.params;
//     return Tourism.destroy({
//         where: {
//             id,
//         },
//     }).then(() => {
//         return res.json({
//             message: 'Actividad turística eliminada correctamente',
//         });
//     }).catch(err => {
//         return next(err);
//     })
// });

module.exports = router;
