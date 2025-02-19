const express = require("express")
const router = express.Router()
const groupController = require("../controllers/GroupControllers")

router.get('/', function(req, res){
    groupController.index(req, res);
})

router.post('/',function(req, res){
    groupController.store(req, res);
})

router.post('/delete', function(req, res){
    groupController.destroy(req, res);
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