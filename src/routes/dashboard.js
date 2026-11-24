var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/indicadores", function (req, res) {
    dashboardController.buscarIndicadores(req, res);
});

router.get("/desempenhoDias", function (req, res) {
    dashboardController.buscarDesempenhoDias(req, res);
});

router.get("/desempenhoPerguntas", function (req, res) {
    dashboardController.buscarDesempenhoPerguntas(req, res);
});

router.get("/acertosErros", function (req, res) {
    dashboardController.buscarAcertosErros(req, res);
});

router.get("/ranking", function (req, res) {
    dashboardController.buscarRanking(req, res);
});

module.exports = router;
