function setMarkers(map, data) {
    let temp = [...data];
    let plots = [];
    temp.map((v, i) => {
        plots.push([v.lat, v.lng]);
    })
    for (let i = 0; i < plots.length; i++) {
        const beach = plots[i];
        new google.maps.Marker({
            position: { lat: beach[0], lng: beach[1] },
            map,
        });
    }
}

function InitializeMap(data) {

    var map = new google.maps.Map(document.getElementById('dvMap'), {
        zoom: 11,
        center: { "lat": data[0].lat, "lng": data[0].lng },
        streetViewControl: false
    });
    window.myMap = map;
    setMarkers(map, data);

    var flightPath = new google.maps.Polyline({
        path: data,
        geodesic: true,
        strokeColor: '#44337a',
        strokeOpacity: 1.0,
        strokeWeight: 4
    });

    flightPath.setMap(map);

    // auto zoom
    var latlngList = [];
    data.map((v, i) => {
        latlngList.push(new google.maps.LatLng(v.lat, v.lng));
    })

    var bounds = new google.maps.LatLngBounds();
    console.log()
    latlngList.map((i) => {
        bounds.extend(i);
    })
    map.setCenter(bounds.getCenter());
    map.fitBounds(bounds);
}

window.InitializeMap = InitializeMap;