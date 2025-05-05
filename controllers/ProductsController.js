
//const productService = require("../services/productsService");

const productsController = {

    /*
    Funcao - carregar a pagina de produtos de uma instituição com todos os dados necessarios
    Parametros - dados da requisicao do navegador
    retorno
        sucesso: renderiza a pagina com todos os dados
        falha: exibe uma mensagem e redireciona
    */
    index: function(req, res){
        res.render("institution/products/index");
    },


}


module.exports = productsController;
