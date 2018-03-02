app.controller("droneControl", function($scope, droneService) {
    commands = {
        // "37": "right",
        // "38": "forward",
        // "39": "left",
        // "40": "backward",
        "32": "takeOff",
        "90": "land"
    };

    $(document).on("keydown", (e) => {
        if (commands[e.keyCode]) {
            console.log(commands[e.keyCode]);
            droneService.sendCommand(commands[e.keyCode]).then((res) => {

            }, (err) => {
                //alert("command error");
                console.error(err);
            })
        }
    });

    $(document).on("keyup", (e) => {
        droneService.sendCommand('stop').then((res) => {

        }, (err) => {
            //alert("command error");
            console.error(err);
        })
    })
})