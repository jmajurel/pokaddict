var express = require('express');
var request = require('request');

var router = express.Router();

const apiurl = 'http://localhost:3000/api/pokemons/';
const appurl = 'http://localhost:8080/pokemons/';

//Index route
router.get('/', function(req, res){

  request.get(apiurl)
    .on('response', function(response){
      if(response.statusCode !== 200){
	console.log("wrong statusCode!");
      } else {
	response.on('data', function(data){
	  var pokemons = JSON.parse(data);
          res.render('./pokemons/index', {pokemons: pokemons, url: appurl});
	});
      }
    })
    .on('error', function(error){
      console.log(err);
    })
});

//New Route
router.get("/new", function(req, res){
  res.render("./pokemons/new");
});

router.post("/", function(req, res){
  console.log(req.body.pokemon);
});

//Show Route
router.get('/:id', function(req, res){

  request.get(apiurl + req.params.id)
    .on('response', function(response){
      if(response.statusCode !== 200){
	console.log("wrong statusCode!");
      } else {
	response.on('data', function(data){
	  var pokemon = JSON.parse(data);
          res.render('./pokemons/show', {pokemon: pokemon, url: appurl});
	});
      }
    })
    .on('error', function(error){
      console.log(err);
    })
});

module.exports = router;
