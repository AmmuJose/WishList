'use strict';

angular.module('AddWishList')
.factory('AddWishListService', ['$http', function($http){
    return{
        create: function(data){
            console.log("calling api" + data);
            return $http.post('/api/lists', data);
        }
    }
}]);