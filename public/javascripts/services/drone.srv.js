app.service("droneService", function() {
    // Data members
    var socket = null;

    /** API **/
    
    // Initialization
    this.connect = function(serverUrl) {
        socket = io.connect('http://localhost:80');

        socket.on('connect', (data) => {
            console.log(data);
            socket.emit('blah', 'hello from client');
        })

        socket.on('msg', (msg) => console.log(msg));
    }

    // Commands 


    // Events registeration
});