export default class Cliente {
    private _cnpjcpf: string
    private _nome: string
    private _segmento: string
    private _dataCadastro: Date
    
    constructor(_cnpjcpf: string, _nome: string, _segmento: string, _dataCadastro: Date) {
        this._cnpjcpf = _cnpjcpf
        this._nome = _nome
        this._segmento = _segmento
        this._dataCadastro = _dataCadastro
    }

    public get cpfcnpj(): string {
        return this._cnpjcpf
    }

    public get nome(): string {
        return this._nome
    }

    public get segmento(): string {
        return this._segmento
    }

    public get dataCadastro(): Date {
        return this._dataCadastro
    }
}