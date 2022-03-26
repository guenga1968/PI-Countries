const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", function (req, res) {
    
    !req.query.name ? res.send("No hay query"):res.send(req.query.name);
  

});

router.get('/:idPais', function (req, res) {
    const {id} = req.params;
    res.send('countries/:idPais' + id.name);
});

router.get('/')



module.exports = router;
