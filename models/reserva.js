var mongoose = require("mongoose");
var moment = require("moment");

var schema = mongoose.Schema;

var reservaScheme = new schema({
    desde: Date,
    hasta: Date,
    Bicicleta:{type: mongoose.Schema.Types.ObjectId,ref:"Bicicleta"},
    Usuario:{type: mongoose.Schema.Types.ObjectId,ref:"Usuario"}
});

reservaScheme.methods.diasDeReserva = function(){
    return moment(this.hasta).diff(moment(this.desde),'days')+1;
}

reservaScheme.statics.allReservas = function(cb){
    return this.find({}, cb);
}

module.exports = mongoose.model("Reserva",reservaScheme);