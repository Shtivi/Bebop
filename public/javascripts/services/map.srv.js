app.service("mapService", function($q) {
    this.getUserLocation = function() {
        return $q((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(resolve);
            } else {
                reject('No geolocation service')
            }
        })
    }
})