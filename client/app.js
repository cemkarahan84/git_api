/**
 * Déclaration de l'application
 */

'use strict'



var myApp = angular.module('myApp', [
  // Dépendances du "module"
  'ngRoute',
  'routeAppControllers',
  'chart.js',
  'ngAnimate'

]);



var routeAppControllers = angular.module('routeAppControllers', []);




//configuration du routeur
myApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {


    // Système de routage
    $routeProvider
      .when('/', {
        templateUrl: 'home.html',
        controller: 'homeCtrl'
      }).otherwise({
        redirectTo: '/'
      });


  }


]);









routeAppControllers.controller('homeCtrl', ['$scope', '$http', function($scope, $http) {


  //charts datas
  $scope.labels = [];
  $scope.data = [];

  $scope.details = null;


//function recherche
  $scope.searchRepos = function() {
    var search = {
      query: $scope.search,
    };

//route http pour la recherche envoyé au back
    $http.get('/search', {
      params: search
    }).success(
      function(search) {
        console.log(search)
        search =
          $scope.response = search;
      }).error(
      function(error) {
        console.log(error)
      });
  }

//Fonction pour voir les details
  $scope.viewDetails = function(fullname) {

//on formatte la requete
    let query = {
      query: fullname
    };

//route http details au back
    $http.get('/details', {
      params: query
    }).success(
      function(query) {
        $scope.details = query;

        console.log(query.contributors);

        let listName = [];
        let listData = [];

        $scope.labels = listName;
        $scope.data = listData;

        //boucle de maniere a avoir un tableau uniquement des logins et des nombres de contributions
        for (var key in query.contributors) {
          listName.push(query.contributors[key].login);
          listData.push(query.contributors[key].contributions);
        }

        console.log(listName);
      }).error(
      function(error) {
        console.log(error)
      });

//route pour recuperer les commits
    $http.get('/commits', {
      params: query
    }).
    success(function(query) {

      $scope.commits = query;
      var committers=[];

      for (var key1 in query)
      {
        console.log(query[key1].committer.login);

        console.log(committers.length);


        // if(committers.length != 0)
        // {
        //     var x= committers.findIndex(x => x.name === query[key1].committer.login);
        //     if(x <0)
        //     {
        //       console.log(committers[x]);
        //       committers[x].count+= 1;
        //     }
        //     else
        //     {
        //       committers.push({ "name" : query[key1].committer.login, "count": 1});
        //     }
        // }
        // else {
        //     committers.push({ "name" : query[key1].committer.login, "count": 1});
        // }




        //
        // if(committers.findIndex(x  => x.name === query[key1].committer.login))
        // {
        // console.log("OKKK1");
        // }
        // else {
        //   console.log("OK");
        //   committers.push({ "committer" : query[key1].committer.login, "count": 1});
        // }


          // for(var key2 in committers)
          // {
          //   if( query[key1].committer.login)
          //   {
          //     console.log("OKK");
          //     committers[key2].count +=1;
          //   }
          //   else {
          //     committers.push({ "committer" : query[key1].committer.login, "count": 1});
          //   }
          // }


    }
  console.log(committers);

    })



  }





}]);

//not used yet
routeAppControllers.controller('reposCtrl', ['$scope', '$http', function($scope, $http) {



}]);
