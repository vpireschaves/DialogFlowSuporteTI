import dialogFlowModel from "../models/dialogFlowModel.js";
import ChamadoModel from "../models/chamadoModel.js";
import PessoaModel from "../models/pessoaModel.js";
import ServicoModel from "../models/servicoModel.js";

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
        else if (intencao && intencao == 'aberturaChamado' && servico != '') {
            
            if (ambienteOrigem){

                respostaDF['fulfillmentMessages'] = [
                    {
                        "text": {
                            "text": [
                                "Entendi o serviço que você precisa de ajuda! Qual é a prioridade do chamado? Baixa, média, alta ou altíssima?",
                            ]
                        }
                }];
                
                resposta.json(respostaDF);

            }
            else {
                
                respostaDF['fulfillmentMessages'] = [{
                    "payload": {
                        "richContent": [[
                        {
                            "type": "description",
                            "text": [
                                "Entendi o serviço que você precisa de ajuda! Qual é a prioridade do chamado? Baixa, média, alta ou altíssima?"
                            ]
                        }]]
                    }
                }];

                resposta.json(respostaDF);
            }
        }
        else if (intencao && intencao == 'aberturaChamadoPessoa')
        {
            let servicoNome = '';
            let prioridade = '';
            let nome = '';
            let email = '';

            for (let i = 0; i < requisicao.body.queryResult.outputContexts.length; i++) {

                let context = requisicao.body.queryResult.outputContexts[i];
                
                if (context.parameters.servico != undefined){
                    servicoNome = context.parameters.servico;
                    prioridade = context.parameters.prioridade;
                    nome = context.parameters.person.name;
                    email = context.parameters.email;
                    break;
                }
            }

            if (servicoNome != '' && prioridade != '' && nome != '' && email != '') {

                let servico = new ServicoModel(null, servicoNome, null);
                servico = await servico.consultarServicoNome();
                
                let pessoa = new PessoaModel(null, nome, email, false);
                let pessoaId = await pessoa.cadastrarPessoa();
                pessoa.pessoaId = pessoaId;

                let tecnico = new PessoaModel();
                tecnico = await tecnico.sorteiaTecnico();

                let chamado = new ChamadoModel(null, prioridade, pessoa, servico, tecnico);
                let chamadoId = await chamado.abrirChamado();
                chamado.chamadoId = chamadoId;

                if (ambienteOrigem){

                    respostaDF['fulfillmentMessages'] = [
                        {
                            "text": {
                                "text": [
                                    `Chamado aberto com sucesso! O número do chamado é ${chamadoId}. Você
                                    será atendido por ${tecnico.pessoaNome} no prazo de ${servico.servicoPrazo} horas.
                                    Posso te ajudar em mais algo?`
                                ]
                            }
                    }];
                    
                    resposta.json(respostaDF);
    
                }
                else {
                    
                    respostaDF['fulfillmentMessages'] = [{
                        "payload": {
                            "richContent": [[
                            {
                                "type": "description",
                                "text": [
                                    `Chamado aberto com sucesso! O número do chamado é ${chamadoId}. Você
                                    será atendido por ${tecnico.pessoaNome} no prazo de ${servico.servicoPrazo} horas.
                                    Posso te ajudar em mais algo?`
                                ]
                            }]]
                        }
                    }];
    
                    resposta.json(respostaDF);
                }
            }
            else if (intencao && intencao == 'aberturaChamadoPessoa') {
                
            }
        }
    }
}