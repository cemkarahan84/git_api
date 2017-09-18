

'use strict';

//  Déclaration des Requires

const express       = require('express');
const app           = express();
var request = require('request');
const router =  express.Router();

const http          = require('http').Server(app);
const path          = require('path');


// Déclaration des variables
let port = process.env.PORT || 3000;

console.log(port);


var resp= {};
// Routing de l'application pour definir le front client
app.use(express.static(path.join(__dirname, 'client')));

// Création du serveur
http.listen(port, () => {
  console.log('\nAPI GIT listening at 127.0.0.1:', port);
});

//Route get qui ecoute le front pour la reception de queries
app.get('/search', function (req, res) {

  var query= req.query;
  var queryOption =query.query;


  console.log(query.select);

  //Declaration des options pour interroger l'api github
  var options = {
    url: 'https://api.github.com/search/repositories?q='+queryOption,
    headers: {
      'User-Agent': 'request'
    }
  };
  // l'appel de la requete
  request(options, function (error, response, body) {
    console.log('statusCode:', response && response.statusCode);
    var obj = JSON.parse(body);

    res.send(JSON.stringify(obj.items));
  });

});


app.get('/repos',function(req,res){

  var query =req.query.query;
  var options = {
    url: 'https://api.github.com/repos/'+query ,
    headers: {
      'User-Agent': 'request'
    }
  };
  console.log(options);

  request(options, function (error, response, body) {
    var obj = JSON.parse(body);


    var committersOptions={
      url:'https://api.github.com/repos/'+query+'/contributors',
      headers: {
        'User-Agent': 'request'
      }
    };


    request(committersOptions,function(error,response,body)
    {
      var obj2= JSON.parse(body)

      var send={repos:obj,
        contributors: obj2};

        res.send(JSON.stringify(send));
      });



    });

    console.log(res);

  })
