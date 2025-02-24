
const userTemp = require("../models/Users")
const instTemp = require("../models/Institutions")
const repository = require('../models/Groups');



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
        let groups; // variavel que recebe os grupos cadastrados

        // buscando todos os grupos
        // se a busca tiver sucesso a variavel groups recebe o retorno
        // se houver erro é exibida uma mensagem no console
        await repository.findAll({

            // incluindo o nome do responsavel e da isntituicção no retorno da consulta
            include:[{
                model: userTemp,
                required: true,
                attributes: ['name']
            },{
                model: instTemp,
                required: true,
                attributes: ['name']
            }],
        })
        .then(function(answer){
            groups = answer;
        })
        .catch(function(error){
            console.log(error);
        })

        return groups;
    },


    /*
        Metodo      :searchByInstitution
        Funcao      :Fazer a busca de grupos que fazem parte de uma instituição
        Parametro   :o identificador da Instituicao
        Retorno     :grupos associados a instituicao
    */
    searchByInstitution: async function(institutionId){
        let groups;     // grupos associados a istituicao

        /*
            Efetua a busca de todos os grupos
            Se houver grupos, eles sao selecionados e adicionados a variavel de retorno
        */
        await repository.findAll({
            where:{
                institution_id: institutionId
            },
            include:[{
                model: userTemp,
                required: true,
                attributes: ['name']
            },{
                model: instTemp,
                required: true,
                attributes: ['name']
            }],
        })
        .then(function(answer){
            groups = answer;
        })

        return groups;

    },


    update: function(){
        return true;
    },


    /*
    Metodo      :destroy
    Objetivo    :excluir um grupo
    Parametros  :dados de requisicao do navegador
    Retorno     :objeto que contem o feedback da operacao
    */
   
    destroy: async function(req, res){
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

        return feedback;


    },
};

module.exports = groupService;