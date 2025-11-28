const database = require('../database/config');

function cadastrar(nome, email, senha, callback) {
    console.log("ACESSEI A MODEL: cadastrar");
    

    const sql = `INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}')`;
    

    database.query(sql, callback);
}

function autenticar(email, senha, callback) {
    console.log("ACESSEI A MODEL: autenticar");
    const sql = `SELECT idUsuario, nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}'`;
    database.query(sql, callback);
}

module.exports = { cadastrar, autenticar };
