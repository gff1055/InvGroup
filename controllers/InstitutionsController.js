const institutionService = require("../services/InstitutionService");

const institutionController = {

    index:function(req, res){

        // funcao que retorna todos os dados
        institutionService.allData()
        .then(function(institutions){
            console.log(institutions);
            res.render("institution/index", {institutions: institutions})
        })

    },



    store: function(req, res){
        
        // funcao para adicionar a instituicao é chamaada
        institutionService.store(req, res)
        .then(function(answer){
            
            // Se houve falha na adicao, a pagina é renderizada novamente indicando o erro
            if(answer.success != true){
                res.render("institution/index", {feedback:answer})
            }

            // Se houver sucesso, a mensagem é exibida
            else{
                req.flash("success_msg","Instituicao cadastrada!")
                res.redirect("/institution")
            }
        })
    },



    destroy: function(req, res){
        
        // chamando funcao para excluir o usuario
        institutionService.destroy(req, res)
        .then(function(answer){

            // Se houve falha na exclusao, a pagina é renderizada novamente indicando o erro
            if(answer.success != true){
                res.render("institution/index", {feedback:answer})
            }

            // Se houver sucesso, a mensagem é exibida
            else{
                req.flash("success_msg", "Instituição excluida")
                res.redirect("/institution")
            }
        })
    }
}

module.exports = institutionController