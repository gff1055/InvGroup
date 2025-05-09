const repository_institution = require('../models/Institutions');
const groupService = require('../services/GroupService')
const { allData } = require('./UserService');

const institutionService = {

    /**
     * isNone       :verifica se o valor do campo é vazio ou invalido
     * 
     * parametros   :campo
     * retorno      :true ou false
     */
    isNone: function(pField){
        if(!pField || typeof pField == undefined || pField == null){
            return true;
        }

        return false;
    },
    

    
    store: async function(req, res){
    /*Funcao - Cadastrar as instiruicoes
     *Parametro - dados da instituicao 
     *retorno - objeto contendo o feedback 
     */

        var feedback = {
            erros   :[],
            success :false,
            issue   :{
                exception   :false,
                validation  :false
            },
            data    :""
        }

        await repository_institution.create({

            name: req.body.name

        }).then(function(){

            feedback.success = true;

        }).catch(function(answer){

            feedback.issue.exception    = true;
            feedback.success            = false;
            feedback.data               = answer;

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


    



    /*
    Metodo      :show
    Funcao      :Exibir os grupos associados a uma instituicao
    Parametros  :Dados de requisicao
    Retorno     :Dados da Instituicao e dos grupos associados a ela 
    */
    show: async function(pInstitutionId){

        let institution;            // dados da isntituicao
        let groupsByInstitution;    // dados do grupo da instituicao

        /*
            busca os dados da instituicao
            Se a instituição for achada, são buscados os grupos associados a ela
            Caso contrario, mensagem de erro é exibida no console
        */ 
        await repository_institution.findOne({
            where:{
                id: pInstitutionId
            }
        })
        .then(function(answer){
            institution = answer;
            return groupService.searchByInstitution(pInstitutionId)
        })
        .then(function(answer){
            groupsByInstitution = answer;
        })
        .catch(function(answer){
            console.log("ERRO DUARNTE A EXECUCAO DE institutionService.show " + answer);
        })

        return {
            institution: institution,
            groupsByInstitution: groupsByInstitution
        };
    },



    /**
     * Metodo       :institutionData
     *              -> retornar os dados da instituição
     * parametro    :id da instituição
     * retorno      :objeto que contem o resultado da operação
     */

    institutionData: async function(pInstitutionId){
        let fException = false; // flag para a ocorrencia de excecoes
        let fData;              // dados da instituição

        // Se a instiuição for encontrado, os dados dela sao armazenados na variavel fData
        // Se ocorrer excecao, fData recebe a excecao encontrada e a flag de excecao(fException) é setada
        await repository_institution.findOne({
            where:{
                id: pInstitutionId
            }
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

    
    

    /**
     * Metodo       :update
     *              -> atualizar os dados da instituicao
     * parametro    :dados da instituicao vindo do formulario
     * retorno      :objeto que contem o resultado da operação
     */

    update:async function(req){

        let feedback = {                // objeto que contem o resultado da operação
                erros   :[],                // erros encontrados
                success :false,             // flag de sucesso
                issue   :{                  // objeto que sinaliza erros
                    exception:false,            // excecao
                    validation:false            // erros de validação (campos em branco, invalidos, ..,)
                },
                data    :""                 // dados da instiuição ou possiveis erros
        }

        // Para cada campo, se estiver em branco ou invalidos a flag de erros é setada e
        // a descricao do erro é adicionada ao objto

        if(this.isNone(req.body.name)){
            feedback.issue.validation = true;
            feedback.erros.push({texto: "Nome"})
        }

        // Se nao houver erros, a atualizacao de dados é executada
        // Em caso de erros as flags sao setadas e as mensagens de erro adicionadas
        if(feedback.erros.length == 0){
        
            await repository_institution.findOne({

                where:{
                    id: Number.parseInt(req.body.id)
                }

            })
            .then(function(answer){
                answer.name     = req.body.name 
                return answer.save()
            })
            .then(function(institution){
                feedback.success = true;
                feedback.data = institution
            })
            .catch(function(answer){
                feedback.issue.validation = true;
                feedback.issue.exception = true;
                feedback.erros += "Erro interno: exception - " + answer;
            })
        }

        return feedback;
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