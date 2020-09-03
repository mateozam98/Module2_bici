const express = require("express");
const router = express.Router();
const reservaController = require("../../controllers/api/reservaControllerAPI");

router.get("/", reservaController.reservas_list);
router.patch("/update/:id", reservaController.reserva_update);
router.delete("/delete", reservaController.reserva_delete);

module.exports = router;