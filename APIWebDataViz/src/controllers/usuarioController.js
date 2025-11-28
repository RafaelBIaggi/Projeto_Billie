const usuarioModel = require('../models/usuarioModel');

function cadastrar(req, res) {
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;

    console.log(`Tentando cadastrar o usuário: ${nome}`);

    
    if (!nome || !email || !senha) {
        return res.status(400).send("Erro: Campos obrigatórios não preenchidos.");
    }


    usuarioModel.cadastrar(nome, email, senha, (erro, resultado) => {
        if (erro) {
            console.log("Erro ao cadastrar:", erro);
            res.status(500).json({ erro: erro.sqlMessage });
        } else {
            console.log("Usuário cadastrado com sucesso!");
            res.status(201).json(resultado);
        }
    });
}
function autenticar(req, res) {
    var email = req.body.email;
    var senha = req.body.senha;

    console.log(" Recebi o email: ", email);
    console.log(" Recebi a senha: ", senha);

    if (email == undefined || senha == undefined) {
        return res.status(400).send("Seu email ou senha está undefined!");
    }

    usuarioModel.autenticar(email, senha, (erro, resultado) => {

        console.log(" Erro do banco ", erro);
        console.log(" Resultado do banco: ", resultado);

        if (erro) {
            res.status(500).json(erro.sqlMessage);
        } else if (resultado.length == 0) {
            res.status(403).send("Email e/ou senha inválido(s)");
        } else {
            res.json(resultado[0]);
        }
    });
}

module.exports = { cadastrar, autenticar };
