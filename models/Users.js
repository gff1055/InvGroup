const db = require('./db')

const Users = db.sequelize.define('users', {
    cpf: {
        type: db.Sequelize.CHAR(11),
        unique: true
    },

    name: {
        type: db.Sequelize.STRING(50),
        allowNull: false
    },

    phone: {
        type: db.Sequelize.CHAR(11),
        allowNull: false
    },

    birth: {
        type: db.Sequelize.DATE
    },

    gender: {
        type: db.Sequelize.CHAR(1)
    },

    notes: {
        type: db.Sequelize.TEXT
    },

    email: {
        type: db.Sequelize.STRING(80),
        allowNull: false,
        unique: true
    },

    password: {
        type: db.Sequelize.STRING(255),
        allowNull: false
    },

    status: {
        type: db.Sequelize.STRING(20),
        allowNull: false,
        defaultValue: 'active'
    },

    permission: {
        type: db.Sequelize.STRING(20)
    }
    
});

//Users.sync({force: true})

module.exports = Users;