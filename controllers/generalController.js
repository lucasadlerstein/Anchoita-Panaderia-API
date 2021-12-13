const db = require("../models");
const Item = db.item;
const CafeCategoria = db.cafeCategoria;
const Sequelize = require('sequelize');

exports.visibilidadGeneral = async (req, res) => {
    Item.findOne({ where: { id: req.params.id } })
    .then(unidad => {
        const nuevaVisibilidad = !(unidad.visible);
        unidad.visible = nuevaVisibilidad;
        unidad.save();
        return res.json({ realizado: true })
    })
    .catch(error => {
        return res.status(500).json({realizado: false, error})
    })
  
}

// exports.stockGeneral = async (req, res) => {

//     if(req.params.categoria === 'cocteleria') {
//         Cocteleria.findOne({ where: { id: req.params.id } })
//         .then(coctel => {
//             const nuevoStock = !(coctel.stock);
//             coctel.stock = nuevoStock;
//             coctel.save();
//             return res.json({realizado: 'exito'})
//         })
//         .catch(error => {
//             return res.status(500).json({realizado: 'error', error})
//         })
//     } else if (req.params.categoria === 'platos') {
//         Platos.findOne({ where: { id: req.params.id } })
//         .then(plato => {
//             const nuevoStock = !(plato.stock);
//             plato.stock = nuevoStock;
//             plato.save();
//             return res.json({realizado: 'exito'})
//         })
//         .catch(error => {
//             return res.status(500).json({realizado: 'error', error})
//         })
//     } else if (req.params.categoria === 'vinos') {
//         Vinos.findOne({ where: { id: req.params.id } })
//         .then(vinos => {
//             const nuevoStock = !(vinos.stock);
//             vinos.stock = nuevoStock;
//             vinos.save();
//             return res.json({realizado: 'exito'})
//         })
//         .catch(error => {
//             return res.status(500).json({realizado: 'error', error})
//         })
//     }
// }

exports.estadisticasGenerales = async (req, res) => {
    const totalCafeteria = await Item.count({where: {categoria: 1}});
    const totalBebidas = await Item.count({where: {categoria: 2}});
    const totalPanaderia = await Item.count({where: {categoria: 3}});
    const totalSandwiches = await Item.count({where: {categoria: 4}});
    const totalHelados = await Item.count({where: {categoria: 5}});

    const totalCafeteriaOcultos = await Item.count({where: {categoria: 1, visible: false}});
    const totalBebidasOcultos = await Item.count({where: {categoria: 2, visible: false}});
    const totalPanaderiaOcultos = await Item.count({where: {categoria: 3, visible: false}});
    const totalSandwichesOcultos = await Item.count({where: {categoria: 4, visible: false}});
    const totalHeladosOcultos = await Item.count({where: {categoria: 5, visible: false}});
    const totalCategoriasCafe = await CafeCategoria.count({where: {nombre: {[Sequelize.Op.not]: ''}}});

    const estadisticas = {
        totalComida: totalPanaderia + totalSandwiches + totalHelados,
        totalBebida: totalBebidas + totalCafeteria,
        totalComidaOcultos: totalPanaderiaOcultos + totalSandwichesOcultos + totalHeladosOcultos,
        totalBebidaOcultos: totalBebidasOcultos + totalCafeteriaOcultos,
        totalCategoriasCafe
    }

    res.send(estadisticas);
}

exports.contenidosOcultos = async (req, res) => {
    const ocultosCocteleria = await Cocteleria.findAll({where: {visible: false} });
    const ocultosPlatos = await Platos.findAll({where: {visible: false} });
    const ocultosVinos = await Vinos.findAll({where: {visible: false} });

    const todo = {ocultosCocteleria, ocultosPlatos, ocultosVinos}

    res.send(todo);
}

exports.updateCoffeeCategories = async (req, res) => {
    const updatedItem = {
        nombre: req.body.nombre,
        en_nombre: req.body.en_nombre,
        orden: req.body.orden,
    }

    await CafeCategoria.update(updatedItem, {where: {id: req.params.id}}).then(resultado => {
        return res.json({respuesta: 'actualizado', resultado});
    }) 
    .catch(error => {
        return res.status(400).json({respuesta: 'error', error});
    })
}

exports.getCoffeeCategories = async (req, res) => {
    await CafeCategoria.findAll()
        .then(resp => {
            return res.json({respuesta: 'ok', categoriasCafe: resp})
        })
        .catch(err => {
            return res.status(400).json({respuesta: 'error', error: err})
        })
}


