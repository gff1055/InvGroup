const express = require("express")
const router = express.Router()


router.get('/', function(req, res){
    res.send("pagina principal GET de getback")
})

router.post('/', function(req, res){
    res.send("pagina principal POST de getback")
})

module.exports = router;