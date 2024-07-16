const Sequelize     = require('sequelize')
const sequelize = new Sequelize('invgroup', 'root', 'souzagroot',{
    host: "localhost",
    dialect: "mysql"
})

module.exports ={
    Sequelize: Sequelize,
    sequelize: sequelize
}