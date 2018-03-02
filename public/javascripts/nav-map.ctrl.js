app.controller("navMapCtrl", function($scope, mapService, NgMap, googleMapStyles) {
    NgMap.getMap().then(function(map) {
        mapService.getUserLocation().then((position) => {
            latLng = { lat: position.coords.latitude, lng: position.coords.longitude };
            map.setCenter(latLng)
            map.setZoom(16);
            map.setOptions({styles: googleMapStyles.retro});

            var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                icon: 'http://localhost:3000/images/icons/drone2.png'
            })
        }, (err) => console.error(err));
    })
}) 