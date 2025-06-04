//const movimentService = require("../services/MovimentService");

const movimentsController = {

    application:function(req, res){
        groups = [];
        products = []
        res.render("moviment/application",{groups:groups, products,products})
    },


}

module.exports = movimentsController