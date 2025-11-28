var database = require("../database/config");

function salvar(idUsuario, pontos, acertos, erros, detalhes, callback) {
    
    var sqlPartida = `
        INSERT INTO partida (pontos, totalAcertos, totalErros, dataFim) 
        VALUES (${pontos}, ${acertos}, ${erros}, NOW());
    `;

    database.query(sqlPartida, (erro, resultadoPartida) => {
        if (erro) return callback(erro, null);

        var idPartidaGerado = resultadoPartida.insertId;

        var sqlContagem = `
            SELECT count(DISTINCT fkPartida) as tentativasAnteriores 
            FROM resultado 
            WHERE fkUsuario = ${idUsuario};
        `;

        database.query(sqlContagem, (erroContagem, resultadoContagem) => {
            if (erroContagem) {

                var tentativaAtual = 1;
            } else {
                var tentativaAtual = resultadoContagem[0].tentativasAnteriores + 1;
            }

            if (!detalhes || detalhes.length === 0) {
                var sqlPadrao = `INSERT INTO resultado (fkPartida, fkUsuario, pergunta, acertou, tentativa) VALUES (${idPartidaGerado}, ${idUsuario}, 1, 0, ${tentativaAtual})`;
                return database.query(sqlPadrao, callback);
            }

            var valores = detalhes.map(item => {
                return `(${idPartidaGerado}, ${idUsuario}, ${item.pergunta}, ${item.acertou}, ${tentativaAtual})`;
            }).join(", "); 

            var sqlResultado = `
                INSERT INTO resultado (fkPartida, fkUsuario, pergunta, acertou, tentativa) 
                VALUES ${valores};
            `;

            console.log(`Salvando tentativa ${tentativaAtual} para o usuário ${idUsuario}...`);

            database.query(sqlResultado, (erro2, resultadoVinculo) => {
                if (erro2) return callback(erro2, null);
    
                    callback(null, {
                    mensagem: "Salvo com sucesso",
                    tentativa: tentativaAtual 
                });
            });
        });
    });
}

module.exports = { salvar };