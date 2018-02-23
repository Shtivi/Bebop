// Data members
var sockets = {};
var io = null;

// Methods
function emitAll(eventName, data) {
    for (var id in sockets) {
        sockets[id].emit(eventName, data);
    }
}

// API
module.exports = function(socketIO) {
    io = socketIO;

    io.on("connection", (socket) => {
        sockets[socket.id] = socket;
        console.log("Socket connected");

        socket.on("disconnect", () => {
            console.log("Socket disconnected");
            delete sockets[socket.id];
        })
    })

    return module.exports;
}

module.exports.emitAll = emitAll;