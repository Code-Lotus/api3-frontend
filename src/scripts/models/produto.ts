export default class Produto {
    constructor(
        private _id: number,
        public _nome: string,
        public _dataCadastro: Date
    ) {}

    get id(): number {
        return this._id
    }
    
    get nome(): string {
        return this._nome
    }
    
    get dataCadastro(): Date {
        const data = new Date(this._dataCadastro.getTime())
        return data
    }
}