'use strict'
angular.module('SharedWishList', []);
angular.module('AddWishList', []);
angular.module('MyWishList', []);
angular.module('Home', []);

var app = angular.module('WishList', [
    'SharedWishList',
    'AddWishList',
    'MyWishList',
    'Home',
    'ngRoute', 
    ]);
app.config(function($routeProvider, $locationProvider){
     $locationProvider.hashPrefix('');
    $routeProvider

    .when('/', {
        templateUrl: 'modules/AddWishList/add-wish-list.html',
        controller: 'AddWishListController'
    })

    .when('/add-wish-list', {
        templateUrl: 'modules/AddWishList/add-wish-list.html',
        controller: 'AddWishListController'
    })

    .when('/my-wish-list', {
        templateUrl: 'modules/MyWishList/my-wish-list.html',
        controller: 'MyWishListController'
    })

    .when('/shared-by-others', {
        templateUrl: 'modules/SharedWishList/shared-by-others.html',
        controller: 'SharedWishListController'
    })

    .otherwise({redirectTo: '/'});
});