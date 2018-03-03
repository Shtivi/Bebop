app.controller("droneControl", function($scope, droneService, serverUrl, $q) {
    $q.all([droneService.connect(serverUrl), droneService.settings()]).then((res) => {
        // Command started
        $(document).on("keydown", (e) => {
            // if (commands[e.keyCode]) {
            //     droneService.sendCommand(commands[e.keyCode]).then((res) => {

            //     }, (err) => {
            //         //alert("command error");
            //         console.log(err);
            //     })
            // }
        });

        // Command stopped
        $(document).on("keyup", (e) => {
            // droneService.sendCommand('stop').then((res) => {

            // }, (err) => {
            //     //alert("command error");
            //     console.log(err);
            // })
        });

        $scope.settings = res[1].data;
    }, (err) => {
        alert("fatal connection error");
        console.log("connection error");
    });
})