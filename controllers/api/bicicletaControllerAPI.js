const Bicicleta = require("../../models/bicicleta");

exports.bicicleta_list = (req, res) => {
  Bicicleta.allBicis((err, bicis) => {
    if (err) console.log(err);
    res.status(200).json({ bicicletas: bicis });
  });
};

exports.bicicleta_create = (req, res) => {
  const bici = new Bicicleta({
    code: req.body.code,
    color: req.body.color,
    modelo: req.body.modelo,
  });
  bici.ubicacion = [req.body.lat, req.body.lon];
  bici.save(function (err) {
    if (err) console.log(err);
    res.status(201).json(bici);
  });
};

exports.bicicleta_update = function (req, res) {
  console.log(req.body);
  Bicicleta.findByCode(req.body.code, (err, aBici) => {
    if (err) console.log(err);

    if (aBici === null) {
      res.status(500).json({ message: "Id not found" });
    } else {
      var biciUpdate = {
        code: aBici.code,
        color: req.body.color,
        modelo: req.body.modelo,
      };

      biciUpdate.ubicacion = [req.body.lat, req.body.lon];

      Bicicleta.updateOne(biciUpdate, (err, result) => {
        if (err) console.log(err);
        res.status(200).json(result);
      });
    }
  });
};

exports.bicicleta_delete = (req, res) => {
  Bicicleta.removeByCode(req.body.code, (err, result) => {
    if (err) console.log(err);
    res.status(204).send(result);
  });
};
