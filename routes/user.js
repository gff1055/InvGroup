const express = require("express")
const router = express.Router()
let usersController = require("../controllers/UsersController")



router.get('/', function(req, res){usersController.index(req, res)})

router.post('/', function(req, res){usersController.store(req, res)})

router.post('/delete', function(req, res){usersController.destroy(req, res)})

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