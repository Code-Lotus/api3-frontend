import PlanilhaVendas from "./planilhaVendas";
import Produto from "./produto";
import Vendedor from "./vendedor";

export default class CampoProdutoAdm {
    private _produto: Produto
    private _qtd: number
    private _precoUni: number
    private _precoTotal: number
    private _vendedor: Vendedor
    private _ultimaVenda: PlanilhaVendas

    constructor(produto: Produto, qtd: number, precoUni: number, vendedor: Vendedor, ultimaVenda: PlanilhaVendas){
        this._produto = produto
        this._qtd = qtd
        this._precoUni = precoUni
        this._precoTotal = precoUni * qtd
        this._vendedor = vendedor
        this._ultimaVenda = ultimaVenda
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

    public get vendedor(): Vendedor {
        return this._vendedor
    }

    public get ultimaVenda(): PlanilhaVendas {
        return this._ultimaVenda
    }

    public set ultimaVenda(venda: PlanilhaVendas) {
        this._ultimaVenda = venda
    }
}