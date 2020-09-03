
var Bicicleta = function (id, color, modelo, ubicacion) {
    this.id = id;
    this.color = color;
    this.modelo = modelo;
    this.ubicacion = ubicacion;
}
//redefinimos el toString
Bicicleta.prototype.toString = () => {
    return `id: ${this.id} | color: ${this.color} | modelo: ${this.modelo} | ubicacion: ${this.ubicacion}`

}

Bicicleta.allBicis = [];
Bicicleta.add = function (aBici) {
    Bicicleta.allBicis.push(aBici);
}
Bicicleta.findById = function (aBiciId) {
    var aBici = Bicicleta.allBicis.find(x => x.id == aBiciId);
    if (aBici)
        return aBici;
    else
        throw new Error("No existe una bicicleta con el id: " + aBiciId);

}


Bicicleta.removeById = function (aBiciId) {
   // Bicicleta.findById(aBiciId); //si no existe devuelve el error del find
    for (var i = 0; i < Bicicleta.allBicis.length; i++) {
        if (Bicicleta.allBicis[i].id == aBiciId) {
            Bicicleta.allBicis.splice(i, 1);
            break;
        }
    }

}


// var a = new Bicicleta(1, "rojo", "urbana", [-33.152702, -62.859538]);
// var b = new Bicicleta(2, "negro", "montaña", [-33.154356, -62.848488]);
// var c = new Bicicleta(3, "verde", "montaña", [-33.154356, -62.858488]);
// var d = new Bicicleta(4, "Azul", "bmx", [-33.154156, -62.851488]);
// Bicicleta.add(a);
// Bicicleta.add(b);
// Bicicleta.add(c);
// Bicicleta.add(d);
module.exports = Bicicleta;