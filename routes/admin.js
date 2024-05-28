const express = require("express")
const router = express.Router()

router.get('/', function(req, res){
    res.send("pagina principal")
})


router.get('/posts', function(req, res){
    res.send("pagina de posts")
})


router.get('/categorias', function(req, res){
    res.send("pagina de categorias")
})



module.exports = router