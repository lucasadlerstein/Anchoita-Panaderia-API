const { validationResult } = require('express-validator');
const db = require("../models");
const Item = db.item;

exports.new = async (req, res) => {

    const newItem = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        precio2: req.body.precio2,
        precio3: req.body.precio3,
        categoria: req.body.categoria,
        categoria2: req.body.categoria2,
        en_nombre: req.body.en_nombre,
        en_descripcion: req.body.en_descripcion,
        stock: req.body.stock,
        visible: true,
    }

    await Item.create(newItem).then(resultado => {
        return res.json({respuesta: 'creado', resultado});
    }) 
    .catch(error => {
        console.log(error)
        return res.status(400).json({respuesta: 'error', error});
    })
}

exports.edit = async (req, res) => {

    if(req.params.id === null || req.params.id === undefined || req.params.id === '') {
        return res.status(400).json({respuesta: 'error', error: 'No hay ID del Plato'})
    } else {
        const updatedItem = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            precio2: req.body.precio2,
            precio3: req.body.precio3,
            categoria: req.body.categoria,
            categoria2: req.body.categoria2,
            en_nombre: req.body.en_nombre,
            en_descripcion: req.body.en_descripcion,
            stock: req.body.stock,
            visible: req.body.visible,
        }
    
        await Item.update(updatedItem, {where: {id: req.params.id}}).then(resultado => {
            return res.json({respuesta: 'actualizado', resultado});
        }) 
        .catch(error => {
            return res.status(400).json({respuesta: 'error', error});
        })
    }

}

exports.delete = async (req, res) => {
    await Item.destroy({where: {id: req.params.id}})
        .then(respuesta => {
            return res.json({resultado: respuesta})
        })
        .catch(error => {
            return res.status(500).json({resultado: 'error', error: error})
        })
}

exports.getAll = async (req, res) => {
    await Item.findAll()
        .then(resp => {
            return res.json({respuesta: 'ok', items: resp})
        })
        .catch(err => {
            return res.status(400).json({respuesta: 'error', error: err})
        })
}

exports.getAllVisible = async (req, res) => {
    await Item.findAll({where: { visible: true } })
        .then(resp => {
            return res.json({respuesta: 'ok', items: resp})
        })
        .catch(err => {
            return res.status(400).json({respuesta: 'error', error: err})
        })
}

exports.getAllHidden = async (req, res) => {
    await Item.findAll({where: { visible: false } })
        .then(resp => {
            return res.json({respuesta: 'ok', items: resp})
        })
        .catch(err => {
            return res.status(400).json({respuesta: 'error', error: err})
        })
}

exports.itemById = async (req, res) => {
    await Item.findOne({where: {id: req.params.id}})
    .then(resp => {
        return res.json({respuesta: 'ok', plato: resp})
    })
    .catch(err => {
        return res.status(400).json({respuesta: 'error', error: err})
    })
}