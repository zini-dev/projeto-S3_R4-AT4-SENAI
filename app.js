const express = require('express');
const fs = require("fs");
const app = express();
const PORT = 8000;


app.get("/eventos", (req, res) => {

    try {
        const data = fs.readFileSync("./eventos.json", "utf-8"); // LER ARQUIVO
        let eventos = JSON.parse(data); // CONVERTER JSON PARA OBJETO JAVASCRIPT

        const { dataMaior, dataMenor } = req.query;

        if (dataMaior) {
            eventos = eventos.filter(evento => evento.date >= dataMaior)
        }

        if (dataMenor) {
            eventos = eventos.filter(evento => evento.date <= dataMenor)
        }

        res.status(200).json(eventos);

    } catch (error) {
        console.error("Erro ao ler o arquivo JSON", error);
        res.status(500).json({ erro: "Erro interno no servidor ao processar os eventos!" })
    }



})

app.listen(PORT, () => {
    console.log(`O servidor está rodando em https://localhost:${PORT}`)
})