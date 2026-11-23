CREATE DATABASE pro_individual;

USE pro_individual;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50) UNIQUE,
	senha VARCHAR(100),
	data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tentativa (
	id INT PRIMARY KEY AUTO_INCREMENT,
	fk_usuario INT,
	acertos INT,
	erros INT,
	pontuacao INT,
	momento DATETIME DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

CREATE TABLE resposta (
	id INT PRIMARY KEY AUTO_INCREMENT,
	fk_tentativa INT,
	pergunta INT,
	acertou TINYINT,
	FOREIGN KEY (fk_tentativa) REFERENCES tentativa(id),
	UNIQUE (fk_tentativa, pergunta)
);


SELECT COUNT(*) AS quizzes_jogados, MAX(pontuacao) AS melhor_pontuacao,
	ROUND(100 * SUM(acertos) / SUM(acertos + erros), 1) AS aproveitamento
FROM tentativa
WHERE fk_usuario = 1;

SELECT ROUND(100 * SUM(acertos) / SUM(acertos + erros), 1) AS aproveitamento_geral
FROM tentativa;

SELECT momento, pontuacao
FROM tentativa
WHERE fk_usuario = 1
ORDER BY momento DESC
LIMIT 10;

SELECT SUM(acertos) AS acertos, SUM(erros) AS erros
FROM tentativa
WHERE fk_usuario = 1;

SELECT r.pergunta, COUNT(*) AS respostas, SUM(r.acertou) AS acertos,
	ROUND(100 * SUM(r.acertou) / COUNT(*), 1) AS porcentagem
FROM resposta r
JOIN tentativa t ON t.id = r.fk_tentativa
WHERE t.fk_usuario = 1
GROUP BY r.pergunta
ORDER BY r.pergunta;

SELECT momento, acertos, erros, pontuacao
FROM tentativa
WHERE fk_usuario = 1
ORDER BY momento DESC
LIMIT 5;

SELECT u.nome, MAX(t.pontuacao) AS melhor_pontuacao, COUNT(*) AS quizzes
FROM tentativa t
JOIN usuario u ON u.id = t.fk_usuario
GROUP BY u.id, u.nome
ORDER BY melhor_pontuacao DESC, quizzes ASC
LIMIT 5;

SELECT pergunta, COUNT(*) AS respostas,
	ROUND(100 * SUM(acertou) / COUNT(*), 1) AS porcentagem
FROM resposta
GROUP BY pergunta
ORDER BY porcentagem ASC
LIMIT 1;
