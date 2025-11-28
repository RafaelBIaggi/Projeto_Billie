var partidaModel = require("../models/partidaModel");

function salvar(req, res) {
    var idUsuario = req.body.idUsuario;
    var pontos = req.body.pontos;
    var acertos = req.body.acertos;
    var erros = req.body.erros;
    
    var detalhes = req.body.detalhes; 

    if (idUsuario == undefined) {
        res.status(400).send("Usuário não está logado!");
    } else {
        partidaModel.salvar(idUsuario, pontos, acertos, erros, detalhes, (erro, resultado) => {
            if (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            } else {
                res.json(resultado);
            }
        });
    }
}

module.exports = { salvar };