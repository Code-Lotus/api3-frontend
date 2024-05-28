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

    private buscaUsuario(usuarios: any, id: number) {
        let retorno: any;
        // console.log(usuarios)
        usuarios.forEach((usuario: { usuario_id: number; }) => {
            // console.log(usuario.usuario_id)
            // console.log(id)
            if(usuario.usuario_id == id){
                console.log("SODA!!!!")
                retorno = usuario
            }
        })
        return retorno
    }

    private buscaCliente(usuarios: any, id: number) {
        let retorno: any;
        usuarios.forEach((usuario: { cliente_id: number; }) => {
            if(usuario.cliente_id == id){
                console.log("SODA!!!!")
                retorno = usuario
            }
        })
        return retorno
    }

    private buscaProduto(usuarios: any, id: number) {
        let retorno: any;
        usuarios.forEach((usuario: { produto_id: number}) => {
            if(usuario.produto_id == id){
                console.log("SODA!!!!")
                retorno = usuario
            }
        })
        return retorno
    }

    public async converteVenda(venda: any) {
        // console.log(venda)
        // console.log(venda[0].usuario_id)
        const vendaLista = venda
        const usuarios = await this.chamaUsuarios();
        const usuario = this.buscaUsuario(usuarios , vendaLista.usuario_id)
        // console.log(usuario.usuario_cpf)
        const clientes = await this.chamaClientes();
        const cliente = this.buscaCliente(clientes , vendaLista.cliente_id)
        const produtos = await this.chamaProdutos();
        const produto = this.buscaProduto(produtos , vendaLista.produto_id)
        
        const newUsuario = new Vendedor(usuario.usuario_cpf, usuario.usuario_nome);
        console.log(newUsuario.nome)
        const newCliente = new Cliente(cliente.cliente_cpfcnpj, cliente.cliente_nome, cliente.cliente_segmento, cliente.cliente_data);
        const newProduto = new Produto(produto.produto_id, produto.produto_nome, produto.produto_data);
        const valor = produto.produto_valor
        // console.log(new Date(venda.venda_data))
        const newVenda = new PlanilhaVendas(venda.venda_id, venda.venda_data, newUsuario, newProduto, newCliente, valor, venda.venda_forma_pagamento)
        return newVenda
    }
}