var express = require("express");
var router = express.Router();
var bicicletaController = require("../controllers/bicicleta");

router.get("/",bicicletaController.Bicicleta_list);
router.get("/create",bicicletaController.Bicicleta_create_get);
router.post("/create",bicicletaController.Bicicleta_create_post);
router.get("/:id/update",bicicletaController.Bicicleta_update_get);
router.post("/:id/update",bicicletaController.Bicicleta_update_post);
router.post("/:id/delete",bicicletaController.Bicicleta_delete_post);
router.get("/:id/view",bicicletaController.Bicicleta_id_get);
router.get("/map",bicicletaController.Bicicleta_view_map);
module.exports = router;