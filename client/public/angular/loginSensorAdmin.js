/**
 * Created by soham on 4/16/16.
 */
//loading the 'login' angularJS module
var loginSensorAdmin = angular.module('loginSensorAdmin', []);
//defining the login controller
loginSensorAdmin.controller('loginSensorAdmin', function($scope, $http) {
    //Initializing the 'invalid_login' and 'unexpected_error'
    //to be hidden in the UI by setting them true,
    //Note: They become visible when we set them to false
    $scope.invalid_login = true;
    $scope.unexpected_error = true;
    $scope.submit = function() {
        $http({
            method : "POST",
            url : '/loginCheckSensorAdmin',
            data : {
                "username" : $scope.username,
                "password" : $scope.password
            }
        }).success(function(data) {

            //checking the response data for statusCode

            alert(JSON.stringify(data));

            if (data.status == 300) {
                $scope.invalid_login = false;
                $scope.unexpected_error = true;
            }
            else {

                //Making a get call to the '/redirectToHomepage' API
                window.location.assign("/sensorAdminDashboard");
            }
        }).error(function(error) {
            $scope.unexpected_error = false;
            $scope.invalid_login = true;
        });
    };
})
