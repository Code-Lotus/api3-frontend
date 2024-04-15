export default class Produto {
    constructor(
        private _id: number,
        private _nome: string,
        private _dataCadastro: Date
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