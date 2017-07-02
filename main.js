// Inyección de dependencias
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

// Inyección de archivos
var ctrl = require('./controller');
var config = require('./config');

// Inicialización de la aplicación
var app = express();

// Confituración de nuestra API
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.set('port', config.puerto);
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', config.domain);
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
    res.setHeader('Content-Type','application/json');
    next();
});

// Iniciamos las rutas de nuestro servidor/API
var rutas = express.Router();

// Ruta de bienvenida
rutas.get('/', function(req, res) {
   res.send({'Mensaje':'Bienvenido a la API REST de Juan Mora'});
});

app.use(rutas);

app.listen(config.puerto, function() {
    console.log(`Node server ejecutandose en http://localhost:${config.puerto}`);
});
