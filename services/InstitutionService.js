const repository_institution = require('../models/Institution');
const { allData } = require('./UserService');

const institutionService = {

    store: async function(req, res){

        var feedback = {
            erros: [],
            success: false,
            exception: false
        }

        await repository_institution.create({
            name: req.body.name
        }).then(function(){
            feedback.success = true;
        }).catch(function(){
            req.flash("error_msg", "Houve um erro ao cadastrar a instituicao. Tente novamente")
            feedback.exception = true;
            feedback.success = false;
        })

        return feedback;

    },

    /** Retorna os dados da instituição */
    allData: async function(){
        let institutions;

        await repository_institution.findAll()
        .then(function(answer){
            institutions = answer;
        })
        
        return institutions;

    },



    update: function(){

    },


    
    destroy: async function(req, res){


        // Objeto para enviar feedback
        /*let feedback = {
            erros: [],
        }*/
    },

};


module.exports = institutionService;