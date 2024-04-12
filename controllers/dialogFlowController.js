import dialogFlowModel from "../models/dialogFlowModel.js";

export default class DialogFlowController {

    async processar(requisicao, resposta) {

        let dialogFlow = new dialogFlowModel();

        resposta.type('application/json');

        const intencao = requisicao.body.queryResult.intent.displayName;
        const ambienteOrigem = requisicao.body?.originalDetectIntentRequest?.source;
        const servico = requisicao.body.queryResult.parameters.servico;

        let respostaDF = { fulfillmentMessages: [] };

        //para mostrar a lista de serviços quando o serviço não é fornecido
        if (intencao && intencao == 'aberturaChamado' && servico === '') {

            if (ambienteOrigem) {

                let listaServicos = await dialogFlow.listarServicosCards('custom');

                respostaDF['fulfillmentMessages'] = [...listaServicos,
                    {
                        "text": {
                            "text": [
                                "Para o que você precisa de atendimento?",
                            ]
                        }
                }];
                
                resposta.json(respostaDF);
            }
            else {
                
                let listaServicos = await dialogFlow.listarServicosCards('messenger');
                
                respostaDF['fulfillmentMessages'] = [{
                    "payload": {
                        "richContent": [[...listaServicos,
                        {
                            "type": "description",
                            "text": [
                                "Para o que você precisa de atendimento?"
                            ]
                        }]]
                    }
                }];

                resposta.json(respostaDF);
            }
        }
        else {
            resposta.json(respostaDF);
        }
    }
}