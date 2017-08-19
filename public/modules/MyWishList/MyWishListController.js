'use strict';
angular.module('MyWishList')
    .controller('MyWishListController', ['$scope', '$route', '$http', 'MyWishListService', '$timeout',
        function ($scope, $route, $http, MyWishListService, $timeout) {
            $scope.emails = {};
            $scope.errortext = {};
            $http.get('/dashboard/get-all-lists')
                .then(function (response) {
                    $scope.lists = response.data;
                    angular.forEach($scope.lists, function (list, key) {
                        $scope.emails[list._id] = [];
                        $scope.errortext[list._id] = "";
                    });
                });


            $scope.sendMail = function (listId) {
                var data = {};
                console.log(listId);
                data.emails = $scope.emails[listId];
                data.listId = listId;

                angular.forEach($scope.lists, function (list, key) {
                    if (list._id == listId) {
                        data.title = list.title;
                    }
                });
                console.log($scope.errortext);
                MyWishListService.share(data).then(function (res) {
                    angular.forEach($scope.lists, function (list, key) {
                        if (list._id == listId) {
                            data.title = list.title;
                            angular.forEach($scope.emails[listId], function (value, index) {
                                if (list.shared_with.indexOf(value) == -1) {
                                    list.shared_with.push(value);
                                }
                            });
                        }
                    });
                    $scope.errortext[listId] = res.data.success;
                    $scope.emails[listId] = [];
                    $timeout(function () {
                        $scope.errortext[listId] = "";
                    }, 2000);
                });

            };

            $scope.addEmail = function () {
                $scope.errortext = {};
                angular.forEach($scope.lists, function (list, key) {
                    if (!$scope.lists[list._id]) { return; }
                    if ($scope.emails[list._id].indexOf($scope.lists[list._id]) == -1) {
                        $scope.emails[list._id].push($scope.lists[list._id]);
                        $scope.lists[list._id] = "";
                    } else {
                        $scope.errortext[list._id] = "You have already Entered this email."
                        $timeout(function () {
                            $scope.errortext[list._id] = "";
                        }, 2000);
                    }
                });
            };

            $scope.removeItem = function (x, listId) {
                $scope.errortext = {};
                $scope.emails[listId].splice(x, 1);
            };
        }]);