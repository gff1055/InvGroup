
const repository = require('../models/Groups')


const groupService = {

    store: async function(req, res){

        var feedback = {
            erros:[],
            success: false,
            exception: false
        }

        await repository.create({
            name: req.body.name,
            user_id: req.body.user_id,
            institution_id: req.body.institution_id
        }).then(function(){
            console.log("name",req.body.name)
            console.log("user id",req.body.user_id)
            console.log("inst id",req.body.institution_id)
            feedback.success = true;
            console.log("FROM GROUPS feedback.success = true" + feedback.success);
        }).catch(function(){
            req.flash("error_msg", "Houve um erro ao salvar o grupo, tente novamente")
            console.log("Erro ao salvar o grupo");
                feedback.exception = true;
                feedback.success = false;
        })

        return feedback;
        
        
    },



    allData: function(){
        return true;
    },


    update: function(){
        return true;
    },


    destroy: function(req, res){
/*
        // objeto para enviar feedback
        let feedback = {
            erros:[],
            success: false,
            exception: false
        }

        // objeto sendo excluido
        await repository.destroy({
            where:{
                'id': req.body.id
            }
        })
        .then(function(){
            feedback.success = true;
        })
        .catch(function(erro){
            feedback = true;
        })

        return feedback;*/


    },
};

module.exports = groupService;