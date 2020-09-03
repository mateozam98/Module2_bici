const Reserva = require("../../models/reserva");

exports.reservas_list = function (req, res) {
  // Si uso el find debe ir {}, function
  Reserva.allReservas(function (err, reservas) {
    res.status(200).json({
      reservas: reservas,
    });
  });
};

exports.reserva_update = function (req, res) {
  Reserva.findOne({_id: req.params.id}, (err, aReserva) => {
    if (err) console.log(err);

    if (aReserva === null) {
      res.status(500).json({ message: "Id not found" });
    } else {
      var reservaUpdate = {
        usuario: req.body.usuario,
        bicicleta: req.body.bicicleta,
        desde: req.body.desde,
        hasta: req.body.hasta,
      };

      Reserva.updateOne(reservaUpdate, (err, result) => {
        if (err) console.log(err);
        res.status(200).json(result);
      });
    }
  });
};

exports.reserva_delete = (req, res) => {
  Reserva.deleteOne({ _id: req.body.id }, (err, result) => {
    if (err) console.log(err);
    res.status(204).send(result);
  });
};
