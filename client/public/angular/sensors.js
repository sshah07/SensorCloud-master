
var Sensors = angular.module('Sensors', []);

Sensors.controller('addSensor', function($scope, $http) {

    $scope.addSensor = function() {

        $http({

            method : "POST",
            url : '/addSensorData',
            data : {
                "name" : $scope.name,
                "desc" : $scope.description,
                "owner": $scope.owner,
                "to"   : $scope.to,
                "from" : $scope.from,
                "type" : $scope.type,
                "format":$scope.format,
                "city" :$scope.city,
                "state" : $scope.state,
                "status":$scope.status
            }
        }).success(function(data) {
            //checking the response data for statusCode

            if(data.status == 400){
                alert("something went wrong !");
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

Sensors.controller('listSensors',function($scope, $http) {
    // $scope.btnclass = false;

    $http({

        method: "GET",
        url: '/listSensors'

    }).success(function (data) {
        //checking the response data for statusCode

        if (data.status == 400) {
            alert("something went wrong !");
        }

        else {

            for (i = 0; i < data.data.length; i++) {
                if (data.data[i].status == false) {

                    data.data[i].status = "activate";
                }
                else {
                    data.data[i].status = "deactivate";

                }

            }
            $scope.sensorInfo = data.data;

        }
    });

    $scope.activity = function (name, status) {


        if (status=="activate") {

            $http({

                method: "POST",
                url: "/activateSensor",
                data: {
                    "name": name
                }

            }).success(function (data) {
                $http({

                    method: "GET",
                    url: '/listSensors'

                }).success(function (data) {


                    if (data.status == 400) {
                        alert("something went wrong !");
                    }

                    else {

                        for (i = 0; i < data.data.length; i++) {
                            if (data.data[i].status == false) {

                                data.data[i].status = "activate";

                            }
                            else {
                                data.data[i].status = "deactivate";

                            }

                        }
                        $scope.sensorInfo = data.data;

                    }
                })
            })
        }
        else{

            $http({

                method: "POST",
                url: "/deactivateSensor",
                data: {
                    "name": name
                }

            }).success(function (data) {
                $http({

                    method: "GET",
                    url: '/listSensors'

                }).success(function (data) {
                    //checking the response data for statusCode

                    if (data.status == 400) {
                        alert("something went wrong !");
                    }

                    else {

                        for (i = 0; i < data.data.length; i++) {
                            if (data.data[i].status == false) {

                                data.data[i].status = "activate";
                                $scope.activated = false;
                            }
                            else {
                                data.data[i].status = "deactivate";
                                $scope.activated = true;
                            }

                        }
                        $scope.sensorInfo = data.data;

                    }
                })
            })

        }

    }
});
