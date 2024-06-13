// carregando modulos

const express       = require('express')
const handlebars    = require('express-handlebars')
const bodyParser    = require('body-parser')
const app           = express()
// sequelize <<<<<<

const admin         = require("./routes/admin")
const user          = require("./routes/user")
const institution   = require("./routes/institution")
const product       = require("./routes/product")
const group         = require("./routes/group")
const moviment      = require("./routes/moviment")
const getback       = require("./routes/getback")



// ******** configuracoes ******

// body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//handlebars -  Template Engine
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    /** Adicao para corrigir o erro de renderizacao */
    runtimeOptions:{
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set('view engine', 'handlebars');


// rotas

app.get('/', function(req, res){
    res.send("pagina principal")
})


app.get('/register', (req, res) => {
    res.send("pagina register")
})


app.get('/login', (req, res) => {
    res.send("pagina login")
})

app.post('/login', (req, res) => {
    res.send("pagina login")
})

/**
 * entidades
 * 
 *                                user-group -----> groups -----> institutions
 *                                  |               |               |
 *                                  |               |               |
 *                                  |               |               |
 *                                  |               |               |
 *                                  |               |               |
 *  user_sociual_data             users      transactions       products
 *
 *  user-notification-clients
 * 
 * RESOURCES                    ACTION  ROUTE NAME
 *  get     /user               index   user.index
 *  post    /user               store   user.store
 *  get     /user/create        create  user.create
 *  get     /user/{user}        show    user.show
 *  put     /user/{user}        update  user.update
 *  delete  /user/{user}        destroy user.destroy
 *  get     /user/{user}/edit   edit    user.edit
 * 
 * Resources(user, UsersController)
 * get /user/moviment action:MovimentsController@index
 *  
 * Resources(instituition, instituitionsController)
 * Resources(instituition/product, instituitionsController)
 * 
 * Resources(group, groupsController)
 * post /group/{group_id}/user  action:GroupsController@userstore
 * 
 * 
 * get /moviment action:MovimentsController@application
 * post /moviment action:MovimentsController@storeApplication
 * get /moviment/all action:MovimentsController@all
 * 
 * get /getback action:MovimentsController@getback
 * post /getback action:MovimentsController@storeGetback
 * 
 * 
 */


app.use('/admin', admin)
app.use('/user', user)
app.use('/institution/product', product)
app.use('/institution', institution)
app.use('/group', group)
app.use('/moviment', moviment)
app.use('/getback', getback)




//outros
const PORT = 8051;
app.listen(PORT, () => {
    console.log("Server running...")
})
