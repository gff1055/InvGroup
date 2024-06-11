const express = require("express")
const router = express.Router()

router.get('/', function(req, res){
    res.send("pagina principal GET de grupo")
})

router.post('/', function(req, res){
    res.send("pagina principal POST de grupo")
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

router.delete('/:id', function(req, res){
    res.send("pagina DELETE de grupo" + req.params.id)
})

router.get('/:id/edit', function(req, res){
    res.send("pagina GET de edicao de grupo" + req.params.id)
})

module.exports = router