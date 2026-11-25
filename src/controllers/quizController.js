var quizModel = require("../models/quizModel");

function cadastrar(req, res) {

    var idUsuario = req.body.idUsuarioServer;
    var acertos = req.body.acertosServer;
    var erros = req.body.errosServer;
    var pontuacao = req.body.pontuacaoServer;
    var respostas = req.body.respostasServer;

    if (!Number.isInteger(idUsuario) || idUsuario <= 0) {
        res.status(400).send("O ID do usuário é inválido!");

    } else if (!Number.isInteger(acertos) || acertos < 0) {
        res.status(400).send("A quantidade de acertos é inválida!");

    } else if (!Number.isInteger(erros) || erros < 0) {
        res.status(400).send("A quantidade de erros é inválida!");

    } else if (pontuacao !== acertos * 100) {
        res.status(400).send("A pontuação é inválida!");

    } else if (!Array.isArray(respostas) || respostas.length !== 6) {
        res.status(400).send("As respostas estão incompletas!");

    } else {

        var perguntas = [];
        var totalAcertos = 0;

        for (var i = 0; i < respostas.length; i++) {

            var registro = respostas[i];

            if (!registro ||
                !Number.isInteger(registro.pergunta) ||
                registro.pergunta < 1 ||
                registro.pergunta > 6 ||
                perguntas.includes(registro.pergunta) ||
                (registro.acertou !== 0 && registro.acertou !== 1)) {

                return res.status(400).send("Resposta inválida!");
            }

            perguntas.push(registro.pergunta);
            totalAcertos += registro.acertou;
        }

        if (totalAcertos !== acertos || 6 - totalAcertos !== erros) {
            return res.status(400).send("Resultados inconsistentes!");
        }

        quizModel.cadastrarPartida(
            idUsuario, acertos, erros, pontuacao, respostas
        ).then(function (resultado) {

            res.json(resultado);

        }).catch(function (erro) {

            console.log("Erro ao cadastrar o quiz:", erro);

            res.status(500).json("Erro ao salvar a partida.");
        });
    }
}

module.exports = {
    cadastrar
};