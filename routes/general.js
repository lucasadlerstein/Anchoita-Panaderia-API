const express = require('express');
const router = express.Router();
const generalController = require('../controllers/generalController');

// Estado Coctel
router.put('/visibilidad/:categoria/:id',
    generalController.visibilidadGeneral
);

// Estado Coctel
// router.put('/stock/:categoria/:id',
//     generalController.stockGeneral
// );

// Estadisticas
router.get('/estadisticas',
    generalController.estadisticasGenerales
)

router.get('/ocultos/totales',
    generalController.contenidosOcultos
)

router.put('/actualizar/categorias-cafe/:id', 
    generalController.updateCoffeeCategories
);

router.get('/get/categorias-cafe', 
    generalController.getCoffeeCategories
);

module.exports = router;