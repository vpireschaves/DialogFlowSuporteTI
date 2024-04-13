import PessoaModel from "./pessoaModel.js";
import ServicoModel from "./servicoModel.js";
import Database from "../db/database.js";

let banco = new Database();

export default class ChamadoModel {
    #chamadoId
    #chamadoPrioridade
    #pessoa
    #servico
    #tecnico

    get chamadoId() { return this.#chamadoId }
    set chamadoId(chamadoId) { this.#chamadoId = chamadoId }
    get chamadoPrioridade() { return this.#chamadoPrioridade }
    set chamadoPrioridade(chamadoPrioridade) { this.#chamadoPrioridade = chamadoPrioridade }
    get pessoa() { return this.#pessoa }
    set pessoa(pessoa) { this.#pessoa = pessoa }
    get servico() { return this.#servico }
    set servico(servico) { this.#servico = servico }
    get tecnico() { return this.#tecnico }
    set tecnico(tecnico) { this.#tecnico = tecnico }

    constructor(chamadoId, chamadoPrioridade, pessoa, servico, tecnico) {
        this.#chamadoId = chamadoId
        this.#chamadoPrioridade = chamadoPrioridade
        this.#pessoa = pessoa
        this.#servico = servico
        this.#tecnico = tecnico
    }

    toJSON() {
        return {
            chamadoId: this.#chamadoId,
            chamadoPrioridade: this.#chamadoPrioridade,
            pessoa: this.#pessoa.toJSON(),
            servico: this.#servico.toJSON(),
            tecnico: this.#tecnico.toJSON()
        }
    }

    async abrirChamado() {

        let sql = `insert into tb_chamado (cha_prioridade, pes_id, ser_id, tec_id) values ('${this.#chamadoPrioridade}', '${this.#pessoa.pessoaId}', '${this.#servico.servicoId}', '${this.#tecnico.pessoaId}')`;

        let chamadoId = await banco.ExecutaComandoLastInserted(sql);

        return chamadoId;
    }

    async consultaChamado(chamadoId){

        let sql = `select * from tb_chamado inner join tb_pessoa on tb_chamado.tec_id = tb_pessoa.pes_id inner join tb_servico on tb_chamado.ser_id = tb_servico.ser_id where cha_id = ${chamadoId} `;

        let row = await banco.ExecutaComando(sql);

        if (row.length == 0){
            return null
        }
        else{
            return new ChamadoModel(row[0]['cha_id'], row[0]['cha_prioridade'], null, new ServicoModel(row[0]['ser_id'], row[0]['ser_nome'], row[0]['ser_prazo']), new PessoaModel(row[0]['pes_id'], row[0]['pes_nome'], row[0]['pes_email'], row[0]['pes_tec']));
        }
    }
}