

'use strict';

// Requires

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
// Routing           /!\ Remplacer le dossier View par le nom du dossier qui contient votre client /!\
app.use(express.static(path.join(__dirname, 'client')));

// Création du serveur
http.listen(port, () => {
  console.log('\nTP1 listening at 127.0.0.1:', port);
});

app.get('/search', function (req, res) {

var query= req.query;
var queryOption =query.query;


 console.log(query.select);
 console.log("Add function called..");


 var options = {
   url: 'https://api.github.com/search/repositories?q='+queryOption,
   headers: {
     'User-Agent': 'request'
   }
 };

 request(options, function (error, response, body) {
   //console.log('error:', error); // Print the error if one occurred
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
   var obj = JSON.parse(body);
  // console.log(obj.items);
res.send(JSON.stringify(obj.items));
 });

// contactList.push(req.query);


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
  //console.log('error:', error); // Print the error if one occurred
 // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
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

//
// function callback(error, response, body) {
//   if (!error && response.statusCode == 200) {
//     var info = JSON.parse(body);
//   console.log(info.login);
//   }
// }
//
// request(options, callback);
