app.service("droneService", function($http, $q) {
    // Data members
    var self = this;
    var socket = null;
    var eventListeners = {
        stats: [], 
        actions: []
    };

    /** API **/
    
    // Initialization
    this.connect = function(serverUrl) {
        return $q((resolve, reject) => {
            if (socket) resolve(self);
            else {
                socket = io.connect(serverUrl);

                socket.on('connect', () => resolve(self));
                socket.on('connect_error', (err) => reject(err));
                socket.on("statsEvent", (data) => {
                    eventListeners.stats.forEach((listener) => listener(data));
                });
                socket.on("actionEvent", (data) => {
                    eventListeners.actions.forEach((listener) => listener(data));
                });
            }
        });
    }

    this.getStats = () => {
        return $http.get('/drone/stats');
    }

    this.listenStatsEvents = (listener) => {
        eventListeners.stats.push(listener);
    };

    this.listenActionEvents = () => {
        eventListeners.actions.push(listener);
    }

    this.sendCommand = (commandName) => {
        return $http.post('/drone/commands', {command: commandName});
    }

    this.settings = () => {
        return $http.get('/drone/settings');
    }

    this.allowedCommands = () => {
        return $http.get("/drone/commands");
    }
});