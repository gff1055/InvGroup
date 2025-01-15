const repository = require('../models/Users') // model da tabela de usuarios


const userService = {

    /** Formata o CPF para cisualizacao */
    formatCPF: function(cpf){
        
        //retira os caracteres indesejados...
        cpf = cpf.replace(/[^\d]/g, "");

        //realizar a formatação...
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    },



    /** Formata o telefone para visualizaca */
    formatPhone: function(phone){
        
        //retira os caracteres indesejados...
        phone = phone.replace(/[^\d]/g, "");

        //realizar a formatação...
        return phone.replace(/(\d{2})(\d{4})(\d{4})/, "($1)$2-$3");
    },

    
    /** Armazena o usuario no banco */
    /** Retorna o resultado da execucao */
    store: async function(req, res){

        var feedback = {
            erros:[],
            success: false,
            exception: false
        }

        
        // Verifica se o nome do usuario é valido
        
        if(!req.body.name || typeof req.body.name == undefined || req.body.name == null)
            feedback.erros.push({texto: "Nome invalido"})
        if(!req.body.phone || typeof req.body.phone == undefined || req.body.phone == null)
            feedback.erros.push({texto: "telefone invalido"})
        if(!req.body.email || typeof req.body.email == undefined || req.body.email == null)
            feedback.erros.push({texto: "Email invalido"})
        if(!req.body.password || typeof req.body.password == undefined || req.body.password == null)
            feedback.erros.push({texto: "Password invalido"})

        /**Se nao houver erros o usuario é inserido */
        if(feedback.erros.length == 0){

            await repository.create({           // Adiciona o usuario
                cpf: req.body.cpf,
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                password: req.body.password,
            }).then(function(){                     // Em caso de sucesso na insercao a mensagem é exibida
                feedback.success = true;
                console.log("feedback.success = true" + feedback.success);
            }).catch(function(){                        // Em caso de erro uma mensagem é exibida
                req.flash("error_msg", "Houve um erro ao salvar o usuario, tente novamente")
                console.log("Erro ao salvar o usuario")
                feedback.exception = true;
                feedback.success = false;
            })
        }
        else{
            feedback.success = false;
        }
        return feedback;
    },

    /** Retorna todos os dados de usuarios */
    allData: async function(){
        let users;
        await repository.findAll().then(
            function(answer){               // Todos os usuarios sao buscados
            users = answer;

            // Os CPF e telefones sao formatados para exibicao
            for(i = 0; i<users.length; i++){
                users[i].cpf = userService.formatCPF(users[i].cpf);
                users[i].phone = userService.formatPhone(users[i].phone);
            }
        })

        return users;
    },


    update: function(){

    },
    

    destroy: async function(req, res){

        // objeto para enviar feedback
        let feedback = {
            erros:[],
            success: false,
            exception: false
        }

        // objeto sendo excluido....
        await repository.destroy({where:{'id': req.body.id}})

        // havendo sucesso ou falha na exclusao, o objeto de feedback recebe o resultado
        .then(function(){
            feedback.success = true;
        })
        .catch(function(erro){
            feedback.exception = true;
        })
      
       return feedback;

    },

};


module.exports = userService;