var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var pokemonsRouter = require('./routes/pokemons');
var charactersRouter = require('./routes/characters');

var app = express();

const port = process.env.PORT || 8081
app.use(methodOverride('_method'));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: false}));

app.use('/pokemons', pokemonsRouter);
app.use('/characters', charactersRouter);

app.get('/', function(req, res){
  res.render('welcome');
});

app.listen(port);

