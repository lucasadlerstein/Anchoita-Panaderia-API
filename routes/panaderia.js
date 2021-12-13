const express = require('express');
const router = express.Router();
const panaderiaController = require('../controllers/panaderiaController');

router.post('/',
    panaderiaController.new
);

router.put('/editar/:id',
    panaderiaController.edit
);

router.delete('/eliminar/:id',
    panaderiaController.delete
);

router.get('/todos',
    panaderiaController.getAll
);

router.get('/visibles/todos',
    panaderiaController.getAllVisible
);

router.get('/ocultos/todos',
    panaderiaController.getAllHidden
);

router.get('/uno/:id',
    panaderiaController.itemById
);

module.exports = router;