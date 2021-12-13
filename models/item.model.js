module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("item", {
        nombre: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.TEXT
        },
        precio: {
            type: Sequelize.FLOAT(10)
        },
        precio2: {
            type: Sequelize.FLOAT(10)
        },
        precio3: {
            type: Sequelize.FLOAT(10)
        },
        categoria: {
            type: Sequelize.BIGINT(5)
        },
        categoria2: {
            type: Sequelize.BIGINT(5)
        },
        en_nombre: {
            type: Sequelize.STRING
        },
        en_descripcion: {
            type: Sequelize.TEXT
        },
        stock: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        visible: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });

    return Item;
};