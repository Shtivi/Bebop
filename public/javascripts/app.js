var app = angular.module("DroneControl", ['ngMaterial', 'ngMap']);

// app.constant("serverUrl", window.location.host);
app.constant("serverUrl", 'http://localhost:80');

app.config(($mdThemingProvider) => {
    // Theme
    var darkBlueGrey = $mdThemingProvider.extendPalette("blue-grey", {
        '800': "#022C36",
        'contrastLightColors': ['800'],
        'contrastDefaultColor': 'dark'
    });

    $mdThemingProvider.definePalette('dark-blue-grey', darkBlueGrey);

    $mdThemingProvider.theme("droneControl")
        .primaryPalette('dark-blue-grey')
        .accentPalette("yellow")
        .warnPalette("red")
        .backgroundPalette("grey");
    
    $mdThemingProvider.setDefaultTheme("droneControl");
})

app.run(function(serverUrl, droneService) {
    // Initialize the drone control service
    droneService.connect(serverUrl);
})