const repository_institution = require('../models/Institutions');
const { allData } = require('./UserService');

const institutionService = {

    store: async function(req, res){
    /*Funcao - Cadastrar as instiruicoes
     *Parametro - dados da instituicao 
     *retorno - objeto contendo o feedback 
     */

        var feedback = {
            erros: [],
            success: false,
            exception: false
        }

        await repository_institution.create({
            name: req.body.name
        }).then(function(){
            feedback.success = true;
        }).catch(function(){
            req.flash("error_msg", "Houve um erro ao cadastrar a instituicao. Tente novamente")
            feedback.exception = true;
            feedback.success = false;
        })

        return feedback;

    },



    allData: async function(){
    /**Funcao - Exibir todas as instituicões cadastradas
     * retorno - objeto contendo todas as instituicoes
    */

        let institutions;

        // Executa a busca pelas instituições, retornando-as se as achar
        await repository_institution.findAll()
        .then(function(answer){
            institutions = answer;
        })
        
        return institutions;

    },



    show: async function(req, res){

        let institution;

        await repository_institution.findOne({
            where:{
                id: req.params.id
            }
        })
        .then(function(answer){
            institution = answer;
        })

        console.log("em show")
        console.log(institution)

        return institution;
    },



    update: function(){

    },


    
    destroy: async function(req, res){
    /**
     * Funcao - excluir uma instituicao
     * parametro - dados da instituicao a ser excluida
     * retorno - objeto feedback com o resultado da operacao
     */


        let feedback = {
        // Objeto para enviar feedback
            erros: [],
            success: false,
            exception: false
        }

        await repository_institution.destroy({
        // objeto sendo excluido...
            where:{
                'id': req.body.id
            }
        })

        // havendo sucesso ou falha na exclusao, o objeto de feedback recebe o resultado
        .then(function(){
        
            feedback.success = true;
        })
        .catch(function(erro){
            feedback.exception = true;
        })

        return feedback
    },

};


module.exports = institutionService;