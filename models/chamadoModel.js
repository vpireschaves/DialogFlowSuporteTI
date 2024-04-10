import PessoaModel from "./pessoaModel.js"
import ServicoModel from "./servicoModel.js"

export default class ChamadoModel {
    #chamadoId
    #chamadoPrioridade
    #pessoa
    #servico

    get chamadoId() { return this.#chamadoId }
    set chamadoId(chamadoId) { this.#chamadoId = chamadoId }
    get chamadoPrioridade() { return this.#chamadoPrioridade }
    set chamadoPrioridade(chamadoPrioridade) { this.#chamadoPrioridade = chamadoPrioridade }
    get pessoa() { return this.#pessoa }
    set pessoa(pessoa) { this.#pessoa = pessoa }
    get servico() { return this.#servico }
    set servico(servico) { this.#servico = servico }

    constructor(chamadoId, chamadoPrioridade, pessoa, servico) {
        this.#chamadoId = chamadoId
        this.#chamadoPrioridade = chamadoPrioridade
        this.#pessoa = pessoa
        this.#servico = servico
    }

    toJSON() {
        return {
            chamadoId: this.#chamadoId,
            chamadoPrioridade: this.#chamadoPrioridade,
            pessoa: this.#pessoa.toJSON(),
            servico: this.#servico.toJSON()
        }
    }
}