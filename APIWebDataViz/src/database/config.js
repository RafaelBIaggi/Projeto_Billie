const mysql = require('mysql2');

console.log('Lendo arquivo...');

const conexao = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Rafa.02612120',
  database: 'projetoBillie'
});

console.log('Tentando conectar ao MySQL...');

conexao.connect((erro) => {
  if (erro) {
    console.error('ERRO AO CONECTAR NO MYSQL:');
    console.error(erro.code);
    console.error(erro.sqlMessage);
    return;
  }
  console.log('Conectado ao MySQL! ID: ' + conexao.threadId);
});

module.exports = conexao;