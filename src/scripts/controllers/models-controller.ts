import { api } from "../../services/api";
import Cliente from "../models/cliente";
import PlanilhaVendas from "../models/planilhaVendas";
import Produto from "../models/produto";
import VendaBD from "../models/vendaBd";
import Vendedor from "../models/vendedor";

export default class ModelsController {
    public async chamaVendas() {
        const vendas = await api.get("/vendas");
        return vendas.data
    }
    
    private async buscaUsuario(id: number) {
        const response = await api.patch("/usuario", {
            usuario_id: id
        });
        console.log(response.data)
        return response.data
    }

    private async buscaCliente(id: number) {
        const response = await api.patch("/cliente", {
            cliente_id: id
        });
        console.log(response.data)
        return response.data
    }

    private async buscaProduto(id: number) {
        const response = await api.patch("/produto", {
            produto_id: id
        });
        console.log(response.data)
        return response.data
    }

    public async converteVenda(venda: any) {
        const usuario = await this.buscaUsuario(venda.usuarioId);
        const cliente = await this.buscaCliente(venda.clienteId);
        const produto = await this.buscaProduto(venda.produtoId);

        const newUsuario = new Vendedor(usuario.usuario_cpf, usuario.usuario_nome);
        const newCliente = new Cliente(cliente.cliente_cpfcnpj, cliente.cliente_id, cliente.cliente_segmento, cliente.cliente_data);
        const newProduto = new Produto(produto.produto_id, produto.produto_nome, produto.produto_data);
        const valor = 0
        const newVenda = new PlanilhaVendas(venda.id, venda.data, newUsuario, newProduto, newCliente, valor, venda.formaPagamento)
        return newVenda
    }
}