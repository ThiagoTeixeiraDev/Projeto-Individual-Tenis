var database = require("../database/config");

function buscarIndicadores() {
    var instrucaoSql = `
        SELECT
            (SELECT COUNT(*) FROM usuario) AS jogadores,
            (SELECT COUNT(*) FROM resposta) AS respostas,
            (SELECT ROUND(
                100 * SUM(acertou) / NULLIF(COUNT(*), 0), 1
            ) FROM resposta) AS taxa_acerto;
    `;

    return database.executar(instrucaoSql);
}

function buscarDesempenhoDias() {
    var instrucaoSql = `
        SELECT
            DATE(t.momento) AS dia,
            ROUND(
                100 * SUM(t.acertos) /
                NULLIF(SUM(t.acertos + t.erros), 0), 1
            ) AS taxa_acerto
        FROM tentativa t
        WHERE t.momento >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
        GROUP BY DATE(t.momento)
        ORDER BY dia;
    `;

    return database.executar(instrucaoSql);
}

function buscarDesempenhoPerguntas() {
    var instrucaoSql = `
        SELECT
            pergunta,
            COUNT(*) AS respostas,
            SUM(acertou) AS acertos,
            ROUND(
                100 * SUM(acertou) / COUNT(*), 1
            ) AS porcentagem
        FROM resposta
        GROUP BY pergunta
        ORDER BY pergunta;
    `;

    return database.executar(instrucaoSql);
}

function buscarAcertosErros() {
    var instrucaoSql = `
        SELECT
            SUM(acertos) AS acertos,
            SUM(erros) AS erros
        FROM tentativa;
    `;

    return database.executar(instrucaoSql);
}


function buscarRanking() {
    var instrucaoSql = `
        SELECT
            u.nome,
            MAX(t.pontuacao) AS melhor_pontuacao,
            COUNT(t.id) AS quizzes
        FROM tentativa t
        JOIN usuario u ON u.id = t.fk_usuario
        GROUP BY u.id, u.nome
        ORDER BY melhor_pontuacao DESC, quizzes ASC
        LIMIT 5;
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    buscarIndicadores,
    buscarDesempenhoDias,
    buscarDesempenhoPerguntas,
    buscarAcertosErros,
    buscarRanking
};
