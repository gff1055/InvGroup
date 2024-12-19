const repository = require('../models/Users')


const userService = {

    formatCPF: function(cpf){
        
        //retira os caracteres indesejados...
        cpf = cpf.replace(/[^\d]/g, "");

        //realizar a formatação...
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    },

    formatPhone: function(phone){
        
        //retira os caracteres indesejados...
        phone = phone.replace(/[^\d]/g, "");

        //realizar a formatação...
        return phone.replace(/(\d{2})(\d{4})(\d{4})/, "($1)$2-$3");
    },

    store: async function(req, res){

        var feedback = {
            erros:[],
            success: false,
            exception: false
        }

        

        if(!req.body.name || typeof req.body.name == undefined || req.body.name == null)
            feedback.erros.push({texto: "Nome invalido"})
        if(!req.body.phone || typeof req.body.phone == undefined || req.body.phone == null)
            feedback.erros.push({texto: "telefone invalido"})
        if(!req.body.email || typeof req.body.email == undefined || req.body.email == null)
            feedback.erros.push({texto: "Email invalido"})
        if(!req.body.password || typeof req.body.password == undefined || req.body.password == null)
            feedback.erros.push({texto: "Password invalido"})

        if(feedback.erros.length == 0){
            await repository.create({
                cpf: req.body.cpf,
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                password: req.body.password,
            }).then(function(){
                feedback.success = true;
                console.log("feedback.success = true" + feedback.success);
            }).catch(function(){
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


    allData: async function(){
        let users;
        await repository.findAll().then(function(answer){
            users = answer;
            for(i = 0; i<users.length; i++){
                users[i].cpf = userService.formatCPF(users[i].cpf);
                users[i].phone = userService.formatPhone(users[i].phone);
                console.log(userService.formatCPF(users[i].cpf));
            }
        })

        return users;
    },


    update: function(){

    },
    

    delet: function(){
    
    },

};


module.exports = userService;