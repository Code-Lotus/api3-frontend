import Usuarios from "../../pages/Tabelas/usuarios";
import { api } from "../../services/api";
import Cliente from "../models/cliente";
import PlanilhaVendas from "../models/planilhaVendas";
import Produto from "../models/produto";
import VendaBD from "../models/vendaBd";
import Vendedor from "../models/vendedor";

export default class ModelsController {
    public async chamaVendas() {
        const vendas = await api.get("/vendas");
        // console.log(typeof(vendas.data))
        return vendas.data
    }

    private async chamaUsuarios() {
        const response = await api.get("/usuarios");
        // console.log(response.data)
        // console.log(typeof(response.data))
        return response.data
    }

    private async chamaClientes() {
        const response = await api.get("/clientes");
        // console.log(response.data)
        return response.data
    }

    private async chamaProdutos() {
        const response = await api.get("/produtos");
        // console.log(response.data)
        return response.data
    }

    public buscaVendas(vendas: any[], cpf: string) {
        let retorno: any[] = []
        for(const venda of vendas) {
            if(venda._vendedor._cpf == cpf){
                retorno.push(venda)
            }
        }
        return retorno
    }

    private buscaUsuario(usuarios: any, id: number) {
        let retorno: any;
        // console.log(usuarios)
        usuarios.forEach((usuario: { usuario_id: number; }) => {
            // console.log(usuario.usuario_id)
            // console.log(id)
            if(usuario.usuario_id == id){
                // console.log("SODA!!!!")
                retorno = usuario
            }
        })
        return retorno
    }

    private buscaCliente(usuarios: any, id: number) {
        let retorno: any;
        usuarios.forEach((usuario: { cliente_id: number; }) => {
            if(usuario.cliente_id == id){
                // console.log("SODA!!!!")
                retorno = usuario
            }
        })
        return retorno
    }

    private buscaProduto(usuarios: any, id: number) {
        let retorno: any;
        usuarios.forEach((usuario: { produto_id: number}) => {
            if(usuario.produto_id == id){
                // console.log("SODA!!!!")
                retorno = usuario
            }
        })
        return retorno
    }

    public buscaIdUsuario(users: any, venda: PlanilhaVendas) {
        let userId = -1
        users.forEach((user: any, index: number) => {
            if(user.usuario_cpf == venda._vendedor._cpf) {
                userId = index
            }
        })
        return userId
    }

    public buscaIdCliente(clientes: any, venda: PlanilhaVendas) {
        let clientId = -1
        clientes.forEach((cliente: any, index: number) => {
            if(cliente.cliente_cpfcnpj == venda._cliente.cpfcnpj) {
                clientId = index
            }
        })
        return clientId
    }

    public buscaIdProduto(produtos: any, venda: PlanilhaVendas) {
        let prodId = -1
        produtos.forEach((produto: any, index: number) => {
            if(produto.produto_nome == venda._produto._nome) {
                prodId = index
            }
        })
        return prodId
    }

    public async converteVenda(venda: any) {
        const vendaLista = venda
        const usuarios = await this.chamaUsuarios();
        const usuario = this.buscaUsuario(usuarios , vendaLista.usuario_id)
        const clientes = await this.chamaClientes();
        const cliente = this.buscaCliente(clientes , vendaLista.cliente_id)
        const produtos = await this.chamaProdutos();
        const produto = this.buscaProduto(produtos , vendaLista.produto_id)
        const newUsuario = new Vendedor(usuario.usuario_cpf, usuario.usuario_nome);
        const newCliente = new Cliente(cliente.cliente_cpfcnpj, cliente.cliente_nome, cliente.cliente_segmento, cliente.cliente_data);
        const newProduto = new Produto(produto.produto_id, produto.produto_nome, produto.produto_data);
        const valor = produto.produto_valor
        const newVenda = new PlanilhaVendas(venda.venda_id, venda.venda_data, newUsuario, newProduto, newCliente, valor, venda.venda_forma_pagamento)
        return newVenda
    }

    public async convertePlanilhaVenda(venda: PlanilhaVendas) {
        //id - data - formapag - idprod - idcli - iduser
        let clienteId: number = -1
        let produtoId: number = -1
        let usuarioId: number = -1
        const clientes = await this.chamaClientes()
        if(this.buscaIdCliente(clientes, venda) >= 0) {
            clienteId = this.buscaIdCliente(clientes, venda)
        }
        const produtos = await this.chamaProdutos()
        if(this.buscaIdProduto(produtos, venda) >= 0) {
            produtoId = this.buscaIdProduto(produtos, venda)
        }
        const usuarios = await this.chamaUsuarios()
        if(this.buscaIdUsuario(usuarios, venda) >= 0) {
            usuarioId = this.buscaIdUsuario(usuarios, venda)
        }
        const vendabd = new VendaBD(venda.id, venda._data, venda.formaPagamento, clienteId, produtoId, usuarioId)
    }
}