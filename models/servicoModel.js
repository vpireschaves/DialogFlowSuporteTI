import Database from "../db/database.js"

let banco = new Database();

export default class ServicoModel {
    #servicoId
    #servicoNome
    #servicoPrazo

    get servicoId() { return this.#servicoId }
    set servicoId(servicoId) { this.#servicoId = servicoId }
    get servicoNome() { return this.#servicoNome }
    set servicoNome(servicoNome) { this.#servicoNome = servicoNome }
    get servicoPrazo() { return this.#servicoPrazo }
    set servicoPrazo(servicoPrazo) { this.#servicoPrazo = servicoPrazo }

    constructor(servicoId, servicoNome, servicoPrazo) {
        this.#servicoId = servicoId
        this.#servicoNome = servicoNome
        this.#servicoPrazo = servicoPrazo
    }

    toJSON() {
        return {
            servicoId: this.#servicoId,
            servicoNome: this.#servicoNome,
            servicoPrazo: this.#servicoPrazo
        }
    }

    async listarServicos(){
        
        let lista = [];
        let sql = "select * from tb_servico";

        let rows = await banco.ExecutaComando(sql);

        for (let i = 0; i < rows.length; i++){
            let row = rows[i];

            lista.push(new ServicoModel(row['ser_id'], row['ser_nome'], row['ser_prazo']));
        }

        return lista;
    }
}