var database = require("../database/config");

function cadastrarTentativa(idUsuario, acertos, erros, pontuacao) {

    var instrucaoSql = `
        INSERT INTO tentativa (fk_usuario, acertos, erros, pontuacao)
        VALUES (?, ?, ?, ?);
    `;

    return database.executar(instrucaoSql, [
        idUsuario, acertos, erros, pontuacao
    ]);
}

function cadastrarResposta(idTentativa, pergunta, acertou) {

    var instrucaoSql = `
        INSERT INTO resposta (fk_tentativa, pergunta, acertou)
        VALUES (?, ?, ?);
    `;

    return database.executar(instrucaoSql, [
        idTentativa, pergunta, acertou
    ]);
}

function cadastrarPartida(idUsuario, acertos, erros, pontuacao, respostas) {

    return new Promise(function (resolve, reject) {

        var conexao = database.criarConexao();

        conexao.beginTransaction(function (erro) {

            if (erro) {
                conexao.end();
                return reject(erro);
            }

            var instrucaoSql = `
                INSERT INTO tentativa 
                    (fk_usuario, acertos, erros, pontuacao)
                VALUES (?, ?, ?, ?);
            `;

            conexao.query(instrucaoSql, [
                idUsuario, acertos, erros, pontuacao
            ], function (erro, resultado) {

                if (erro) {
                    return conexao.rollback(function () {
                        conexao.end();
                        reject(erro);
                    });
                }

                var idTentativa = resultado.insertId;

                var valores = [];

                for (var i = 0; i < respostas.length; i++) {

                    valores.push([
                        idTentativa,
                        respostas[i].pergunta,
                        respostas[i].acertou
                    ]);

                }

                var instrucaoRespostas = `
                    INSERT INTO resposta 
                        (fk_tentativa, pergunta, acertou)
                    VALUES ?;
                `;

                conexao.query(instrucaoRespostas, [valores], function (erro) {

                    if (erro) {
                        return conexao.rollback(function () {
                            conexao.end();
                            reject(erro);
                        });
                    }

                    conexao.commit(function (erro) {

                        if (erro) {
                            return conexao.rollback(function () {
                                conexao.end();
                                reject(erro);
                            });
                        }

                        conexao.end();

                        resolve({
                            idTentativa: idTentativa,
                            mensagem: "Partida cadastrada com sucesso!"
                        });

                    });

                });

            });

        });

    });

}

module.exports = {
    cadastrarTentativa,
    cadastrarResposta,
    cadastrarPartida
};