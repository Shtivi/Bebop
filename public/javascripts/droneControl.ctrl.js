app.controller("droneControl", function($scope, droneService) {
    commands = {
        "37": "rotateRight",
        "38": "up",
        "39": "rotateLeft",
        "40": "down",
        "87": "forward",
        "65": "left",
        "83": "backward",
        "68": "right"
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