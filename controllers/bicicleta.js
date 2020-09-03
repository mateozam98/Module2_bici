var Bicicleta = require("../models/bicicleta");

exports.Bicicleta_list = function(req,res){
    res.render("bicicletas/index",{bicis:Bicicleta.allBicis});
}

exports.Bicicleta_view_map = function(req,res){
    res.render("bicicletas/map",{bicis:Bicicleta.allBicis});
}

exports.Bicicleta_create_get = function(req,res){
    res.render("bicicletas/create");
}

exports.Bicicleta_create_post = function(req,res){
    var bici = new Bicicleta(req.body.id,req.body.color,req.body.tipo)
    bici.ubicacion = [req.body.latitud,req.body.longitud];
    Bicicleta.add(bici);

    res.redirect('/bicicletas');
}

exports.Bicicleta_update_get = function(req,res){
    var bici = Bicicleta.findById(req.params.id)
    res.render("bicicletas/update", {bici});
}

exports.Bicicleta_update_post = function(req,res){
    var bici = Bicicleta.findById(req.params.id)
    bici.id = req.body.id
    bici.color = req.body.color
    bici.modelo = req.body.modelo
    bici.ubicacion = [req.body.lat,req.body.lon];

    res.redirect('/bicicletas');
}

exports.Bicicleta_id_get = function(req,res){
    var bici = Bicicleta.findById(req.params.id)
    res.render("bicicletas/view", {bici});
}

exports.Bicicleta_delete_post = function(req,res){
    Bicicleta.removeById(req.body.id);

    res.redirect('/bicicletas');
}