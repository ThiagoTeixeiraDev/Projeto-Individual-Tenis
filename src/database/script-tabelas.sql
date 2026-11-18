CREATE DATABASE pro_individual;
USE pro_individual;

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(100),
	data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE resposta (
	id INT PRIMARY KEY AUTO_INCREMENT,
	fk_usuario INT,
	pergunta INT,
	acertou INT,
	momento DATETIME DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (fk_usuario) REFERENCES usuario(id),
	UNIQUE (fk_usuario, pergunta)
);


SELECT COUNT(*) AS pessoas, ROUND(AVG(acertos), 1) AS media_acertos
FROM (
	SELECT fk_usuario, SUM(acertou) AS acertos
	FROM resposta
	GROUP BY fk_usuario
) AS por_usuario;

SELECT pergunta, COUNT(*) AS respostas, SUM(acertou) AS acertos,
	ROUND(100 * SUM(acertou) / COUNT(*), 1) AS porcentagem
FROM resposta
GROUP BY pergunta
ORDER BY pergunta;

SELECT acertos, COUNT(*) AS pessoas
FROM (
	SELECT fk_usuario, SUM(acertou) AS acertos
	FROM resposta
	GROUP BY fk_usuario
) AS por_usuario
GROUP BY acertos
ORDER BY acertos;

SELECT u.nome, SUM(r.acertou) AS acertos
FROM resposta r
JOIN usuario u ON u.id = r.fk_usuario
GROUP BY u.id, u.nome
ORDER BY acertos DESC
LIMIT 5;
