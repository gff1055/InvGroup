const db = require('./db')

const Institutions = require('./Institutions')

const Products = db.sequelize.define('products', {
    
    name: {
        type: db.Sequelize.STRING(50),
        allowNull: false
    },

    description: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },

    index: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },

    interest_rate: {
        type: db.Sequelize.DECIMAL,
        allowNull: false
    },
});

Institutions.hasMany(Products, {
    foreignKey: 'institution_id'
});
Products.belongsTo(Institutions, {
    foreignKey: 'institution_id'
});

//Products.sync({force: true})

module.exports = Products;