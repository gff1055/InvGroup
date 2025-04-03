
const userService = require("../services/UserService")


const userController = {

    /**
     * index    :renderiza a pagina de inicial de usuarios
     * retorno  :view renderizada
     */
    index: function(req, res){
    
        userService.allData()
        // retorna todos os dados de usuarios
        .then((users) => {
            res.render("user/index", {users: users})
        })
    },
    

    /**
     * store    :aciona o service para adição do usuario
     */
    store: function(req, res){

        // funcao para adicionar usuario é chamada
        // Se houve falha na adição, a pagina é renderizada novamente indicando o erro

        let varFunc = userService.store(req, res)
        .then((answer) => {
            
            
            if(answer.issue.validation == true){
                res.render("user/index", {feedback:answer})
            }

            else if(answer.issue.exception == true){
                req.flash("error_msg", "Houve um erro ao salvar> " + answer.data)
                res.redirect("/user")
            }
            
            else if(answer.success == true){
                req.flash("success_msg", "Usuario cadastrado")
                res.redirect("/user")
            }
            
        });
    },


    /**
     * store    :aciona o service para exclusao do usuario
     */

    destroy: function(req, res){

        // chamando funcao para excluir o usuario
        // Se houve falha na exclusao, a pagina é renderizada novamente indicando o erro
        // Se houver sucesso, a mensagem é exibida

        userService.destroy(req, res)
        .then((answer)=>{

            if(answer.success != true){
                res.render("user/index", {feedback:answer})
            }

            else{
                req.flash("success_msg", "Usuario excluido")
                res.redirect("/user")
            }
        });
    },


    /**edit: renderizar a pagina de edicao do usuario  */
    edit: function(req, res){

        let fUser
        
        userService.userData(req.params.id)
        .then(function(answer){
            console.log(answer);
            res.render("user/edit", {user:answer})
        })
    },


    /** acionar o service para atualizacao dos dados de um usuario */
    update: function(req,res){

        // Se houve falha na atualização, a pagina é renderizada novamente indicando o erro
        userService.update(req,res)
        .then(function(answer){

            if(answer.issue.validation == true){
                res.render("user/edit", {user:answer})
            }
            else if(answer.success == true){
                console.log("else if(answer.success == true){")
                req.flash("success_msg", "Dados do usuario atualizado")
                res.redirect('/user/'+req.params.id+'/edit')
            }

        }).catch(function(error){                                           // falha na listagem
            res.redirect("/user/"+req.params.id+"/edit");
            
        })
    },
}

module.exports = userController;