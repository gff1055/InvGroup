
const groupService = require("../services/GroupService");


const groupController = {

    /*
    Funcao - carregar a pagina de grupos com todos os dados necessarios
    Parametros - dados da requisicao do navegador
    retorno
        sucesso: renderiza a pagina com todos os dados
        falha: exibe uma mensagem e redireciona
    */
    index: function(req, res){

        let fGroups;
        let fUsers;
        let fInstitutions

        // carrega os dados da pagina
        groupService.loadDataSelect()
        // renderiza a pagina em caso de sucesso
        .then(function(answer){
            fInstitutions = answer.institutions;
            fUsers = answer.users;
            return groupService.allData()
        })
        .then(function(answer){
            fGroups = answer;
            res.render('groups/index', {groups: fGroups, institutions: fInstitutions, users: fUsers});
        })
        // redireciona para a pagina principal com alerta de falha
        .catch(function(error){
            req.flash("error_msg", "Houve um erro ao carregar o formulario");
            res.redirect("/group")
        })
    },

       
    /*
     Funcao: store - armazena o grupo no banco
     parametros: requisicao e resposta
     retorno:
     em caso de sucesso retorna mensagem de grupo cadastrado
     em caso de falha retorna o erro
     */
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

    },


    update1: function(req, res){

    }

}

module.exports = groupController;