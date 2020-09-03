var mymap = L.map('mapid').setView([-33.148678, -62.862682], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'}).addTo(mymap);

var marker = L.marker([-33.148678, -62.862682]).addTo(mymap);
marker.bindPopup("<b>Foco de infección</b><br>305 infectados").openPopup();
var circle = L.circle([-33.148678, -62.862682], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(mymap);