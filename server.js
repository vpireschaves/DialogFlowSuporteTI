import express from "express";

const app = express();

app.use(express.json());

app.listen(5001, function () {
    console.log("Backend em execução...");
})