const db = require('./db')

const Institutions = db.sequelize.define('institutions', {
    
    name: {
        type: db.Sequelize.STRING(50),
        allowNull: false
    },
    
});

//Institutions.sync({force: true})

module.exports = Institutions;