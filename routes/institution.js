const express = require("express")
const router = express.Router()

router.get('/', function(req, res){
    res.send("pagina principal GET de instituition")
})

router.post('/', function(req, res){
    res.send("pagina principal POST de instituition")
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

router.delete('/:id', function(req, res){
    res.send("pagina DELETE da instituicao" + req.params.id)
})

router.get('/:id/edit', function(req, res){
    res.send("pagina GET de edicao da instituicao" + req.params.id)
})

module.exports = router