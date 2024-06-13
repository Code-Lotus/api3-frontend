export default class VendaBD {
    _id: number
    _data: Date
    _formaPagamento: string
    _clienteId: number
    _produtoId: number
    _usuarioId: number

    constructor(
    id: number,
    data: Date,
    formaPagamento: string,
    clienteId: number,
    produtoId: number,
    usuarioId: number
    ){
        this._id = id
        this._data = data
        this._formaPagamento = formaPagamento
        this._clienteId = clienteId
        this._produtoId = produtoId
        this._usuarioId = usuarioId
    }

    public get id(): number{
        return this._id;
    }

    public get data(): Date{
        return this._data;
    }

    public get formaPagamento(): string{
        return this._formaPagamento;
    }

    public get clienteId(): number{
        return this._clienteId;
    }

    public get produtoId(): number{
        return this._produtoId;
    }

    public get usuarioId(): number{
        return this._usuarioId;
    }
}