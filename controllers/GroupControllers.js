
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
        // recebendo os dados das instituições e usuarios para preencher os selects
        .then(function(answer){
            fInstitutions = answer.institutions;
            fUsers = answer.users;
            // retorna os dados dos grupos
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
     Funcao     :store
     Objetivo   :armazena o grupo no banco
     parametros :requisicao e resposta
     retorno:
                :em caso de sucesso retorna mensagem de grupo cadastrado
                :em caso de falha retorna o erro
     */
    store: function(req, res){

        let varGroup = groupService.store(req, res)
        .then((answer) => {

            // Se houve falha na adicao, a pagina é renderizada novamente indicando o erro
            if(answer.issue.validation == true){
                res.render("groups/index", {feedback:answer})
            }

            else if(answer.issue.exception == true){
                req.flash("error_msg", "Houve um erro ao salvar> " + answer.data)
                res.redirect("/group")
            }

            // Se houver sucesso, a mensagem é exibida
            else if(answer.success == true){
                req.flash("success_msg", "Grupo cadastrado!")
                res.redirect("/group")
            }


        })
    },


    userStore: function(req, res){
        console.log("VVVVVV REQ ENVIADO VVVVVVV")
        console.log(req.body)
        groupService.userStore(req, res)
        .then(function(answer){

            // Se houver falha na adicao, a pagina é renderizada novamente indicando o erro
            // Se houver sucesso, a mensagem é exibida
            console.log(answer.success)
            console.log(answer.exception)
            if(answer.issue.validation == true)
                res.render("groups/show", {feedback: answer})

            else if(answer.issue.exception == true){
                req.flash("error_msg", "Houve um erro ao salvar> " + answer.data)
                res.redirect("/group/"+req.params.id)
            }
            
            else if(answer.success == true){
                req.flash("success_msg", "Usuario associado ao grupo")
                res.redirect("/group/"+req.params.id)
            }
        }) 
    },

    
    show: function(req, res){
        groupService.show(req.params.id)
        .then(function(answer){
            res.render("groups/show",{
                group: answer.group,
                users: answer.users,
                erros: answer.erros
            })
        })
    },


    /*
    Metodo      :destroy
    Objetivo    :excluir o grupo no banco de dados
    Parametros  :requisicao e resposta
    Retorno:
                :em caso de sucesso retorna mensagem de grupo excluido
                :em caso de falha retorna indicando o erro
     */

    destroy: function(req, res){

        // chamando funcao para excluir grupo
        groupService.destroy(req, res)
        .then(function(answer){

            // Se houve falha na exclusao, a pagina é renderizada novamente indicando o erro
            if(answer.success!=true){
                res.render("group/index", {feedback: answer})
            }

            // Se houver sucesso, a mensagem é exibida
            else{
                req.flash("success_msg", "Grupo excluido")
                res.redirect("/group")
            }
        })
    },

    
    
    update1: function(req, res){

    }

}

module.exports = groupController;