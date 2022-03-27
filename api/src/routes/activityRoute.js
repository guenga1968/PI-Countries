const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.post('/', async function (req, res) {
    const {name, dificulty, duration, season, description } = req.body;
    const tourism = {
        name,
        dificulty,
        duration,
        season,
        description,
    }
    const tourismDb = await Tourism.create(tourism);
    return res.json({msg: 'Actividad turística creada correctamente'});
});

module.exports = router;
