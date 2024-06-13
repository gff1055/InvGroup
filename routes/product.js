const express = require("express")
const router = express.Router()

router.get('/', function(req, res){
    res.send("pagina principal GET de product de instituition")
})

router.post('/', function(req, res){
    res.send("pagina principal POST de product de instituition")
})

router.get('/create', function(req, res){
    res.send("pagina GET de /create de product de institution")
})

router.get('/:id', function(req, res){
    res.send("pagina GET de produto da instituicao" + req.params.id)
})

router.put('/:id', function(req, res){
    res.send("pagina PUT de produto da instituicao" + req.params.id)
})

router.delete('/:id', function(req, res){
    res.send("pagina DELETE de produto da instituicao" + req.params.id)
})

router.get('/:id/edit', function(req, res){
    res.send("pagina GET de edicao de produto da instituicao" + req.params.id)
})

module.exports = router