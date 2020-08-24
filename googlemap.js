//You can calculate directions (using a variety of methods of transportation) by using the DirectionsService object.
var directionsService = new google.maps.DirectionsService();

//Define a variable with all map points.
var _mapPoints = new Array();

//Define a DirectionsRenderer variable.
var _directionsRenderer = '';

//This will give you the map zoom value.
var zoom_option = 6;

//LegPoints is your route points between two locations.
var LegPoints = new Array();

//Google map object
var map;

//InitializeMap() function is used to initialize google map on page load.
function InitializeMap(data) {
// console.log(JSON.stringify(data))

    //DirectionsRenderer() is a used to render the direction
    _directionsRenderer = new google.maps.DirectionsRenderer();

    //Set the your own options for map.
    var myOptions = {
        zoom: zoom_option,        
        zoomControl: true,
        // center: new google.maps.LatLng(11.1271, 78.6569),
        // center: new google.maps.LatLng(data.origin.lat, data.origin.lng),
        // center: new google.maps.LatLng(-27.16232701, -152.957293),
        mapTypeId: google.maps.MapTypeId.ROADMAP    
    };

    //Define the map.
    map = new google.maps.Map(document.getElementById("dvMap"), myOptions);
    window.myMap = map;

    //Set the map for directionsRenderer
    _directionsRenderer.setMap(map);

    //Set different options for DirectionsRenderer mehtods.
    //draggable option will used to drag the route.
    _directionsRenderer.setOptions({
        draggable: true
    });

    //Add the doubel click event to map.
    google.maps.event.addListener(map, "dblclick", function (event) {

    });

    // drawRoute({ "origin": { "lat": 15.678476137105541, "lng": 74.46012265625 }, "destination": { "lat": 17.416134150702508, "lng": 82.29843031250002 }, "waypoints": [{ "location": { "lat": 9.830854009538182, "lng": 77.42646859375 }, "stopover": true }, { "location": { "lat": 12.29931681096757, "lng": 79.83560234374998 }, "stopover": true }, { "location": { "lat": 15.244406795663778, "lng": 79.80655640625 }, "stopover": true }, { "location": { "lat": 22.5726, "lng": 88.3639 }, "stopover": true }, { "location": { "lat": 23.6850, "lng": 90.3563 }, "stopover": true }, { "location": { "lat": 27.5142, "lng": 90.4336 }, "stopover": true }, { "location": { "lat": 26.8467, "lng": 80.9462 }, "stopover": true }, { "location": { "lat": 26.9124, "lng": 75.7873 }, "stopover": true }, { "location": { "lat": 21.1702, "lng": 72.8311 }, "stopover": true }, { "location": { "lat": 28.7041, "lng": 77.1025 }, "stopover": true }], "optimizeWaypoints": false, "travelMode": "DRIVING" });

    drawRoute(data);

    // marker = 
    //Add the directions changed event to map.
    google.maps.event.addListener(_directionsRenderer, 'directions_changed', function () {
        // var myroute = _directionsRenderer.directions.routes[0];
        // CreateRoute(myroute);
        zoom_option = map.getZoom();
    });
}

function drawRoute(r) {
    //This will take the request and draw the route and return response and status as output
    directionsService.route(r, function (_response, _status) {
        if (_status == google.maps.DirectionsStatus.OK) {
            _directionsRenderer.setDirections(_response);
        }
    });
}





window.InitializeMap = InitializeMap;