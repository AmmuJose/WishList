'use strict'
angular.module('AddWishList')
    .controller('AddWishListController', ['$scope', '$http', 'AddWishListService', '$timeout',
        function ($scope, $http, AddWishListService, $timeout) {
            $scope.items = [];
            $scope.addItem = function () {
                $scope.errortext = "";

                if ($scope.items.length < 1) {
                    $scope.items.push($scope.item);
                } else {
                    var check = false;
                    angular.forEach($scope.items, function (obj, key) {
                        if (obj.name == $scope.item.name && obj.description == $scope.item.description) {
                            $scope.errortext = "This item is already in your list.";
                            check = true;
                        }
                    });
                    if (!check) {
                        $scope.items.push($scope.item);
                    }
                }
                console.log($scope.items);
                $scope.item = {};
            }

            $scope.removeItem = function (x) {
                $scope.errortext = "";
                $scope.items.splice(x, 1);
            }

            $scope.createWishList = function () {
                var data = {
                    title: $scope.title,
                    items: $scope.items
                }

                AddWishListService.create(data).then(function (data) {
                    console.log(data);
                    $scope.items = [];
                    $scope.item = {};
                    $scope.title = "";
                    $scope.errortext = "Your List has been Saved.";
                    $timeout(function () {
                        $scope.errortext = "";
                    }, 2000);
                });
            }
        }]);