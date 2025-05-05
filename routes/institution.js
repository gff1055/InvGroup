
const express = require("express")
const router = express.Router()

const institutionController = require("../controllers/InstitutionsController")

const productsRoutes = require("./products");    // Importa as rotas de produtos

// rota inicial
router.get('/', function(req, res){institutionController.index(req, res)})

// rota post inicial
router.post('/', function(req, res){institutionController.store(req, res)})

router.get('/:id', function(req, res){institutionController.show(req, res);})

router.post('/delete', function(req, res){institutionController.destroy(req, res)})

router.get('/:id/edit', function(req, res){institutionController.edit(req, res)})

router.post('/:id/edit', function(req, res){institutionController.update(req, res)})


// Rotas de produtos no escopo de uma instituição
router.use("/:id/products", productsRoutes);



router.get('/create', function(req, res){
    res.send("pagina GET de /create de institution")
})

router.put('/:id', function(req, res){
    res.send("pagina PUT da instituicao" + req.params.id)
})

module.exports = router