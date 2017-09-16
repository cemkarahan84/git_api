
//Déclaration de l'application

var myApp = angular.module('myApp', [
  // Dépendances du "module"
  'ngRoute',
  'routeAppControllers'
]);

//Initialisation du module
var routeAppControllers = angular.module('routeAppControllers', []);


myApp.config(['$routeProvider','$locationProvider',
function($routeProvider,$locationProvider) {


  // Système de routage
  $routeProvider
  .when('/', {
    templateUrl: 'home.html',
    controller: 'homeCtrl'
  })
  .when('/home', {
    templateUrl: 'repos.html',
    controller: 'reposCtrl'
  }).otherwise({
    redirectTo: '/'
  });


}


]);


//Creation du home controller
routeAppControllers.controller('homeCtrl',['$scope','$http',function($scope,$http){


  $scope.details=null;

  $scope.addToList=function()
  {
    var newAdd = {query :$scope.search,
    };


//Routage pour la recherche a envoyer au back
    $http.get('/search',{params:newAdd}).success(
      function(newAdd){
        console.log(newAdd)
        $scope.response=newAdd;

      }).error(
        function(error){
          console.log(error)
        });
      }

      $scope.viewDetails=function(fullname)
      {

        let query={
          query: fullname
        };

//Routage pour les details a envoyer au back
        $http.get('/repos',{params:query}).success(
          function(query,query2){
            $scope.details=query;
            console.log(query);
          }).error(
            function(error){
              console.log(error)
            });

          }


        }]);


        routeAppControllers.controller('reposCtrl',['$scope','$http',function($scope,$http){



        }]);
