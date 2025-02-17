
const userTemp = require("../models/Users")
const instTemp = require("../models/Institutions")
const groupService = require("../services/GroupService");


const groupController = {

    index: function(req, res){
        let fUsers;
        let fInstitutions;

        userTemp.findAll({
            attributes: ['id','name'],
        })
        .then(function(users){
            fUsers = users;
            return instTemp.findAll({
                attributes: ['id','name']
            })
        })
        .then(function(institutions){
            fInstitutions = institutions
            groups = 0;
            res.render('groups/index', {groups: groups, institutions: fInstitutions, users: fUsers});
        })
        .catch(function(error){
            req.flash("error_msg", "Houve um erro ao carregar o formulario");
            res.redirect("/group")
        })
    /*groups = groupService.allData();*/
    /*groups = 0;
    res.render('groups/index', {groups: groups});*/
    },
    
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