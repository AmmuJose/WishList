'use strict';

angular.module('MyWishList')
.factory('MyWishListService', ['$http', function($http){
    return{
        share: function(data){
            return $http.post('/share', data);
        }
    }
}]);