
const db = require('./db')

const Users = require('./Users')
const Groups = require('./Groups')
const Products = require('./Products')

const Moviments = db.sequelize.define('moviments', {
    
    value: {
        type: db.Sequelize.DECIMAL,
        allowNull: false
    },

    type: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    },

});

Users.hasMany(Moviments, {
    foreignKey: 'user_id'
});
Moviments.belongsTo(Users, {
    foreignKey: 'user_id'
});

Groups.hasMany(Moviments, {
    foreignKey: 'group_id'
});
Moviments.belongsTo(Groups, {
    foreignKey: 'group_id'
});

Products.hasMany(Moviments, {
    foreignKey: 'product_id'
});
Moviments.belongsTo(Products, {
    foreignKey: 'product_id'
});

Moviments.sync({force: true})

module.exports = Moviments;