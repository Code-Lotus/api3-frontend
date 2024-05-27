import { api } from "../../services/api";
import Cliente from "../models/cliente";
import PlanilhaVendas from "../models/planilhaVendas";
import Produto from "../models/produto";
import VendaBD from "../models/vendaBd";
import Vendedor from "../models/vendedor";

export default class ModelsController {
    public async chamaVendas() {
        const vendas = await api.get("/vendas");
        console.log(vendas.data)
        return vendas.data
    }
    
    private async chamaUsuarios() {
        const response = await api.get("/usuarios");
        console.log(response.data)
        return response.data
    }

    private async chamaClientes() {
        const response = await api.get("/clientes");
        console.log(response.data)
        return response.data
    }

    private async chamaProdutos() {
        const response = await api.get("/produtos");
        console.log(response.data)
        return response.data
    }

    private buscaUsuario(usuarios: any, id: number) {
        let retorno: any;
        usuarios.forEach((usuario: { usuario_id: number; }) => {
            if(usuario.usuario_id == id){
                console.log("SODA!!!!")
                retorno = usuario
            }
        })
        console.log("OBAMNA")
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
        console.log("OBAMNA")
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
        console.log("OBAMNA")
        return retorno
    }

    public async converteVenda(venda: any) {
        const usuarios = this.chamaUsuarios();
        const usuario = this.buscaUsuario(usuarios , venda.usuario_id)
        const clientes = this.chamaClientes();
        const cliente = this.buscaCliente(clientes , venda.cliente_id)
        const produtos = this.chamaProdutos();
        const produto = this.buscaProduto(produtos , venda.produto_id)
        
        const newUsuario = new Vendedor(usuario.usuario_cpf, usuario.usuario_nome);
        const newCliente = new Cliente(cliente.cliente_cpfcnpj, cliente.cliente_id, cliente.cliente_segmento, cliente.cliente_data);
        const newProduto = new Produto(produto.produto_id, produto.produto_nome, produto.produto_data);
        const valor = 0
        const newVenda = new PlanilhaVendas(venda.id, venda.data, newUsuario, newProduto, newCliente, valor, venda.formaPagamento)
        return newVenda
    }
}