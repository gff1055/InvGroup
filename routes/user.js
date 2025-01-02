const express = require("express")
const router = express.Router()
const userService = require("../services/UserService")

router.get('/', function(req, res){
    
    // funcao que retorna todos os dados
    userService.allData().then((users) => {
    res.render("user/index", {users: users})
    });    
})




router.post('/', function(req, res){

    // funcao para adicionar usuario é chamada
    let varFunc = userService.store(req, res)
        .then((answer) => {

            // Se houve falha na adição, a pagina é renderizada novamente indicando o erro
            if(answer.success != true){
                res.render("user/index", {feedback:answer})
            }

            // Se houver sucesso, a mensagem é exibida
            else{
                console.log("passou aqui " + answer.success)
                req.flash("success_msg", "Usuario cadastrado!")
                res.redirect("/user")
            }
        });
})



/** rota para excluir um usuario */
router.post('/delete', function(req, res){

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
})


/*router.delete('/:id', function(req, res){
    res.send("pagina DELETE do usuario" + req.params.id)
})*/

router.get('/create', function(req, res){
    res.send("pagina GET de /create")
})

router.get('/moviment', function(req, res){
    res.send("pagina GET de movimentos do usuario")
})

router.get('/:id', function(req, res){
    res.send("pagina GET do usuario" + req.params.id)
})

router.put('/:id', function(req, res){
    res.send("pagina PUT do usuario" + req.params.id)
})

router.get('/:id/edit', function(req, res){
    res.send("pagina GET de edicao do usuario" + req.params.id)
})

module.exports = router