var express = require("express");
var router = express.Router();

var partidaController = require("../controllers/partidaController");

router.post("/salvar", function (req, res) {
    partidaController.salvar(req, res);
});

module.exports = router;