import Produto from "./produto";

export default class CampoProduto {
    private _produto: Produto
    private _qtd: number
    private _precoUni: number
    private _precoTotal: number
    //private _tipoComissao: string

    constructor(produto: Produto, qtd: number, precoUni: number){
        this._produto = produto
        this._qtd = qtd
        this._precoUni = precoUni
        this._precoTotal = precoUni * qtd
    }

    public get produto(): Produto {
        return this._produto
    }

    public get qtd(): number {
        return this._qtd
    }

    public get precoUni(): number {
        return this._precoUni
    }

    public get precoTotal(): number {
        return this._precoTotal
    }
}