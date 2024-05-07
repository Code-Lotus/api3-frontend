import PlanilhaVendas from "./planilhaVendas";

export default class Vendedor {
    private _cpf: string
    public _nome: string
    private _vendasRealizadas: Array<PlanilhaVendas>

    constructor(_cpf: string, _nome: string) {
        this._cpf = _cpf
        this._nome = _nome
        this._vendasRealizadas = []
    }

    get cpf(): string {
        return this._cpf
    }

    get nome(): string {
        return this._nome
    }

    get vendasRealizadas(): ReadonlyArray<PlanilhaVendas> {
        return this._vendasRealizadas
    }
}