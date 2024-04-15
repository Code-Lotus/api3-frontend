export default class TipoComissao {
    constructor(
        private _nome: string,
        private _porcentagem: number
    ){}

    public get nome(): string {
        return this._nome
    }

    public get porcentagem(): number {
        return this._porcentagem
    }

    public set porcentagem(porcentagem: number) {
        this._porcentagem = porcentagem
    }
}