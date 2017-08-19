
var app = angular.module('wishListApp', ['ngRoute', 'WishListService']);
app.config(function($routeProvider, $locationProvider){
     $locationProvider.hashPrefix('');
    $routeProvider

    .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
    })

    .when('/add-wish-list', {
        templateUrl: 'views/add-wish-list.html',
        controller: 'WishListController'
    })

    .otherwise({redirectTo: '/'});
});

app.controller('HomeController', ['$scope',function($scope){
    $scope.message = "Welcome!!!!";
}]);

app.controller('WishListController', ['$scope', '$http', 'Lists',function($scope, $http, Lists){
    $scope.items = [];
    $scope.addItem = function(){
        $scope.errortest = "";
        if(!$scope.item){return;}
        if($scope.items.indexOf($scope.item) == -1){
            $scope.items.push($scope.item);
        }else{
            $scope.errortext = "This item is already in your list."
        }
    }

    $scope.removeItem = function(x){
        $scope.errortext = "";
        $scope.items.splice(x, 1);
    }

    $scope.createWishList = function(){
        var data = {
            title: $scope.title,
            items: $scope.items
        }

        Lists.create(data).success(function(data) {
						$scope.items = []; // assign our new list of todos
					});

        // if($scope.items.length == 0){
        //     $scope.errortext = "Your wish list is empty."
        // }
        // console.log($scope);
    }
}]);

