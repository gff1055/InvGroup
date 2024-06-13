
const express = require("express")
const router = express.Router()



router.get('/', function(req, res){
    res.send("pagina principal GET de todas as movimentacoes")
})

router.post('/', function(req, res){
    res.send("pagina principal POST de da movimentacao")
})

router.get('/all', function(req, res){
    res.send("pagina GET de todas as movimentacoes")
})

module.exports = router