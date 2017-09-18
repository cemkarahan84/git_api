/**
 * Déclaration de l'application
 */
var myApp = angular.module('myApp', [
    // Dépendances du "module"
    'ngRoute',
    'routeAppControllers'
]);

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






var search = angular.module('search', []);


routeAppControllers.controller('homeCtrl',['$scope','$http',function($scope,$http){


$scope.details=null;

  $scope.addToList=function()
  {
       var newAdd = {query :$scope.search,
                    };


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


  $http.get('/repos',{params:query}).success(
   function(query){
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
