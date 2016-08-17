
var app = angular.module('signup', []);
//defining the login controller
app.controller('signup', function($scope, $http) {
    //alert("s");

    $scope.submit = function($event){
        angular.forEach($scope.registration.$error.required, function(field) {
            field.$setDirty();
        });
        if($scope.registration.$error.required){
            //alert("You must enter your details");
            $event.preventDefault();
        }
        else{

            $http({
                method : "POST",
                url : '/registerUser',
                data : {

                    "fullName" : $scope.fullName,
                    "email" : $scope.email,
                    "password" : $scope.password,
                    "city" : $scope.city,
                    "state" : $scope.state,
                    "zipcode" : $scope.zipcode,
                    "creditcard" : $scope.creditcard,
                    "phone" : $scope.phone

                }
            }).success(function(data) {
                alert(JSON.stringify(data));
                //checking the response data for statusCode
                if (data.status == 400) {

                    $scope.error = "Can not signup !";
                }
                else{

                    window.location.assign("/loginUser");
                }
            }).error(function(error) {
                $scope.unexpected_error = "something is wrong!";

            });

        }
    }
});