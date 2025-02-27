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



    /*
    Metodo      :show
    Obejtivo    :renderizar pagina com os dados da instituicao e seus grupos
    Parametros  :dados da requisicao do navegador
    Retorno
        sucesso :view com os dados da instituicao e grupos para renderizacao
        falha   :mensagem é exinida no console
    */
    show: function(req, res){

        // chama a funcao para retornar os dados
        // Em caso de sucesso, os dados da instituicao e grupos são renderizados
        // Em caso de falha, mensagem é exibida no console
        institutionService.show(req.params.id)
        .then(function(answer){
            res.render("institution/show", {
                institution: answer.institution,
                groupsByInstitution: answer.groupsByInstitution
            })
        })
        .catch(function(answer){
            console.log("Houve erro em institution.controller.show " + answer)
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