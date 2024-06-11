import { Component, ReactNode, useEffect, useState } from "react";
import Navbar from "../../../components/navbar";
import SidebarAdm from "../../../components/sidebar/adm";
import Style from "../usuarios/usuarios.module.scss"
import { api } from "../../../services/api";
import Cliente from "../../../scripts/models/cliente";
import Produto from "../../../scripts/models/produto";
import Vendedor from "../../../scripts/models/vendedor";
import ModelsController from "../../../scripts/controllers/models-controller";
import PlanilhaVendas from "../../../scripts/models/planilhaVendas";
import DadosController from "../../../scripts/controllers/dados-controller";
// import Cliente from "../../../scripts/models/cliente";

// interface VendasProps {
//     venda_id: number,
//     venda_data: Date,
//     venda_forma_pagamento: string,
//     cliente_id: number,
//     produto_id: number,
//     usuario_id: number
// }

type State = {
    vendas: Array<VendasProps>
}

interface VendasProps {
    venda_id: number,
    venda_data: Date,
    cliente: ClienteProps,
    produto: ProdutoProps,
    usuario: UsuarioProps,
    venda_valor: number,
    venda_forma_pagamento: string
}

interface ClienteProps {
    cpfcnpj: string,
    nome: string,
    segmento: string
}

interface ProdutoProps {
    id: number,
    nome: string
}

interface UsuarioProps {
    nome: string;
    cpf: string,
}

const modelsController = new ModelsController()
const dadosController = new DadosController()


export default class Vendas extends Component<{}, State> {
    constructor(props: any){
        super(props);
        this.state = {vendas: []}
    }
    

    public titulos = ["ID", "DATA", "VENDEDOR", "PRODUTO", "PRODUTO ID", "CLIENTE", "CPF/CNPJ", "SEGMENTO", "VALOR", "FORMA DE PAGAMENTO"]
    
    async componentDidMount() {
        await this.carregaVendas(this.state.vendas)
    }
    
    public async carregaVendas(vendas: any) {
        const response = await api.get("/vendas?page=1&per_page=5")
        // let lista: any = []
        for(const venda of response.data) {
            const listaNova = await modelsController.converteVenda(venda)
            vendas.push(listaNova)
            // console.log(listaNova)
            // console.log(vendas[0]._vendedor)
        }
        this.setState(vendas)   
        
    }

    

    render(){
        const { vendas } = this.state;
        return (
            <>
                <Navbar />
                <SidebarAdm />
                <div className={Style.usuariosTableContainer}>
                    <section className={Style.usuariosTable}>
                        <table className={Style.tabela}>
                            <thead>
                                <tr>
                                    {this.titulos.map((titulo, index) => (
                                        <th key={index}>{titulo}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {/* <td>{this.state.vendas[0].usuario.nome}</td> */}
                                {vendas.map((venda: any,index: any) => index%2==0? (
                                    <tr key={index}>
                                        <td>{venda.id}</td>
                                        <td>{dadosController.ajustaDataVenda(venda._data)}</td>
                                        <td>{venda._vendedor._nome}</td>
                                        <td>{venda._produto._nome}</td>
                                        <td>{venda._produto._id}</td>
                                        <td>{venda._cliente._nome}</td>
                                        <td>{venda._cliente.cpfcnpj}</td>
                                        <td>{venda._cliente._segmento}</td>
                                        <td>{dadosController.mascaraPreco(venda._valor.toString())}</td>
                                        <td>{venda.formaPagamento}</td>
                                    </tr>
                                ):null)}
                            </tbody>
                        </table>
                    </section>
                </div>

            </>
        )
    }
}
