//MAP 
var map = L.map('map').setView([5.5535764,95.3150963], 13);

//TILE LAYER
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
});
osm.addTo(map);

var googleStreets = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
googleStreets.addTo(map);

var googleSat = L.tileLayer('http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
googleSat.addTo(map);

//ICON
var icon_tiang = L.icon({
    iconUrl: 'img/marker.png',
    iconSize: [30, 63],
    iconAnchor: [32, 62],
    popupAnchor: [-18, -76]
});

// CONTROL LAYERS
var baseLayers = {
    'OpenStreetMap': osm,
    'Satellite' : googleSat,
    'Street' : googleStreets,
};
var layerControl = L.control.layers(baseLayers, null).addTo(map);

function requestAPI(id, shape){
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "https://agamdev.online/agam/getpoint.php",
        data: {
          "id": id,
          "shape": shape,
        },
        success: function (result) {  
            let aset = result;
            if(aset){
                var marker = L.marker([aset.lat, aset.lon], {icon:icon_tiang}).addTo(map)
                .bindPopup(shape + " : " + aset.id)
                .openPopup();
            }
        },
        error: function (error){
            alert("Data tidak valid");
        }
      });
}

$('#tombol').on('click', function (e) {
    requestAPI($('#input').val(), $('#pilihan').val());
    e.preventDefault();
});

$('#input').on('keyup', function (e) {
    if(e.which === 13) {
        requestAPI($('#input').val(), $('#pilihan').val());
        e.preventDefault();
    }
});
