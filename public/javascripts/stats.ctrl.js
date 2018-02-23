app.controller("statsCtrl", function($scope, droneService) {
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
});