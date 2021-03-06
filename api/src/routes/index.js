const { Router } = require('express');
const countryRoute =  require('./countriesRoute');
const activityRoute = require('./activityRoute');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use('/countries', countryRoute);
router.use('/activity', activityRoute);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
