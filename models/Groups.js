
const db = require('./db')
const Institutions = require('./Institutions')
const Users = require('./Users')

const Groups = db.sequelize.define('groups_invs', {


    name:{
        type: db.Sequelize.STRING(50),
        allowNull: false
    },

 /* chaves estrangeiras   
    user_id:{

    },

    institution_id:{

    },*/

});

Users.hasMany(Groups,{
    foreignKey: 'user_id'
});
Groups.belongsTo(Users, {
    foreignKey: 'user_id'
});

Institutions.hasMany(Groups, {
    foreignKey: 'institution_id'
});
Groups.belongsTo(Institutions, {
    foreignKey: 'institution_id'
});

Groups.sync({force: true})

// module.exports = Groups;