// inportando bibliotecas
const express = require("express");
//const session = require("express-session");
const bodyParser = require("body-parser");
const path = require('path');
const cors =  require('cors')
const dotenv = require('dotenv')


//config do dotenv -variaveis de ambiente
dotenv.config();


//rota com o front
const routes = require("./src/routes/front.route")


//Propriedades do servidor
const app = express();
const port = process.env.PORT || 4500;


app.set('view engine', 'ejs');
//app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/src/views'));

app.use(express.static(__dirname + '/src/views'));
app.use(express.static(__dirname + '/src/views/scripts'));
app.use(express.static(__dirname + '/src/views/img'));


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Rotas do frontend
app.use(cors())
app.use(routes);

//pegando o ip
const os = require('os');

const interfaces = os.networkInterfaces();
const addresses = [];
for (const k in interfaces) {
    for (const k2 in interfaces[k]) {
        const address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}

// Cria um servidor HTTP e uma escuta de requisições para a porta 8000
app.listen(port,()=>{
    // Imprime no console a URL de acesso ao servidor
    console.log('FrontEnd executando em: '+addresses+':'+port+'');
});