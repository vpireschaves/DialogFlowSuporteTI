import ServicoModel from "./servicoModel.js";

export default class dialogFlowModel {
    async listarServicosCards(tipo = "custom") {
        
        let servicos = new ServicoModel();
        servicos = await servicos.listarServicos();

        let listaCards = [];
        let card;

        for (let i = 0; i < servicos.length; i++){

            let servico = new ServicoModel();
            servico = servicos[i];

            if (tipo == "custom") {
                card = this.criarCustomCard();
                card['card']['title'] = servico.servicoNome;
                card['card']['subtitle'] = "Prazo de atendimento: " + servico.servicoPrazo + " hora(s)";
            }
            else if (tipo == "messenger") {
                card = this.criarMessengerCard();
                card['title'] = servico.servicoNome;
                card['text'] = ["Prazo de atendimento: " + servico.servicoPrazo + " hora(s)"];
            }
            listaCards.push(card);
        }     

        return listaCards;
    }

    criarMessengerCard() {
        return {
            type: "description",
            title: "",
            subtitle: ""
        }
    }

    criarCustomCard() {
        return {
            card: {
                title: "",
                text: [""],
            }
        }
    }
}