
const userTemp = require("../models/Users")
const instTemp = require("../models/Institutions")
const repository = require('../models/Groups');
const userService = require("../services/UserService")
const repositoryUserGroups = require("../models/UserGroups")



const groupService = {

    
    /**
     * isNone       :verifica se o valor do campo é vazio ou invalido
     * 
     * parametros   :campo do formulario
     * retorno      :true ou false
     */
    isNone: function(pField){
        if(!pField || typeof pField == undefined || pField == null){
            return true;
        }

        return false;
    },
    
    
    
    /*Funcao - Cadastrar os grupos
     *Parametro - dados do grupo
     *retorno - objeto contendo o feedback 
     */

    store: async function(req, res){

        let name            = req.body.name;
        let user_id         = req.body.user_id;
        let institution_id  = req.body.institution_id;


        var feedback = {
        // objeto que mostra o feedback da operacap
            erros:[],
            success: false,
            issue:{
                exception   :false,
                validation  :false
            },
            data:""
        }


        // Se o campo nome do grupo estiver em branco ou invalido a flag de erros é setada e
        // a descricao do erro é adicionada ao objto

        if(this.isNone(name)){
            feedback.issue.validation = true;
            feedback.erros.push({texto: "Nome "})
        }

        if(!user_id){
            feedback.issue.validation = true;
            feedback.erros.push({texto: "Usuario "})
        }

        if(!institution_id){
            feedback.issue.validation = true;
            feedback.erros.push({texto: "Instituicao "})
        }


        // Se nao houver erros, o cadastro dos dados é executado
        // Em caso de erros as flags sao setadas e as mensagens de erro adicionadas
        if(feedback.erros.length == 0){

            await repository.create({
                name            :name,
                user_id         :user_id,
                institution_id  :institution_id
            }).then(function(){
                feedback.success = true;
            }).catch(function(answer){
                feedback.issue.exception    = true;
                feedback.success            = false;
                feedback.data               = answer
            })
        }

        return feedback;
    },



    /**
     * Metodo       :userstore
     * Funcao       :cadastrar usuario em um grupo
     * Parametros   :dados de requisicao
     * retorno      :objeto que  descreve erros, dados, condicoes (sucesso, falha)
     */
    userStore: async function(req, res){

        // Objeto que contem o resultado da operação
        var feedback = {
            erros   :[],                // erros encontrados
            success :false,             // indica se houve sucesso ou falha
            issue   :{                  // inidica os erros que ocorreram
                exception   :false,         // sinaliza esxcecoes
                validation  :false          // sinaliza erros de validacao
            },
            data    :""                 // dados requisitados da funcao
        }

        // Usuario é adicionado ao grupo
        // o resultado da operacao é adicionado ao objeto 'feedback'
        await repositoryUserGroups.create({

            permission  :'default',
            user_id     :req.body.user_id,
            group_id    :req.body.group_id
            
        }).then(function(){
            feedback.success = true;
        }).catch(function(answer){

            feedback.issue.exception    = true;
            feedback.success            = false;
            feedback.data               = answer
        })

        return feedback;
        
    },



    /**
     * Medodo       :showUserGroup
     * Funcao       :Mostrar os usuarios cadastrados no grupo
     * Parametro    :id do grupo
     * Retorno      :Objeto que contem os dados dos usuario que estao no grupo e erros na operação
     * 
     */
    showUsersGroup: async function(pGroupId){

        let fUsersGroup;    // usurios do grupo
        let fErros;

        // buscando todos os usuarios que estao em um grupo
        // Em caso de sucesso, a lista de usuarios é enviada para o objeto de retorno
        // Em caso de falha, a descricao do erro é enviada para o objeto de retorno 
        await repositoryUserGroups.findAll({
            where:{
                group_id: pGroupId
            },

            include:[{
                model: userTemp,
                required: true,
                attributes: {
                    exclude:['password']
                }
            }]            
        }).then(function(answer){
            fUsersGroup = answer;
        }).catch(function(answer){
            console.log("Erro durante a execucao de GroupService.showGroupUsers " + answer)
            fErros = answer;
        })

        return {
            usersGroup  :fUsersGroup,
            erros       :fErros
        }
    },


    /**
     * Medodo       :show
     * Funcao       :Mostrar os dados de um grupo
     * Parametro    :id do grupo
     * Retorno      :Objeto que contem os dados do grupo e dos usuario que estao no grupo e erros na operação
     * 
     */
    
    show: async function(pGroupId){

        let fGroup; // dados do grupo
        let fErros; // descricao de erros
        let fUsers; // dados dos usuarios do grupo

        // procura um determinado grupo
        // se conseguir, procura todos os usuarios cadastrados
        // em caso de excecao, os dados dela sao retornados
        await repository.findOne({
            where:{
                id: pGroupId
            },

            // inclui o usuario responsavel e a instituição
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
            fGroup = answer;
            fErros = null;
            return userService.allData();
        })
        .then(function(answer){
            fUsers = answer;
            fErros = null;
        })
        .catch(function(answer){
            console.log("Erro durante a execução de GroupService.show" + answer)
            fErros = answer;
        })

        return {
            users: fUsers,
            group: fGroup,
            erros: fErros
        }
        
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
        // se a busca por usuarios funcionar, é feita a busca pelas instituições
        // se alguma das buscas falhar é feito um alerta no console
        await userTemp.findAll({
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
        })
        
        .catch(function(error){
            console.log("Houve um erro interno: loadDataSelect " + error)
        })

        

        return {
            users: fUsers,
            institutions: fInstitutions
        }
    },



    /*
        Metodo  :allData
        Funcao  :exibir todos os grupos cadastrados
        retorno :objeto contendo todos os grupos

    */
    allData: async function(){
        let groups; // variavel que recebe os grupos cadastrados

        // buscando todos os grupos
        // se a busca tiver sucesso, a variavel groups recebe o retorno
        // se houver erro, é exibida uma mensagem no console
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


    /**
     * Metodo       :groupData
     *              -> retornar os dados do grupo
     * parametro    :id da instituição
     * retorno      :objeto que contem o resultado da operação
     */

    groupData: async function(pGroupId){
        let fException = false; // flag para a ocorrencia de excecoes
        let fData;              // dados do grupo

        // Se o grupo for encontrado, os dados dela sao armazenados na variavel fData
        // Se ocorrer excecao, fData recebe a excecao encontrada e a flag de excecao(fException) é setada
        await repository.findOne({
            where:{
                id: pGroupId
            },

            // inclui o usuario responsavel e a instituição
            include:[{
                model: userTemp,
                required: true,
                attributes: ['name']
            },{
                model: instTemp,
                required: true,
                attributes: ['name']
            }],
        }).then(function(answer){
            fData = answer;
        }).catch(function(error){
            fData = error;
            fException = true;
        })

        return{
            exception: fException,
            data: fData
        }
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



    /*Funcao    - Atualizar os grupos
     *Parametro - dados do grupo
     *retorno   - objeto contendo o feedback da atualização
     */
    update:async function(req){

        let name            = req.body.name;
        let id              = req.body.id;
        let user_id         = req.body.user_id;
        let institution_id  = req.body.institution_id;


        // objeto que mostra o feedback da operacap
        var feedback = {
                erros:[],
                success: false,
                issue:{
                    exception   :false,
                    validation  :false
                },
                data:""
        }

        // Se o campo nome do grupo estiver em branco ou invalido a flag de erros é setada e
        // a descricao do erro é adicionada ao objto

        if(this.isNone(name)){
            feedback.issue.validation = true;
            feedback.erros.push({texto: "Nome invalido ou em branco"})
        }

        // Se nao houver erros, a atualizacao de dados é executada
        // Em caso de erros as flags sao setadas e as mensagens de erro adicionadas
        if(feedback.erros.length == 0){
        
            await repository.findOne({

                where:{
                    id: Number.parseInt(id)
                }
            })
            .then(function(answer){
                answer.name             = name
                answer.user_id          = user_id
                answer.institution_id   = institution_id
                return answer.save()
            })
            .then(function(group){
                feedback.success = true;
                feedback.data = group;
            })
            .catch(function(answer){
                feedback.issue.validation = true;
                feedback.issue.exception = true;
                feedback.erros += "Erro interno: exception - " + answer;
            })
        }
        
        return feedback;
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