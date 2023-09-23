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
    iconUrl: 'img/tiang.jpg',
    iconSize: [10, 10],
    iconAnchor: [10, 10]
})

var icon_trafo = L.icon({
    iconUrl: 'img/trafo-real.png',
    iconSize: [35, 25],
    iconAnchor: [35, 25]
})

// CONTROL LAYERS
var baseLayers = {
    'OpenStreetMap': osm,
    'Satellite' : googleSat,
    'Street' : googleStreets,
};

var layerControl = L.control.layers(baseLayers, null).addTo(map);
var layerTiang = L.layerGroup().addTo(map);
var layerTrafo = L.layerGroup().addTo(map);
var layerSKTM = L.layerGroup().addTo(map);
var layerSUTM = L.layerGroup().addTo(map);

//SELECT
let p1 = document.getElementById('select1')
let p2 = document.getElementById('select2')
let p3 = document.getElementById('select3')
let p4 = document.getElementById('select4')
let dataPenyulang = [
    "ABULYATAMA","ALUE NAGA","ANEUK LAOT","ANOI ITAM","ASRAMAHAJI","BA1","BA10","BA11","BA12","BA13","BA14","BA15","BA16","BA17","BA18",
    "BA2","BA20","BA21","BA22","BA23","BA24/TSEL","BA25","BA26","BA27","BA28","BA29","BA3","BA30","BA31","BA32","BA33","BA4","BA5","BA6",
    "BA7","BA8","BA9","BAKOY","BALOHAN","BANK INDONESIA","BATOH","BLANG BINTANG","BLOWER","BRAWE","BRR","COT IRI","DARUSSALAM","DEUDAP",
    "EKONOMI","EXP BANDARA SKTM","EXP BLANG PADANG","EXP GH INDRAPURI JTH","EXP INDRAPURI","EXP KESDAM","EXP KOTA JANTHO","EXP PKA",
    "EXP SKTM BALOHAN","EXP SP DHARMA","EXPRESS ANEUK LAOT","GI COT KEUEUNG","INC PKA","KAYEE LEE","KOTA JANTHO","KOTA SKTM","KOTA SUTM",
    "KRUENG RAYA","KTTR GUBERNUR","KTR GUBERNUR 2","KTR WILAYAH","KUTA ALAM", "LAMBHUK","LAMGAPANG","LAMGUGOP","LAMJAME","LAMNYONG",
    "LAMPAKUK","LAMPASEH","LAMPEUNERUT","LAMPRIT","LAMPULO","LAMPULO INDUSTRI","LAMPULO NONACTIVE","LAMPUYANG","LAMREUNG","LAMSEUPENG",
    "LAMTEMEN SUTM","LAMTEUBA","LANUD","LAPANGAN BLP","LHOKNGA","LINGKE KRC","LUBUK","MANDIRI","MATAIE","MDT2 BARU","MERDUATI 1",
    "MERDUATI 2","MESJID RAYA", "MIBO2","MINA SEULAWAH AGUNG","MONTASIK","NA","NEUHEUN","NEUHEUN KY 04","NEUSU","NON AKTIF","NONACTIVE",
    "NONACTIVE JTH","NONREGISTER","OUT ALHUDA","P AAC","PAGAR AIR","PAS21","PASAR ACEH","PAYASEUNARA","PDAM","PELABUHAN","PENDOPO",
    "PEUKAN BADA","PEUNAYONG SKTM","PLTD LBT","PLTD SERAMBI","PLTD SERAMBI NON AKTIF"," PLTDGH LUENG BATA","PLTMG 1","PLTMG 2","PLTMG 3",
    "PLTMG 4","PLTMG 5","PLTMG 6","PLTP","POCUT BAREN","POLDA","PRADA KRC","PRADA PLTD (NONAKTIF)","PS MDT","PS PLTD LBT","RADAR",
    "RENC1","RENC2","RSUZA","RSUZA 1","RSUZA 2","RUMAH SAKIT UMUM","SAMAHANI","SANTAN","SAREE","SBA","SERAMBI","SETUI","SEURAPUNG",
    "SIBREH","SIMPANG RIMA","SIMPANGRIMA","SUDIRMAN","SYIAH KUALA","TAMAN RIA","TANJUNG SELAMAT","TANOH ABE","TEKNIK","TELKOM",
    "TUNGKOP","TV ACEH","ULEE KARENG","ULEE LHEU","VIP KODAM","VVIP INDUSTRI","WALIKOTA","ZIPUR"
    ]

for(i = 0; i < dataPenyulang.length; i++){
    let result = '<option value="' + dataPenyulang[i] + '">' + dataPenyulang[i] + '</option>';
    p1.innerHTML += result;
    p2.innerHTML += result;
    p3.innerHTML += result;
    p4.innerHTML += result;
    
} 

function ubahWKT(linestring){
    var ganti1 = linestring.replace('LINESTRING', '');        
    var ganti2 = ganti1.replace('(', '[');
    var ganti3 = ganti2.replace(')', ']');
    var ganti4 = ganti3.replace(/,/g, '],[');
    var ganti5 = ganti4.replace(/ /g, ',');
    var a = "[";
    var b = ganti5;
    var c = "]";
    var gabung = a.concat(b,c); 
    var parsedGeoJson = JSON.parse(gabung);
    var latlngs = parsedGeoJson;
    var temp;
    for(let i=0; i<latlngs.length; i++){
        temp = latlngs[i][0];
        latlngs[i][0] = latlngs[i][1];
        latlngs[i][1] = temp;
    }
    return latlngs;
}

const submit = document.getElementById('submit');
submit.addEventListener('click', function(e){
    fetch('https://agamdev.online/agam/getpenyulang_all.php?p1=' + p1.value + '&p2=' + p2.value + '&p3=' + p3.value + '&p4=' + p4.value)
        .then(response => response.json())
        .then(result => {
            let penyulang = result
            for(let i=0; i<penyulang.length; i++){
                if(penyulang[i].shape == "tiang TM"){

                    tiang = L.marker([penyulang[i].lat, penyulang[i].lon], {icon:icon_tiang});
                    layerTiang.addLayer(tiang);

                }else if(penyulang[i].shape == "trafo"){

                    trafo = L.marker([penyulang[i].lat, penyulang[i].lon], {icon:icon_trafo});
                    layerTrafo.addLayer(trafo);

                }else if(penyulang[i].shape == "jtm SKTM"){

                    var koordinat = ubahWKT(penyulang[i].coordinates);
                    var SKTM = L.polyline(koordinat, {color: 'red'});
                    layerSKTM.addLayer(SKTM);


                }else if(penyulang[i].shape == "jtm SUTM"){

                    var koordinat = ubahWKT(penyulang[i].coordinates);
                    var SUTM = L.polyline(koordinat, {color: 'yellow'});
                    layerSUTM.addLayer(SUTM);

                }
            }
            
            layerControl.addOverlay(layerTiang, "Tiang TM");
            layerControl.addOverlay(layerTrafo, "Trafo");
            layerControl.addOverlay(layerSKTM, "SKTM");
            layerControl.addOverlay(layerSUTM, "SUTM");

        })
    e.preventDefault();
})


