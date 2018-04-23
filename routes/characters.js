var express = require("express");
var request = require('request');

var router = express.Route();


//INDEX Route
router.get('/', function(req, res){

  res.render('./characters/index', {characters: characters});
});

module.exports = router;
