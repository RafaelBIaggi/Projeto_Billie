create database projetoBillie;
 
use projetoBillie;  

CREATE TABLE usuario ( 	
	idUsuario INT primary key auto_increment, 	
    nome VARCHAR(45),     
    email VARCHAR(45),     
    senha VARCHAR(20));      
    
CREATE TABLE partida ( 	
	idPartida INT primary key auto_increment,
	dataFim datetime,
    pontos INT,
    totalAcertos INT,
    totalErros INT);
    
CREATE TABLE resultado (
	idResultado INT primary key auto_increment,
    pergunta INT,
    acertou TINYINT,
    tentativa INT,
    fkPartida INT, constraint resultadoPartida foreign key (fkPartida) references partida(idPartida),
    fkUsuario INT, constraint resultadoUsuario foreign key (fkUsuario) references usuario(idUsuario));

