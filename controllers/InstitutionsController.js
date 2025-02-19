const institutionService = require("../services/InstitutionService");

const institutionController = {

    /*
    Metodo      :index
    Objetivo    :mostrar a pagina inicial de instituições
    Retorno     :renderiza a pagina com todos os dados necessarios
    */

    index:function(req, res){

        // funcao que retorna todos os dados
        institutionService.allData()
        .then(function(institutions){
            console.log(institutions);
            res.render("institution/index", {institutions: institutions})
        })

    },


    /*
     Funcao     :store
     Objetivo   :armazena a instituição no banco
     parametros :requisicao e resposta
     retorno:
                :em caso de sucesso retorna mensagem de instituição cadastrada
                :em caso de falha retorna o erro
     */

    store: function(req, res){
        
        // funcao para adicionar a instituicao é chamada
        institutionService.store(req, res)
        .then(function(answer){
            
            // Se houve falha na adicao, a pagina é renderizada novamente indicando o erro
            if(answer.success != true){
                res.render("institution/index", {feedback:answer})
            }

            // Se houver sucesso, a mensagem é exibida
            else{
                req.flash("success_msg","Instituicao cadastrada!")
                res.redirect("/institution")
            }
        })
    },



    show: function(req, res){
        institutionService.show(req, res)
        .then(function(institution){
            res.render("institution/show", {institution: institution})
        })
    },



    /*
    Metodo      :destroy
    Objetivo    :excluir a instituição no banco de dados
    Parametros  :requisicao e resposta
    Retorno
                :em caso de sucesso retorna mensagem de instituição excluida
                :em caso de falha retorna indicando o erro
     */

    destroy: function(req, res){
        
        // chamando funcao para excluir o usuario
        institutionService.destroy(req, res)
        .then(function(answer){

            // Se houve falha na exclusao, a pagina é renderizada novamente indicando o erro
            if(answer.success != true){
                res.render("institution/index", {feedback:answer})
            }

            // Se houver sucesso, a mensagem é exibida
            else{
                req.flash("success_msg", "Instituição excluida")
                res.redirect("/institution")
            }
        })
    }
}

module.exports = institutionController