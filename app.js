var express = require('express');
var bodyParser = require('body-parser');

var pokemonsRouter = require('./routes/pokemons');

var app = express();

const port = process.env.PORT || 8080

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: false}));

app.use('/pokemons', pokemonsRouter);
app.get('/', function(req, res){
  res.render('welcome');
});

app.listen(port);

