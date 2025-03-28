
const db = require('./db')
const Users = require('./Users');
const Groups = require('./Groups')

const UserGroups = db.sequelize.define('userGroups', {

    permission:{
        type: db.Sequelize.STRING(60),
    }


})

/** Associaciao N:N entre User e Groups atraves de  UserGroups*/
Users.belongsToMany(Groups, {
    through: UserGroups,
    foreignKey: 'user_id',
    /*otherKey: 'group_id',*/
    
});

/** Associaciao N:N entre Groups e User atraves de  UserGroups*/
Groups.belongsToMany(Users, {
    through: UserGroups,
    foreignKey: 'group_id',
    /*otherKey: 'user_id',*/
});

/** Associacao 1:N entre Usergroups e Users */
UserGroups.belongsTo(Users, {
    foreignKey: 'user_id',
});

/** Associacao 1:N entre Usergroups e Groups */
UserGroups.belongsTo(Groups, {
    foreignKey: 'group_id',
});

//UserGroups.sync({force: true})

module.exports = UserGroups;