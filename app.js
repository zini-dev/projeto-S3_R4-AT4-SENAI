const express = require('express');
const fs = require("fs");
const app = express();
const PORT = 8081;

try {

    app.get("/usuarios", (req, res) => {

        const data = fs.readFileSync("./usuarios.json", "utf-8"); // LER ARQUIVO
        let usuarios = JSON.parse(data); // CONVERTER JSON PARA OBJETO JAVASCRIPT

        const {nomeUsuario} = req.query;

        if(nomeUsuario){
            usuarios = usuarios.filter(usuario => usuario.nome.toLowerCase()
            .includes(nomeUsuario.toLowerCase()));
        }

        res.status(200).json(usuarios);

    })

} catch (error) {
    console.error("Erro ao ler o arquivo JSON", error);
    res.status(500).json({ erro: "Erro interno no servidor ao processar os usuários!" })

}

app.listen(PORT, () => {
    console.log(`O servidor está rodando em https://localhost:${PORT}`)
})