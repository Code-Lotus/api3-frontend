import Cliente from "./cliente";
import Produto from "./produto";
import Vendedor from "./vendedor";

export default class PlanilhaVendas {
    private _id: number
    public _data: Date
    public _vendedor: Vendedor
    public _produto: Produto
    public _cliente: Cliente
    public _valor: number
    private _formaPagamento: string
    
    constructor(id: number, data: Date, vendedor: Vendedor, produto: Produto, cliente: Cliente, valor: number, formaPagamento: string) {
        this._id = id
        this._data = data
        this._vendedor = vendedor
        this._produto = produto
        this._cliente = cliente
        this._valor = valor
        this._formaPagamento = formaPagamento
    }

    get id(): number {
        return this._id
    }

    get data(): Date {
        const data = new Date(this._data.getTime());
        return data
    }

    get vendedor(): Vendedor {
        return this._vendedor
    }

    get produto(): Produto {
        return this._produto
    }

    get cliente(): Cliente {
        return this._cliente
    }

    get valor(): number {
        return this._valor
    }
    get formaPagamento(): string {
        return this._formaPagamento
    }
}