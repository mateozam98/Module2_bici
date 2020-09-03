const express = require("express");
const router = express.Router();
const usuarioController = require("../../controllers/api/usuarioControllerAPI");

router.get("/", usuarioController.usuarios_list);
router.post("/create", usuarioController.usuarios_create);
router.post("/reservar", usuarioController.usuario_reservar);
router.delete("/delete/:id", usuarioController.usuario_delete);

module.exports = router;