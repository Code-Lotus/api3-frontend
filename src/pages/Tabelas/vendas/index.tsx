import { ReactNode, useEffect, useState } from "react";
import Navbar from "../../../components/navbar";
import SidebarAdm from "../../../components/sidebar/adm";
import Style from "../usuarios/usuarios.module.scss"
import { api } from "../../../services/api";
// import Cliente from "../../../scripts/models/cliente";
// import Produto from "../../../scripts/models/produto";
// import Vendedor from "../../../scripts/models/vendedor";
import ModelsController from "../../../scripts/controllers/models-controller";
import PlanilhaVendas from "../../../scripts/models/planilhaVendas";
import DadosController from "../../../scripts/controllers/dados-controller";

interface VendasProps {
    venda_id: number,
    venda_data: Date,
    venda_forma_pagamento: string,
    cliente_id: number,
    produto_id: number,
    usuario_id: number
}

interface PlanilhaVendasProps {
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
    segmento: string,
    cadastro: Date
}

interface ProdutoProps {
    id: number,
    nome: string,
    cadastro: Date
}

interface UsuarioProps {
    nome: string;
    cpf: string,
}

const modelsController = new ModelsController()
const dadosController = new DadosController()


export default function Vendas() {
    const titulos = ["ID", "DATA", "VENDEDOR", "PRODUTO", "PRODUTO ID", "CLIENTE", "CPF/CNPJ", "SEGMENTO", "VALOR", "FORMA DE PAGAMENTO"]
    const [vendas, setVendas] = useState<PlanilhaVendasProps[]>([]);

    useEffect(() => {
        carregaVendas();
    }, []);

    async function carregaVendas() {
        const response = await api.get("/vendas")
        let lista: any = []
        // console.log(response.data)
        for(const venda of response.data) {
            const listaNova = await modelsController.converteVenda(venda)
            lista.push(listaNova)
        }
        setVendas(lista)
        console.log(vendas)
    }


    return (
        <>
            <Navbar />
            <SidebarAdm />
            <div className={Style.usuariosTableContainer}>
                <section className={Style.usuariosTable}>
                    <table className={Style.tabela}>
                        <thead>
                            <tr>
                                {titulos.map((titulo, index) => (
                                    <th key={index}>{titulo}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <td>{vendas.length.toString()}</td>
                            {vendas.map((venda,index) => (
                                <tr key={index}>
                                    <td>{venda.venda_id}</td>
                                    <td>{dadosController.ajustaDate(new Date(venda.venda_data))}</td>
                                    <td>{venda.usuario.nome}</td>
                                    <td>{venda.produto.nome}</td>
                                    <td>{venda.produto.id}</td>
                                    <td>{venda.cliente.nome}</td>
                                    <td>{venda.cliente.cpfcnpj}</td>
                                    <td>{venda.cliente.segmento}</td>
                                    <td>{venda.venda_valor}</td>
                                    <td>{venda.venda_forma_pagamento}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </>
    )
}
