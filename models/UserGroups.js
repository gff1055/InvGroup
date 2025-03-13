
const db = require('./db')
const Users = require('./Users');
const Groups = require('./Groups')

const UserGroups = db.sequelize.define('userGroups', {

    permission:{
        type: db.Sequelize.STRING(60),
    }


})

Users.belongsToMany(Groups, {
    through: UserGroups,
    foreignKey: 'user_id',
    
});
Groups.belongsToMany(Users, {
    through: UserGroups,
    foreignKey: 'group_id',
    
});

//UserGroups.sync({force: true})

module.exports = UserGroups;