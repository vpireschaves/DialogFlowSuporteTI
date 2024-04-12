import express from "express";
import dialogFlowRoute from "./routes/dialogFlowRoute.js";

const porta = 5001;
const host = 'localhost';
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('./publico'));

app.use('/dialogflow', dialogFlowRoute);

app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
})