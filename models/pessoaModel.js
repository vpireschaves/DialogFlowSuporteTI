import Database from "../db/database.js";

let banco = new Database();

export default class PessoaModel {
    #pessoaId
    #pessoaNome
    #pessoaEmail
    #pessoaTecnico

    get pessoaId() { return this.#pessoaId }
    set pessoaId(pessoaId) { this.#pessoaId = pessoaId }
    get pessoaNome() { return this.#pessoaNome }
    set pessoaNome(pessoaNome) { this.#pessoaNome = pessoaNome }
    get pessoaEmail() { return this.#pessoaEmail }
    set pessoaEmail(pessoaEmail) { this.#pessoaEmail = pessoaEmail }
    get pessoaTecnico() { return this.#pessoaTecnico }
    set pessoaTecnico(pessoaTecnico) { this.#pessoaTecnico = pessoaTecnico }

    constructor(pessoaId, pessoaNome, pessoaEmail, pessoaTecnico) {
        this.#pessoaId = pessoaId;
        this.#pessoaNome = pessoaNome;
        this.#pessoaEmail = pessoaEmail;
        this.#pessoaTecnico = pessoaTecnico;
    }

    toJSON() {
        return {
            pessoaId: this.#pessoaId,
            pessoaNome: this.#pessoaNome,
            pessoaEmail: this.#pessoaEmail,
            pessoaTecnico: this.#pessoaTecnico
        }
    }

    async cadastrarPessoa() {
        
        let sql = `insert into tb_pessoa (pes_nome, pes_email, pes_tec) values ('${this.#pessoaNome}', '${this.#pessoaEmail}', 0)`;

        let pessoaId = await banco.ExecutaComandoLastInserted(sql);

        return pessoaId;
    }

    async sorteiaTecnico(){

        let sql = `select * from tb_pessoa where pes_tec = 1`;

        let rows = await banco.ExecutaComando(sql);

        let row = rows[Math.floor(Math.random() * rows.length)];

        return new PessoaModel(row['pes_id'], row['pes_nome'], row['pes_email'], row['pes_tec']);
    }
}