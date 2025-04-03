const repository = require('../models/Users') // model da tabela de usuarios


const userService = {

    /**
     * metodo       :isNone - verifica se um valor é vazio ou invalido
     * parametros   :campo
     * retorno      :true ou false
     */
    isNone: function(pField){
        if(!pField || typeof pField == undefined || pField == null){
            return true;
        }

        return false;
    },
    

    /**
     * funcao - formatar cpf adicionando pontos e hifens
     * parametro - cpf inserido pelo usuario
     * retorno - cpf formatado
     */
    
    formatCPF: function(cpf){
        
        cpf = cpf.replace(/[^\d]/g, "");
        //retira os caracteres indesejados...

        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    },



    /**
     * funcao - formatar telefone
     * parametro - telefone inserido pelo usuario
     * retorno - telefone formatado
     */

    formatPhone: function(phone){
        
        phone = phone.replace(/[^\d]/g, "");
        //retira os caracteres indesejados...

        return phone.replace(/(\d{2})(\d{4})(\d{4})/, "($1)$2-$3");
    },

    
    /*Funcao - Cadastrar os usuarios
     *Parametro - dados do usuario 
     *retorno - objeto contendo o feedback 
     */

    store: async function(req, res){

        var feedback = {    // objeto que contem as informações de erros, sucessos, dados a serem retornados
            erros   :[],
            success :false,
            issue   :{
                exception   :false,
                validation  :false
            },
            data    :""
        }
        
        // Para cada dado do usuario
        // Se estiver vazio, a flag de erro de validação é setada
        // e adicionado a mensagem correspondente ao objeto de feedback
        
        if(this.isNone(req.body.name)){
            feedback.issue.validation = true;
            feedback.erros.push({texto: "Nome invalido"})
        }

        if(this.isNone(req.body.phone)){
            feedback.issue.validation = true;
            feedback.erros.push({texto: "telefone invalido"})
        }
        
        if(this.isNone(req.body.email)){
            feedback.issue.validation = true;
            feedback.erros.push({texto: "Email invalido"})
        }
        
        if(this.isNone(req.body.password)){
            feedback.issue.validation = true;
            feedback.erros.push({texto: "Password invalido"})
        }

        // Se nao houver erros o, usuario é inserido
        // se houver erros a flag de sucesso é setada
        if(feedback.erros.length == 0){

            await repository.create({           // Adiciona o usuario
                
                cpf     :req.body.cpf,
                name    :req.body.name,
                phone   :req.body.phone,
                email   :req.body.email,
                password:req.body.password,

            // Em caso de sucesso na insercao a flag de sucesso é setada
            // Em caso de erro a flag de excecao é setada e os dados do erro sao adicionados
            }).then(function(){                

                feedback.success = true;

            }).catch(function(answer){                        

                feedback.issue.exception    = true;
                feedback.success            = false;
                feedback.data               = answer

            })
        }
        
        else{
            feedback.success = false;
        }

        return feedback;
    },

       
   /*
   Funcao - Exibir todas os usuarios cadastrados
   retorno - objeto contendo todos os usuarios
   */

    allData: async function(){

        let users;  // recebe todos os usuarios

        // Todos os usuarios sao buscados
        await repository.findAll()
        .then(function(answer){
        
            users = answer;

            // formatando a exibição dos usuarios
            for(i = 0; i<users.length; i++){
                users[i].cpf = userService.formatCPF(users[i].cpf);
                users[i].phone = userService.formatPhone(users[i].phone);
            }
        })

        return users;
    },


    /**
     * Funcao - excluir um usuario
     * parametro - dados do usuario a ser excluido
     * retorno - objeto feedback com o resultado da operacao
    */
    destroy: async function(req, res){
    
        
        let feedback = {        // objeto que contem o resultado da operação
            erros:[],               // erros encontrados
            success: false,         // sucesso na operacao
            exception: false        // houve alguma excecao
        }

        // objeto sendo excluido....
        await repository.destroy({
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
      
       return feedback;

    },


    /**
     * Metodo       :userData
     *              -> retornar os dados do usuario
     * parametro    :id do usuario
     * retorno      :objeto que contem o resultado da operação
     */
    userData: async function(pUserId){

        let fException = false; // flag para a ocorrencia de excecoes
        let fData;              // dados do usuario

        // Se o usuario for encontrado, os dados dele sao armazenados na variavel fData
        // Se ocorrer excecao, fData recebe a excecao encontrada e a flag de excecao é setada
        await repository.findOne({
            where:{
                id: pUserId
            }
        }).then(function(answer){
            fData = answer;
        }).catch(function(answer){
            fException = true;
            fData = answer;
        })

        return{
            exception: fException,
            data: fData
        }

    },


    /**
     * Metodo       :update
     *              -> atualizar os dados do usuario
     * parametro    :dados do usuario vindo do formulario
     * retorno      :objeto que contem o resultado da operação
     */

    update:async function(req, res){

        let feedback = {                // objeto que contem o resultado da operação
                erros   :[],                // erros encontrados
                success :false,             // flag de sucesso
                issue   :{                  // objeto que sinaliza erros
                    exception:false,            // excecao
                    validation:false            // erros de validação (campos em branco, invalidos, ..,)
                },
                data    :""                 // dados do usuario ou possiveis erros
        }

        // Para cada campo, se estiver em branco ou invalidos a flag de erros é setada e
        // a descricao do erro é adicionada ao objto

        if(this.isNone(req.body.name)){
            feedback.issue.validation = true;
            feedback.erros.push({texto: "Nome invalido"})
        }

        if(this.isNone(req.body.phone)){
            feedback.issue.validation = true;
            feedback.erros.push({texto: "telefone invalido"})
        }
        
        if(this.isNone(req.body.email)){
            feedback.issue.validation = true;
            feedback.erros.push({texto: "Email invalido"})
        }

        // Se nao houver erros, a atualizacao de dados é executada
        // Em caso de erros as flags sao setadas e as mensagens de erro adicionadas
        if(feedback.erros.length == 0){
        
            await repository.findOne({

                where:{
                    id: Number.parseInt(req.body.id)
                }

            }).then(function(answer){
                answer.name     = req.body.name 
                answer.phone    = req.body.phone
                answer.email    = req.body.email
                return answer.save()
            }).then(function(user){
                feedback.success = true;
                feedback.data = user
            }).catch(function(answer){
                feedback.issue.validation = true;
                feedback.issue.exception = true;
                feedback.erros += "Erro interno: exception - " + answer;
            })
        }

        return feedback;
    },

};


module.exports = userService;