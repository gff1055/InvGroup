
const express = require("express");
const router = express.Router({ mergeParams: true }); // mergeParams garante acesso ao parâmetro ':id' da rota pai
const productsController = require("../controllers/ProductsController");

// rota inicial
router.get('/', function(req, res){
    productsController.index(req, res)
})

router.post('/', function(req, res){
    productsController.store(req, res)
})

router.get('/create', function(req, res){
    res.send("pagina GET de /create de product de institution")
})

router.get('/:productId', function(req, res){
    console.log(req.params);
    res.send("pagina GET de produto" + req.params.id + "da instituicao" + req.params.productId)
})

router.put('/:productId', function(req, res){
    res.send("pagina PUT de produto da instituicao" + req.params.id)
})

router.delete('/:productId', function(req, res){
    res.send("pagina DELETE de produto da instituicao" + req.params.id)
})

router.get('/:productId/edit', function(req, res){
    res.send("pagina GET de edicao de produto da instituicao" + req.params.id)
})

module.exports = router