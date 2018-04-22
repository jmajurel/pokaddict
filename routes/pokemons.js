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
      console.log(error);
    })
});

//New Route
router.get("/new", function(req, res){
  res.render("./pokemons/new");
});

//Create route
router.post("/", function(req, res){

  var pokemon = {
    name: req.body.name,
    picture: req.body.picture,
    type: req.body.type
   };
   request.post({
     uri: apiurl, 
     form: pokemon
     })
     .on('response', function(response){
       console.log(response.statusCode);
       if(response.statusCode !== 201){
         console.log('wrong statusCode!');
       } else {
         res.redirect('/pokemons');
       }
     })
     .on('error', function(error){
       console.log(error);
     });
});

//Edit route 
router.get('/edit/:id', function(req, res){
  request.get(apiurl + req.params.id)
    .on('response', function(response){
      if(response.statusCode !== 200){
        console.log("wrong statusCode!");
      } else {
        response.on('data', function(data){
          res.render('./pokemons/edit', {pokemon: JSON.parse(data)});
        })
      }
    })
    .on('error', function(error){
      console.log(error);
    })
});

//Update route
router.put('/:id', function(req, res){
  console.log(req.body);
  request.put({ 
    uri: apiurl + req.params.id,
    form: req.body
    })
    .on('response', function(response){
      if(response.statusCode !== 201){
        console.log("wrong statusCode!");
      } else {
        res.redirect('/pokemons');
      }
    })
    .on('error', function(error){
      console.log(error);
    });
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
          res.render('./pokemons/show', {pokemon: pokemon});
	});
      }
    })
    .on('error', function(error){
      console.log(err);
    })
});

module.exports = router;
