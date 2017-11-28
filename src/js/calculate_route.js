/****************************************************
*                                                   *
*             CALCULATE ROUTE FUNCTIONALITY         *
*****************************************************/


function calculateRouteInput () {

    $("#from-link, #to-link").click(function(event) {
        event.preventDefault();
        var addressId = this.id.substring(0, this.id.indexOf("-"));
        navigator.geolocation.getCurrentPosition(function(position) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                "location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
            },
            function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                   $("#" + addressId).val(results[0].formatted_address);
                } else {
                    $("#error").append("Unable to retrieve your address<br />");
                }
            });
            },
        function(positionError){
            $("#error").append("Error: " + positionError.message + "<br />");
        },
        {
            enableHighAccuracy: true,
            timeout: 10 * 1000 // 10 seconds
        });
    });

    $("#calculate-route").submit(function(event) {
        event.preventDefault();
        calculateRoute($("#from").val(), $("#to").val());
    });
}

// WORK IN PROGRESS
//var test, addressId; 
//
//function calculateRouteInput () {
//
//    $("#from-link, #to-link").click(function(event) {
//        event.preventDefault();
//        var addressId = this.id.substring(0, this.id.indexOf("-"));
//        var test = addressId;
//        console.log(test);
//
//        navigator.geolocation.getCurrentPosition(geoSuccess,geoFail,
//        {enableHighAccuracy: true,timeout: 10 * 1000});
//    });
//
//    $("#calculate-route").submit(function(event) {
//        event.preventDefault();
//        calculateRoute($("#from").val(), $("#to").val());
//    });
//    
//}
//
//function geoSuccess(position) {
//            var geocoder = new google.maps.Geocoder();
//            geocoder.geocode({
//                "location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
//            },
//            function(results, status) {
//                console.log(results);
//                console.log(status);
//                if (status == google.maps.GeocoderStatus.OK) {
//                    console.log("Hej5");
//                    $("#" + addressId).val(results[0].formatted_address);
//                    console.log(results[0].formatted_address);
//                    console.log(addressId);
//                    console.log(test);
//                } else {
//                    $("#error").append("Unable to retrieve your address<br />");
//                }
//            });
//} 
//
//function geoFail(positionError){
//    $("#error").append("Error: " + positionError.message + "<br />");
//}

function calculateRoute(from, to) {
    // Center initialized to current location stored in myLocation.
    var myOptions = {
        zoom: 10,
        center: myLocation,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    // Draw the map into the div with id #map-area
    var mapObject = new google.maps.Map(document.getElementById("map-area"), myOptions);
    
    // Using the directionservice to print out route on map, using information from from and to stored in directionsRequest.
    var directionsService = new google.maps.DirectionsService();
    var directionsRequest = {
        origin: from,
        destination: to,
        travelMode: google.maps.DirectionsTravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
        };
    
    directionsService.route(directionsRequest, function(response, status) {
        
        if (status == google.maps.DirectionsStatus.OK) {
            new google.maps.DirectionsRenderer({
                map: mapObject,
                directions: response
            });
        } else {
            $("#error").append("Unable to retrieve your route<br />");
        }
    });
}