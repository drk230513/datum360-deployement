function setMarkers(map, data) {
    let temp = [...data];
    let plots = [];
    let isFromLiveViewTOMap = data[0].hasOwnProperty("desc");
    temp.map((v, i) => {
        if(isFromLiveViewTOMap){
            plots.push([v.lat, v.lng, v.ref_or_fix, v.desc]);
        }else{
            plots.push([v.lat, v.lng, v.ref_or_fix]);
        }
    })
    for (let i = 0; i < plots.length; i++) {
        const beach = plots[i];
        let marker = new google.maps.Marker({
            icon: isFromLiveViewTOMap ? "https://res.cloudinary.com/di9ckb63k/image/upload/v1606463408/ref_1_bzw94s.png" : (beach[2] === "ref" ? 'http://datum360.azurewebsites.net/static/media/ref.png' : 'http://datum360.azurewebsites.net/static/media/fix.png'),
            position: { lat: beach[0], lng: beach[1] },
            map,
        });
        if(isFromLiveViewTOMap){
            const infowindow = new google.maps.InfoWindow({
                content: beach[3],
            });
            window.lastWindow = null;
            marker.addListener("click", () => {
                if (window.lastWindow) {
                    window.lastWindow.close();
                    infowindow.open(map, marker);
                    window.lastWindow=infowindow;
                }
                else{
                    infowindow.open(map, marker);
                    window.lastWindow=infowindow;
                }
            });
            google.maps.event.addListener(map, "click", function(event) {
                if (window.lastWindow) window.lastWindow.close();
                // this.infowindow.open(map, this);
            });
        }
    }
}

function InitializeMap(data) {
    console.log(JSON.stringify(data))

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
        strokeColor: '#fff',
        strokeOpacity: 0.0,
        strokeWeight: 0
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