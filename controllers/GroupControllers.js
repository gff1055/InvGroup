
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

        console.log("***** groupController.store *****")
        console.log(req.body.user_id)
        console.log(req.body.institution_id)
        console.log(req.body.name)

        let varGroup = groupService.store(req, res)
        .then((answer) => {

            // Se houve falha na adicao, a pagina é renderizada novamente indicando o erro
            if(answer.issue.validation == true){
                /*res.render("groups/index", {group:answer})*/
                req.flash("error_msg", "Os seguintes campos tem valores invalidos ou estao em branco: ")
                for(i=0; i<answer.erros.length; i++){
                    req.flash("error_msg", answer.erros[i].texto )
                    console.log(answer.erros[i]);
                }

                res.redirect("/group")
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


    /*
        Funcao      :userStore
        Objetivo    :requisitar o cadastro do usuario no grupo
        parametros  :requisicao e resposta
        retorno     :Mensagem indicando o status da operacao
     */
    
    userStore: function(req, res){
        
        // Chamando funcao para cadastro do usuario
        groupService.userStore(req, res)
        .then(function(answer){

            // Se houver falha na adicao, a pagina é renderizada novamente indicando o erro
            // Se houver sucesso, a mensagem é exibida
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


    /*
        Funcao      :show
        Objetivo    :exibir a pagina de informações do grupo
        parametros  :requisicao e resposta
        retorno     :pagina renderizada
     */

    show: function(req, res){
        
        let fGroup;         // lista de grupos
        let fErros;         // lista de erros
        let fUsers;         // lista de usuarios
        let fUsersGroup;    // lista de usuarios de um grupo
        
        // chamando o metodo que retorna informações do grupo
        groupService.show(req.params.id)
        .then(function(answer){

            // recebendo a resposta
            fGroup = answer.group;
            fErros = answer.erros;
            fUsers = answer.users;

            // chamando o metodo para exibir os usuarios por grupo
            return groupService.showUsersGroup(req.params.id)
        }).then(function(answer){

            // recebendo a resposta
            fUsersGroup = answer.usersGroup
            fErros = fErros + answer.erros
            
            res.render("groups/show",{
                group: fGroup,
                users: fUsers,
                erros: fErros,
                usersGroup: fUsersGroup
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



    /*
    Funcao - carregar a pagina de grupos com todos os dados necessarios
    Parametros - dados da requisicao do navegador
    retorno
        sucesso: renderiza a pagina com todos os dados
        falha: exibe uma mensagem e redireciona
    */
    edit: function(req, res){
        
        let users;
        let institutions;
        let group;

        let groupId = req.params.id;
    
            // carrega os dados da pagina
            groupService.loadDataSelect()
            // recebendo os dados das instituições e usuarios para preencher os selects
            .then(function(answer){
                institutions = answer.institutions;
                users = answer.users;
                // retorna os dados dos grupos
                return groupService.groupData(groupId)
            })
            .then(function(answer){
                group = answer;
                console.log(users.id);
                res.render('groups/edit', {group: group, institutions: institutions, users: users});
            })
            // redireciona para a pagina principal com alerta de falha
            .catch(function(error){
                req.flash("error_msg", "Houve um erro ao carregar o formulario: "+error);
                res.redirect("/group")
            })
        },

    
    
    /*
     Funcao     :update
     Objetivo   :atualiza os dados do grupo no banco
     parametros :requisicao e resposta
     retorno:
                :em caso de sucesso retorna mensagem de grupo atualizado
                :em caso de falha retorna o erro
    */
    
    update: function(req, res){

        groupId = req.params.id;
        
        let varGroup = groupService.update(req)
        .then((answer) => {

            // Se houve falha na atualização, a pagina é renderizada novamente indicando o erro
            if(answer.issue.validation == true){
                req.flash("error_msg", "Existem campos com valores em branco ou invalido")
                res.redirect("/group")
            }

            else if(answer.issue.exception == true){
                req.flash("error_msg", "Houve um erro ao atualizar> " + answer.data)
                res.redirect("/group")
            }

            // Se houver sucesso, a mensagem é exibida
            else if(answer.success == true){
                req.flash("success_msg", "Grupo atualizado!")
                res.redirect("/group")
            }
        })
    },

}

module.exports = groupController;