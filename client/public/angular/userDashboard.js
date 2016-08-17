
var listActiveSensors = angular.module('listActiveSensors', []);

listActiveSensors.controller('listActiveSensors',['$scope','$rootScope','$http', function($scope,$rootScope, $http) {

    $http({

        method: "GET",
        url: '/listToSubscribeSensors'

    }).success(function (data) {

        $scope.sensors = data.data;


    }).error(function (error) {
        alert('basic error');
    });

    $scope.subscribe = function (name) {


            $http({

                method: "POST",
                url: "/subscribeSensor",
                data: {
                    "name": name
                }

            }).success(function (data) {

                $scope.sensors = data.data;
                $rootScope.$broadcast('buttonClickedFromSubscribe')
            })

    }


}]);

listActiveSensors.controller('travel', function($scope, $http) {

    $scope.check = function () {
        alert($scope.current);
    }
});





listActiveSensors.controller('mySensors',['$scope','$rootScope','$http', function($scope, $rootScope, $http) {

    $http({

        method: "GET",
        url: '/mySensors'

    }).success(function (data) {


        if (data.status == 400) {
            alert("something went wrong !");
        }

        else if(data.status==300){
            alert("No other subscribed sensors !");
        }
        else {

            $scope.mySensors = data.data;
        }

    }).error(function (error) {
        alert('My sensors error');
    });

    $rootScope.$on('buttonClickedFromSubscribe', function () {
        $http({

            method: "GET",
            url: '/mySensors'

        }).success(function (data) {


            if (data.status == 400) {
                alert("something went wrong !");
            }

            else if(data.status==300){
                alert("No other subscribed sensors !");
            }
            else {

                $scope.mySensors = data.data;
            }

        }).error(function (error) {
            alert('My sensors error');
        });
    });


    $scope.unsubscribe = function (name) {

        $http({

            method: "POST",
            url: "/unsubscribeSensor",
            data: {
                "name": name
            }

        }).success(function (data) {

            $http({

                method: "GET",
                url: '/mySensors'

            }).success(function (data) {


                if (data.status == 400) {
                    alert("something went wrong !");
                }
                else if (data.status == 300) {
                    alert("No data");

                }
                else {

                    $scope.mySensors = data.data;
                    $rootScope.$broadcast('buttonClicked');
                }

            }).error(function (error) {
                alert('Unsubscribe error');
            });
        })

    }
}]);


listActiveSensors.controller('analysis', ['$scope', '$rootScope', '$http', function($rootScope, $scope, $http) {

    $scope.currentData = false;
    $scope.forecastData = false;
    $http({

        method: "GET",
        url: '/mySensors'

    }).success(function (data) {


        if (data.status == 400) {
            alert("something went wrong !");
        }

        else if(data.status == 200){


            for(var i = 0; i<data.data.length; i++)
            {
                if (data.data[0].type == "Starter") {
                    $scope.forecastData = false;
                }
            }
            $scope.sensors = data.data;

        }

    }).error(function (error) {
        alert("ERROR");
    });

    $rootScope.$on('buttonClicked', function () {

        $http({

            method: "GET",
            url: '/mySensors'

        }).success(function (data) {


            if (data.status == 400) {
                alert("something went wrong !");
            }

            else if (data.status == 200) {

                $scope.sensors = data.data;
                $scope.currentData = false;
                $scope.forecastData = false;
            }

        }).error(function (error) {
            alert("ERROR");
        });
    });




    $rootScope.$on('buttonClickedFromSubscribe', function () {

        $http({

            method: "GET",
            url: '/mySensors'

        }).success(function (data) {


            if (data.status == 400) {
                alert("something went wrong !");
            }

            else if (data.status == 200) {

                for(var i = 0; i<data.data.length; i++)
                {
                    if (data.data[0].type == "Starter") {
                        $scope.forecastDataBtn = false;
                    }
                }
                $scope.sensors = data.data;
                $scope.currentData = false;
                $scope.forecastData = false;
            }

        }).error(function (error) {
            alert("ERROR");
        });
    });


    $scope.getCurrentData = function (type, city) {
       $scope.currentData = true;
        $scope.forecastData = false;

        $http({

            method: "GET",
            url: '/getCurrentData',
            params:{
                "type" : type,
                "city" : city
            }

        }).success(function (data) {

            //alert(JSON.stringify(data));
            if (data.status == 400) {
                alert("something went wrong !");
            }

            else {

                //alert(JSON.stringify(data.main));
                $scope.weather = data.weather[0].main;
                $scope.temp = data.main.temp;
                $scope.maxTemp = data.main.temp_min;
                $scope.minTemp = data.main.temp_max;
                $scope.pressure = data.main.pressure;
                $scope.humidity = data.main.humidity;

            }

        });
  }
    $scope.getForecastData = function (type, city) {

        $scope.forecastData = true;
        $scope.currentData = false;

        $http({

            method: "GET",
            url: '/getForecastData',
            params:{
                "type" : type,
                "city" : city
            }

        }).success(function (data) {


            if (data.status == 400) {
                alert("something went wrong !");
            }

            else {

                $scope.forecastData = data.list;
               // $scope.weatherData = data.weather[0];
            }
        });
    }

}]);


listActiveSensors.controller('myBills', ['$scope','$rootScope', '$http', function($scope, $rootScope, $http) {


        $http({

            method: "GET",
            url: '/myBills'

        }).success(function (data) {


            $scope.bills = data.data;


        }).error(function (error) {
            alert(error);
        });

    $rootScope.$on('buttonClicked', function (){

        $http({

            method: "GET",
            url: '/myBills'

        }).success(function (data) {


            $scope.bills = data.data;


        }).error(function (error) {
            alert(error);
        });

    });

}]);

