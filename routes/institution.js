const express = require("express")
const router = express.Router()
const institutionController = require("../controllers/InstitutionsController")

// rota inicial
router.get('/', function(req, res){
    institutionController.index(req, res)
})

// rota post inicial
router.post('/', function(req, res){
    institutionController.store(req, res)
})

router.get('/:id', function(req, res){
    institutionController.show(req, res);
})

router.post('/delete', function(req, res){
    institutionController.destroy(req, res)
})


router.get('/create', function(req, res){
    res.send("pagina GET de /create de institution")
})

router.put('/:id', function(req, res){
    res.send("pagina PUT da instituicao" + req.params.id)
})

router.get('/:id/edit', function(req, res){
    res.send("pagina GET de edicao da instituicao" + req.params.id)
})

module.exports = router