const express = require("express")
const router = express.Router()

router.get('/', function(req, res){
    res.send("pagina principal GET de users")
})

router.post('/', function(req, res){
    res.send("pagina principal POST de users")
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