
const userService = require("../services/UserService")


const userController = {

    index: function(req, res){
    
        // funcao que retorna todos os dados
        userService.allData()
        .then((users) => {
            res.render("user/index", {users: users})
        })
    },
    
    
    store: function(req, res){

        // funcao para adicionar usuario é chamada
        let varFunc = userService.store(req, res)
        .then((answer) => {
            
            // Se houve falha na adição, a pagina é renderizada novamente indicando o erro
            if(answer.success != true){
                res.render("user/index", {feedback:answer})
            }

            // Se houver sucesso, a mensagem é exibida
            else{
                req.flash("success_msg", "Usuario cadastrado!")
                res.redirect("/user")
            }
        });
    },


    
    destroy: function(req, res){

        // chamando funcao para excluir o usuario
        userService.destroy(req, res)
        .then((answer)=>{

            // Se houve falha na exclusao, a pagina é renderizada novamente indicando o erro
            if(answer.success != true){
                res.render("user/index", {feedback:answer})
            }

            // Se houver sucesso, a mensagem é exibida
            else{
                req.flash("success_msg", "Usuario excluido")
                res.redirect("/user")
            }
        });
    },


}

module.exports = userController;