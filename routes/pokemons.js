var express = require('express');
var request = require('request');

var router = express.Router();

var url = 'http://localhost:3000/api/pokemons/';

router.get('/', function(req, res){
  request.get(url)
    .on('response', function(response){
      if(response.statusCode !== 200){
	console.log("wrong statusCode!");
      } else {
	response.on('data', function(data){
	  var pokemons = JSON.parse(data);
	  console.log(pokemons);
          res.render('index', {pokemons: pokemons, url: url});
	});
      }
    })
    .on('error', function(error){
      console.log(err);
    })
});

router.get('/:id', function(req, res){
  request.get(url + req.params.id)
    .on('response', function(response){
      if(response.statusCode !== 200){
	console.log("wrong statusCode!");
      } else {
	response.on('data', function(data){
	  var pokemon = JSON.parse(data);
          res.render('show', {pokemon: pokemon});
	});
      }
    })
    .on('error', function(error){
      console.log(err);
    })


});

module.exports = router;
