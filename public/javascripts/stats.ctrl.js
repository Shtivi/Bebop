app.controller("statsCtrl", function($scope, droneService) {
    $scope.wifiColor = 'red';

    droneService.getStats().then((res) => {
        $scope.stats = res.data;
    }, (err) => {
        console.error(err);
    });

    droneService.listenStatsEvents((data) => {
        Object.keys(data).forEach(key => {
            $scope.stats[key] = data[key];
        });
        $scope.$digest();
    });

    $scope.$watch("stats.wifi", function(oldVal, newVal) {
        if (newVal) {
            if (newVal > -67) {
                $scope.wifiColor = 'green'
            } else if (newVal > -70) {
                $scope.wifiColor = 'amber'
            } else {
                $scope.wifiColor = 'red'
            }
        }
    })
});