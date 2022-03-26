const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.post('/', function (req, res) {
    const {name} = req.body;
    res.send('activity' + name);
});



module.exports = router;
