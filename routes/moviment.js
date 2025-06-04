
const express = require("express")
const router = express.Router()


const movimentsController = require("../controllers/MovimentsController")




// rota inicial
router.get('/', function(req, res){movimentsController.application(req, res)})


router.post('/', function(req, res){
    res.send("pagina principal POST de da movimentacao")
})

router.get('/all', function(req, res){
    res.send("pagina GET de todas as movimentacoes")
})

module.exports = router