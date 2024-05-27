export default class VendaBD {
    constructor(
    _id: number,
    _data: Date,
    _formaPagamento: string,
    _clienteId: number,
    _produtoId: number,
    _usuarioId: number
    ){}

    public get id(): number{
        return this.id;
    }

    public get data(): Date{
        return this.data;
    }

    public get formaPagamento(): string{
        return this.formaPagamento;
    }

    public get clienteId(): number{
        return this.clienteId;
    }

    public get produtoId(): number{
        return this.produtoId;
    }

    public get usuarioId(): number{
        return this.usuarioId;
    }
}