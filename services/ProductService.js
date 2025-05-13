const productsRepository = require('../models/Products');



const productService = {


    /**
     * isNone       :verifica se o valor do campo é vazio ou invalido
     * 
     * parametros   :campo do formulario
     * retorno      :true ou false
     */
    isNone: function(pField){
        if(!pField || typeof pField == undefined || pField == null){
            return true;
        }

        return false;
    },


    /*Funcao - Cadastrar o produto
     *Parametro - dados do produto
     *retorno - objeto contendo o feedback 
     */

    store: async function(req){
        
        let name            = req.body.name;
        let description     = req.body.description;
        let index           = req.body.index;
        let interest_rate   = req.body.interest_rate;
        let institution_id  = req.params.id; 

        let feedback = {
        // objeto que mostra o feedback da operacap
            erros:[],
            success: false,
            issue:{
                exception   :false,
                validation  :false
            },
            data:""
        }

        
        // Se algum dos campos estiver em branco ou invalido a flag de erros é setada e
        // a descricao do erro é adicionada ao objto

        if(this.isNone(name)){
            feedback.issue.validation = true;
            feedback.erros.push({texto: "Nome"})
        }

        if(this.isNone(description)){
            feedback.issue.validation = true;
            feedback.erros.push({texto: "Descricao"})
        }

        if(this.isNone(index)){
            feedback.issue.validation = true;
            feedback.erros.push({texto: "Indexador"})
        }

        if(this.isNone(interest_rate)){
            feedback.issue.validation = true;
            feedback.erros.push({texto: "Taxa de juros"})
        }

        // Se nao houver erros, o cadastro do produto é executado
        // Em caso de excecao as flags sao setadas e as mensagens de excecao adicionada
        if(feedback.erros.length == 0){

            await productsRepository.create({

                name            : name,
                description     : description,
                index           : index,
                interest_rate   : interest_rate,
                institution_id  : institution_id
                
            }).then(function(){
                feedback.success = true;
            }).catch(function(answer){
    
                feedback.issue.exception    = true;
                feedback.success            = false;
                feedback.data               = answer;
    
            })
        }

        return feedback;
    },

};



module.exports = productService;

