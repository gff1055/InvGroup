
const productService = require("../services/ProductService");

const productsController = {

    /*
    Funcao - carregar a pagina de produtos de uma instituição com todos os dados necessarios
    Parametros - dados da requisicao do navegador
    retorno
        sucesso: renderiza a pagina com todos os dados
        falha: exibe uma mensagem e redireciona
    */
    index: function(req, res){

        let institution_id = req.params.id;
        
        // funcao que retorna todos os dados
        productService.allData(institution_id)
        .then(function(products){
            res.render("institution/products/index", {products:products});
        })
    },


    /*
     Funcao     :store
     Objetivo   :aciona o service para armazenamento no banco
     parametros :requisicao e resposta
     retorno:
                :em caso de sucesso retorna mensagem de grupo cadastrado
                :em caso de falha retorna o erro
     */
    store: function(req, res){

        let varProduct = productService.store(req)
        .then((answer) => {

            // Se houver falha na entrada dos dados ou excecao, o usuario é redirecionado para a pagina inicial
            // indicando o erro
            // Se houver sucesso, o usuario é redirecionado e a mensagem de cadastro exibida
            if(answer.issue.validation == true){
                req.flash("error_msg", "Os seguintes campos tem valores invalidos ou estao em branco:")
                for(i=0; i<answer.erros.length; i++){
                    req.flash("error_msg", answer.erros[i].texto)
                }
                res.redirect("/institution/" + req.params.id + "/product")
            }
            
            else if(answer.issue.exception == true){
                req.flash("error_msg", "Houve um erro ao salvar> " + answer.data)
                res.redirect("/institution/" + req.params.id + "/product")
            }
            
            else if(answer.success == true){
                req.flash("success_msg", "Produto cadastrado!")
                res.redirect("/institution/" + req.params.id + "/product")
            }
        })
    },




    /*Metodo    :destroy
    Objetivo    :excluir o produto de uma instituição no banco de dados
    Parametros  :requisicao e resposta
    Retorno
                :em caso de sucesso retorna mensagem de instituição excluida
                :em caso de falha retorna indicando o erro
     */

    destroy: function(req, res){

        let product_id = req.body.id;
        
        // chamando funcao para excluir o usuario
        productService.destroy(product_id)
        .then(function(answer){

            // Se houve falha na exclusao, a pagina é renderizada novamente indicando o erro
            if(answer.success != true){
                req.flash("error_msg", "Erro ao excluir o produto tente novamente")
                res.redirect("/institution/" + req.params.id + "/product")
            }

            // Se houver sucesso, a mensagem é exibida
            else{
                req.flash("success_msg", "Produto excluido")
                res.redirect("/institution/" + req.params.id + "/product")
            }
        })
    },
}

module.exports = productsController;
