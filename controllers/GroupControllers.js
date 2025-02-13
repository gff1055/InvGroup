
const groupService = require("../services/GroupService");

const groupController = {

    /**
     * Funcao: store - armazena o grupo no banco
     * parametros: requisicao e resposta
     * retorno:
     *  em caso de sucesso retorna mensagem de grupo cadastrado
     *  em caso de falha retorna o erro
     *  */
    store: function(req, res){

        let varFunc = groupService.store(req, res)
        .then((answer) => {

            // Se houve falha na adicao, a pagina é renderizada novamente indicando o erro
            if(answer.success != true){
                res.render("groups/index", {feedback:answer})
            }

            // Se houver sucesso, a mensagem é exibida
            else{
                req.flash("success_msg", "Grupo cadastrado!")
                res.redirect("/group")
            }


        })
    },

    destroy: function(req, res){

    }

}

module.exports = groupController;