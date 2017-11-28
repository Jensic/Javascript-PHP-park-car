function calculateRouteInput(){$("#from-link, #to-link").click(function(e){e.preventDefault();var o=this.id.substring(0,this.id.indexOf("-"));navigator.geolocation.getCurrentPosition(function(e){(new google.maps.Geocoder).geocode({location:new google.maps.LatLng(e.coords.latitude,e.coords.longitude)},function(e,a){a==google.maps.GeocoderStatus.OK?$("#"+o).val(e[0].formatted_address):$("#error").append("Unable to retrieve your address<br />")})},function(e){$("#error").append("Error: "+e.message+"<br />")},{enableHighAccuracy:!0,timeout:1e4})}),$("#calculate-route").submit(function(e){e.preventDefault(),calculateRoute($("#from").val(),$("#to").val())})}function calculateRoute(e,o){var a={zoom:10,center:myLocation,mapTypeId:google.maps.MapTypeId.ROADMAP},t=new google.maps.Map(document.getElementById("map-area"),a),n=new google.maps.DirectionsService,r={origin:e,destination:o,travelMode:google.maps.DirectionsTravelMode.DRIVING,unitSystem:google.maps.UnitSystem.METRIC};n.route(r,function(e,o){o==google.maps.DirectionsStatus.OK?new google.maps.DirectionsRenderer({map:t,directions:e}):$("#error").append("Unable to retrieve your route<br />")})}function drawMap(){navigator.geolocation?navigator.geolocation.getCurrentPosition(onSuccess,onError,{maximumAge:6e4,timeout:3e5,enableHighAccuracy:!0}):alert("Your browser does not support HTML5 Geolocation!!!")}function onSuccess(e){var o=e.coords.latitude,a=e.coords.longitude;myLocation=new google.maps.LatLng(o,a);var t={center:myLocation,zoom:11,mapTypeId:google.maps.MapTypeId.ROADMAP};map=new google.maps.Map(document.getElementById("map-area"),t)}function onSuccess1(e){var o=e.coords.latitude,a=e.coords.longitude;localStorage.setItem("latitudePark",o),localStorage.setItem("longitudePark",a),myLocationLocalStorage=new google.maps.LatLng(o,a);var t={center:myLocationLocalStorage,zoom:11,mapTypeId:google.maps.MapTypeId.ROADMAP};map=new google.maps.Map(document.getElementById("map-area"),t),addMarker()}function onSuccess2(e){var o=e.coords.latitude,a=e.coords.longitude,t=localStorage.getItem("latitudePark"),n=localStorage.getItem("longitudePark");myLocationLocalStorage=new google.maps.LatLng(t,n),myLocationLocalStorage2=new google.maps.LatLng(o,a);var r={center:myLocationLocalStorage2,zoom:11,mapTypeId:google.maps.MapTypeId.ROADMAP};map=new google.maps.Map(document.getElementById("map-area"),r),calculateRoute2()}function onError(e){switch(e.code){case PERMISSION_DENIED:alert("User denied permission");break;case TIMEOUT:alert("Geolocation timed out");break;case POSITION_UNAVAILABLE:alert("Geolocation information is not available");break;default:alert("Unknown error")}}function getLocations(){interest=document.getElementById("interest").value,distance=document.getElementById("distance").value,"default"==interest?alert("You have to select a point of interest"):findPlaces()}function findPlaces(){var e={location:myLocation,radius:distance,type:interest};new google.maps.places.PlacesService(map).nearbySearch(e,createMarkers)}function createMarkers(e,o){var a=new google.maps.LatLngBounds;if(o==google.maps.places.PlacesServiceStatus.OK){clearMarkers();for(var t=0;t<e.length;t++)drawMarker(e[t]),a.extend(e[t].geometry.location);map.fitBounds(a)}else o==google.maps.places.PlacesServiceStatus.ZERO_RESULTS?alert("Sorry, there is no matching result!!"):alert("Sorry, there is some error!!!")}function drawMarker(e){var o=new google.maps.Marker({position:e.geometry.location,map:map});markers.push(o);var a=new google.maps.InfoWindow({content:'<img src="'+e.icon+'"/><font style="color:gray">'+e.name+"<br />Rating: "+e.rating+"<br />Vicinity: "+e.vicinity+"</font>"});google.maps.event.addListener(o,"click",function(){a.open(map,o)})}function clearMarkers(){if(markers){for(i in markers)markers[i].setMap(null);markers=[]}}function getCurrentLocation1(){navigator.geolocation.getCurrentPosition(onSuccess1,onError,{maximumAge:6e4,timeout:3e5,enableHighAccuracy:!0})}function getCurrentLocation(){navigator.geolocation.getCurrentPosition(onSuccess2,onError,{maximumAge:6e4,timeout:3e5,enableHighAccuracy:!0})}function addMarker(){var e={center:myLocationLocalStorage,zoom:15,mapTypeId:google.maps.MapTypeId.ROADMAP};map=new google.maps.Map(document.getElementById("map-area"),e);var o=google.maps.Animation.DROP,a=new google.maps.Marker({map:map,animation:o,position:myLocationLocalStorage});google.maps.event.addListener(a,"click",function(){var e="<strong>"+place.name+"</strong><br>";e+="Rating: "+place.rating,infoWindow.setContent(e),infoWindow.open(map,this)})}function calculateRoute2(){var e={zoom:10,center:myLocationLocalStorage,mapTypeId:google.maps.MapTypeId.ROADMAP},o=new google.maps.Map(document.getElementById("map-area"),e),a=new google.maps.DirectionsService,t={origin:myLocationLocalStorage,destination:myLocationLocalStorage2,travelMode:google.maps.DirectionsTravelMode.DRIVING,unitSystem:google.maps.UnitSystem.METRIC};a.route(t,function(e,a){a==google.maps.DirectionsStatus.OK?new google.maps.DirectionsRenderer({map:o,directions:e}):$("#error").append("Unable to retrieve your route<br />")})}function showGame(){document.getElementById("box").innerHTML="<h1>Parkings</h1"}var myLocation,myLocationLocalStorage,myLocationLocalStorage2,distance,interest,map,from2,parked,markers=new Array;window.onload=function(){drawMap(),calculateRouteInput()},document.getElementById("park").addEventListener("click",function(){getCurrentLocation1()}),document.getElementById("find_car").addEventListener("click",function(){getCurrentLocation()});var tl=new TimelineMax;tl.add(TweenMax.to("#box",1,{rotation:360,onComplete:showGame})),tl.add(TweenMax.to("#box",1,{alpha:0,yoyo:!0,repeat:3})),tl.timeScale(.5);