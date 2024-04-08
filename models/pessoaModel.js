
export default class PessoaModel {
    #pessoaId
    #pessoaNome
    #pessoaEmail

    get pessoaId() { return this.#pessoaId }
    get pessoaNome() { return this.#pessoaNome }
    get pessoaEmail() { return this.#pessoaEmail }
    set pessoaId(pessoaId) { this.#pessoaId = pessoaId }
    set pessoaNome(pessoaNome) { this.#pessoaNome = pessoaNome }
    set pessoaEmail(pessoaEmail) { this.#pessoaEmail = pessoaEmail }

    constructor(pessoaId, pessoaNome, pessoaEmail) {
        this.#pessoaId = pessoaId;
        this.#pessoaNome = pessoaNome;
        this.#pessoaEmail = pessoaEmail;
    }

    toJSON() {
        return {
            pessoaId: this.#pessoaId,
            pessoaNome: this.#pessoaNome,
            pessoaEmail: this.#pessoaEmail
        }
    }
}