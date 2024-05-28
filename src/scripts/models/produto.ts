export default class Produto {
    constructor(
        public _id: number,
        public _nome: string,
        public _dataCadastro: Date
    ) {}

    get id(): number {
        return this.id
    }
    
    get nome(): string {
        return this.nome
    }
    
    get dataCadastro(): Date {
        const data = new Date(this._dataCadastro.getTime())
        return data
    }
}