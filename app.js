// carregando modulos

const express       = require('express')
const handlebars    = require('express-handlebars')
const bodyParser    = require('body-parser')
const app           = express()
// sequelize <<<<<<

const admin = require("./routes/admin")


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


app.use('/admin', admin)


//outros
const PORT = 8051;
app.listen(PORT, () => {
    console.log("Server running...")
})
