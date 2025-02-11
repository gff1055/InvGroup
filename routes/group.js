const express = require("express")
const router = express.Router()
const groupService = require("../services/GroupService")

router.get('/', function(req, res){
    /*groups = groupService.allData();*/
    groups = 0;
    res.render('groups/index', {groups: groups});
})

router.post('/', function(req, res){
    
    // funcao para adicionar grupo é chamada

    let varFunc = groupService.store(req, res)
    .then((answer) => {

        // Se houve falha na adicao, a pagina é renderizada novamente indicando o erro
        if(answer.success != true){
            res.render("groups/index", {feedback:answer})
        }

        // Se houver sucesso, a mensagem é exibida
        else{
            req.flash("success_msg", "Grupo cadastrado!")
            res.redirect("/group")
        }


    })

})

router.post('/delete', function(req, res){


    // chamando a funcao para xcluir o grupo
    groupService.destroy(req, res)
    .then(function(answer){

        // Se houve falha na exclusao
        // a pagina é renderizada indicando o erro

        if(answer.success != true){
            res.render("group/index", {feedback:answer})
        }

        // Se houver sucesso, a mensagem é exibida
        else{
            req.flash("success_msg", "Usuario excluido")
            res.redirect("/group")
        }
    });
   res.send("pagina GET de /create de grupo")
})

router.get('/create', function(req, res){
    res.send("pagina GET de /create de grupo")
})

router.get('/:id', function(req, res){
    res.send("pagina GET de grupo" + req.params.id)
})

router.put('/:id', function(req, res){
    res.send("pagina PUT de grupo" + req.params.id)
})

router.get('/:id/edit', function(req, res){
    res.send("pagina GET de edicao de grupo" + req.params.id)
})

router.post('/:id/user', function(req, res){
    res.send("pagina post do grupo " + req.params.id + " do usuario")
})

module.exports = router