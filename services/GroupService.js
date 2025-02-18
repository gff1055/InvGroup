
const userTemp = require("../models/Users")
const instTemp = require("../models/Institutions")
const repository = require('../models/Groups')


const groupService = {

    store: async function(req, res){
    /*Funcao - Cadastrar os grupos
     *Parametro - dados do grupo
     *retorno - objeto contendo o feedback 
     */

        var feedback = {
        // objeto que mostra o feedback da operacap
            erros:[],
            success: false,
            exception: false
        }

        await repository.create({
            name: req.body.name,
            user_id: req.body.user_id,
            institution_id: req.body.institution_id
        }).then(function(){
            feedback.success = true;
            console.log("FROM GROUPS feedback.success = true" + feedback.success);
        }).catch(function(){
            req.flash("error_msg", "Houve um erro ao salvar o grupo, tente novamente")
            console.log("Erro ao salvar o grupo");
                feedback.exception = true;
                feedback.success = false;
        })

        return feedback;
        
        
    },


    /*
    loadDataSelect: carrega os usuarios e as instituicoes cadastradas para selecao na pagina de cadastro de grupos
    parametros: dados da requisicao
    retorno
        em caso de falha retorna alerta no console
        em caso de sucesso retorna os usuarios e as instituições
    */
    loadDataSelect:async function(req, res){
        let fUsers;         // usuarios cadastrados
        let fInstitutions;  // instituicoes cadastradas

        // buscando todos os usuarios...
        await userTemp.findAll({
            attributes: ['id','name'],
        })
        .then(function(users){
            fUsers = users;
        // se a busca por usuarios funcionar, é feita a busca pelas instituições
            return instTemp.findAll({
                attributes: ['id','name']
            })
        })
        .then(function(institutions){
            fInstitutions = institutions
        })
        // se alguma das buscas falhar é feito um alerta no console
        .catch(function(error){
            console.log("Houve um erro interno: loadDataSelect " + error)
        })

        return {
            users: fUsers,
            institutions: fInstitutions
        }
    },



    /*
    allData
        Funcao: exibir todos os grupos cadastrados
        retorno: objeto contendo todos os grupos

    */
    allData: async function(){
        let groups;
        await repository.findAll()
        .then(function(answer){
            groups = answer;
        })

        return groups;
    },


    update: function(){
        return true;
    },


    destroy: function(req, res){
/*
        // objeto para enviar feedback
        let feedback = {
            erros:[],
            success: false,
            exception: false
        }

        // objeto sendo excluido
        await repository.destroy({
            where:{
                'id': req.body.id
            }
        })
        .then(function(){
            feedback.success = true;
        })
        .catch(function(erro){
            feedback = true;
        })

        return feedback;*/


    },
};

module.exports = groupService;