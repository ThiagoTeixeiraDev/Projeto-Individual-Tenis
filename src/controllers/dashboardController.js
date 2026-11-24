var dashboardModel = require("../models/dashboardModel");

function buscarIndicadores(req, res) {
    dashboardModel.buscarIndicadores()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro ao buscar indicadores:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarDesempenhoDias(req, res) {
    dashboardModel.buscarDesempenhoDias()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro ao buscar desempenho por dia:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarDesempenhoPerguntas(req, res) {
    dashboardModel.buscarDesempenhoPerguntas()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro ao buscar desempenho por pergunta:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarAcertosErros(req, res) {
    dashboardModel.buscarAcertosErros()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro ao buscar acertos e erros:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarRanking(req, res) {
    dashboardModel.buscarRanking()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro ao buscar ranking:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    buscarIndicadores,
    buscarDesempenhoDias,
    buscarDesempenhoPerguntas,
    buscarAcertosErros,
    buscarRanking
};
