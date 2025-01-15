const express = require("express")
const router = express.Router()
const institutionService = require("../services/InstitutionService")

// rota inicial
router.get('/', function(req, res){
    
    // funcao que retorna todos os dados
    institutionService.allData()
    .then(function(institutions){
        console.log(institutions);
        res.render("institution/index", {institutions: institutions})
    })
})



// rota post inicial
router.post('/', function(req, res){

    // funcao para adicionar a instituicao é chamaada
    institutionService.store(req, res)
        .then(function(answer){
            
            // Se houve falha na adicao, a pagina é renderizada novamente indicando o erro
            if(answer.success != true){
                res.render("institution/index", {feedback:answer})
            }

            // Se houver sucesso, a mensagem é exibida
            else{
                req.flash("success_msg","Instituicao cadastrada!")
                res.redirect("/institution")
            }
        })
})



router.post('/delete', function(req, res){

    // chamando funcao para excluir o usuario
    institutionService.destroy(req, res)

    .then(function(answer){

        // Se houve falha na exclusao, a pagina é renderizada novamente indicando o erro
        if(answer.success != true){
            res.render("institution/index", {feedback:answer})
        }

        // Se houver sucesso, a mensagem é exibida
        else{
            req.flash("success_msg", "Usuario excluido")
            res.redirect("/institution")
        }

    })

})


router.get('/create', function(req, res){
    res.send("pagina GET de /create de institution")
})

router.get('/:id', function(req, res){
    res.send("pagina GET da instituicao" + req.params.id)
})

router.put('/:id', function(req, res){
    res.send("pagina PUT da instituicao" + req.params.id)
})

router.get('/:id/edit', function(req, res){
    res.send("pagina GET de edicao da instituicao" + req.params.id)
})

module.exports = router