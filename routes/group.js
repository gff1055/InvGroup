const express = require("express")
const router = express.Router()
const groupService = require("../services/GroupService")

router.get('/', function(req, res){
    groups = groupService.allData();
    res.render('groups/index', {groups: groups});
})

router.post('/', function(req, res){
    /** fazer store aqui depois */
    res.send("pagina principal POST de grupo")
})

router.delete('/:id', function(req, res){
    /** fazer destroi aqui */
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