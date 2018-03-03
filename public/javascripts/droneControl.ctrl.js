app.controller("droneControl", function($scope, droneService, serverUrl, $q) {
    function orderKeyBindings(initialBindings, allowedCommands) {
        var keyBinding = {};
        
        // Run over binded commands
        for (var cmd in initialBindings) {
            var keyCode = initialBindings[cmd];
            keyBinding[keyCode] = allowedCommands.find((currCmd) => currCmd.command == cmd);
        }

        return (keyBinding);
    }

    function bindKeys(keyBindingsConfig) {
        
    }

    $q.all([droneService.connect(serverUrl), droneService.settings(), droneService.allowedCommands()]).then((res) => {
        // Organize each key binding with the command belongs to it
        $scope.settings = res[1].data;
        $scope.allowedCommands = res[2].data;
        $scope.keyBindings = orderKeyBindings($scope.settings.keyBindings, $scope.allowedCommands);

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

    }, (err) => {
        alert("fatal connection error");
        console.log("connection error");
    });
})