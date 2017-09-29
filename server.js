'use strict';

//  Déclaration des Requires

const express = require('express');
const app = express();
var request = require('request');
const router = express.Router();

const http = require('http').Server(app);
const path = require('path');



// Déclaration des variables
let port = process.env.PORT || 3000;





console.log();


var resp = {};
// Routing de l'application pour definir le front client


// Création du serveur
// Création du serveur


app.use(express.static(path.join(__dirname, '/client')));
app.listen(port);

//Route get qui ecoute le front pour la reception de queries
app.get('/search', function(req, res) {

  var query = req.query;
  var queryOption = query.query;




  //Declaration des options pour interroger l'api github
  var options = {
    url: 'https://api.github.com/search/repositories?q=' + queryOption,
    headers: {
      'User-Agent': 'request'
    }
  };




  // l'appel de la requete
  var test = [];

  request(options, function(error, response, body) {

    var obj = JSON.parse(body);


    res.send(JSON.stringify(obj.items));
  });









});

//route listener pour recevoir la demande de commits ,la traiter , et renvoyer la data
app.get('/commits', function(req, res) {

  let query = req.query.query;
  let options = {
    url: 'https://api.github.com/repos/' + query + '/commits',
    headers: {
      'User-Agent': 'request'
    }
  };

//on fetch la data sur github
  request(options, (error, response, body) => {

    let tmp = JSON.parse(body);

    res.send(tmp); //on renvoi au front

  })

})

//route pour les details
app.get('/details', function(req, res) {

  var query = req.query.query;


  var details = {
    url: 'https://api.github.com/repos/' + query,
    headers: {
      'User-Agent': 'request'
    }
  };

//fetch de data details
  request(details, function(error, response, body) {
    var obj = JSON.parse(body);


    var committersOptions = {
      url: 'https://api.github.com/repos/' + query + '/contributors',
      headers: {
        'User-Agent': 'request'
      }
    };

//fetch de data des contributeurs
    request(committersOptions, function(error, response, body) {
      var obj2 = JSON.parse(body)

      var send = {
        repos: obj,
        contributors: obj2
      };

      res.send(JSON.stringify(send)); //on envoi au front avec les deux fetch
    });



  });

  //  console.log(res);

})
