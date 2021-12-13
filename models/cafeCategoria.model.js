module.exports = (sequelize, Sequelize) => {
    const CafeCategoria = sequelize.define("cafeCategoria", {
        nombre: {
            type: Sequelize.STRING
        },
        en_nombre: {
            type: Sequelize.STRING
        },
        orden: {
            type: Sequelize.BIGINT(3),
            isUnique: true
        }
    });

    return CafeCategoria;
};