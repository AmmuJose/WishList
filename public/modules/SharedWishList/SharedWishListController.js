'use strict';
angular.module('SharedWishList')
    .controller('SharedWishListController', ['$scope', '$http',
        function ($scope, $http, MyWishListService) {
            $http.get('/dashboard/shared-by-others')
                .then(function (response) {
                    $scope.lists = response.data;
                    angular.forEach($scope.lists, function(list, key) {
                        console.log(list);
                    });
                });

        }]);