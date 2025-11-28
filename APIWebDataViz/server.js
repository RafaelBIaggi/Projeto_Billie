var express = require("express");
var cors = require("cors");
var path = require("path");

var rotasUsuario = require("./src/routes/usuarios");
var rotasPartida = require("./src/routes/partidas");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

require("./src/database/config");

app.use("/usuarios", rotasUsuario);
app.use("/partidas", rotasPartida);

var PORTA = 3000;
app.listen(PORTA, function () {
    console.log(`Servidor rodando na porta ${PORTA}`);
});