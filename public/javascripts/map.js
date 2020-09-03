var mymap = L.map('mapid').setView([-33.148678, -62.862682], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
    foo: 'bar',
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
}).addTo(mymap);

var circle = L.circle([-33.148678, -62.862682], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 200
}).addTo(mymap);

circle.bindPopup("<b>PELIGRO</b><br>Calles cerradas!").openPopup();

fetch("api/bicicletas")
    .then(function (response) {
        return response.json();
    })
    .then(function (result) {
        console.log(result);
        result.bicicletas.forEach(function (bici) {
            var marker = L.marker(bici.ubicacion).addTo(mymap);
            marker.bindPopup(`<b>Color: ${bici.color}</b><br>Modelo: ${bici.modelo}`).openPopup();
        });
    }).catch((err) => {
        console.log(err)
    });
