const express = require("express")
const router = express.Router()
const userService = require("../services/UserService")

router.get('/', function(req, res){
    
    userService.allData().then((users) => {
        /*console.log("USERS EM GET");console.log(users);*/
        //es.send("pagina principal GET de users")
    res.render("user/index", {users: users})
    });    
})

router.post('/', function(req, res){
    let varFunc = userService.store(req, res)
        .then((answer) => {
            console.log("dentro do console" + answer.success);
            if(answer.success != true){
                res.render("user/index", {feedback:answer})
            }
            else{
                console.log("passou aqui " + answer.success)
                req.flash("success_msg", "Usuario cadastrado!")
                res.redirect("/user")
            }
        });
})

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

router.delete('/:id', function(req, res){
    res.send("pagina DELETE do usuario" + req.params.id)
})

router.get('/:id/edit', function(req, res){
    res.send("pagina GET de edicao do usuario" + req.params.id)
})

module.exports = router