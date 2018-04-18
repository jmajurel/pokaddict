var express = require('express');
var pokemonsRouter = require('./routes/pokemons');

var app = express();

const port = process.env.PORT || 8080

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.set('view engine', 'pug');

app.use('/pokemons', pokemonsRouter);

app.listen(port);

