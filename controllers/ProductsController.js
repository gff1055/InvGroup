
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
        
        // funcao que retorna todos os dados
        productService.allData(req.params.id)
        .then(function(products){
            res.render("institution/products/index");
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
}

module.exports = productsController;
