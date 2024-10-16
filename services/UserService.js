const repository = require('../models/Users')


const userService = {

    store: function(req, res){
        repository.create({
            cpf: req.body.cpf,
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password,
            
        }).then(function(){
            return "Post criado com sucesso"
        }).catch(function(){
            return "Houve um erro: "+erro
        })
            /*console.log(req.body);
            return "funcao store "+req.body.nome;*/
    },


    update: function(){

    },
    

    delet: function(){
    
    },

};


module.exports = userService;