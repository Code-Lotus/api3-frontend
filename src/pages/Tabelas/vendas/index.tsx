import Style from "../usuarios/usuarios.module.scss"
import ModelsController from "../../../scripts/controllers/models-controller";
import DadosController from "../../../scripts/controllers/dados-controller";
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import Navbar from "../../../components/navbar";
import SidebarAdm from "../../../components/sidebar/adm";

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

export default function Vendas() {
    const titulos = ["ID", "DATA", "VENDEDOR", "PRODUTO", "PRODUTO ID", "CLIENTE", "CPF/CNPJ", "SEGMENTO", "VALOR", "FORMA DE PAGAMENTO", "AÇÕES"]
    const [vendas, setVendas] = useState<VendasProps[]>([]);
    
    useEffect(() => {
        carregaVendas();
    }, [])

    async function carregaVendas() {
        const response = await api.get("/vendas?page=1&per_page=5")
        let lista: any = []
        for(const venda of response.data) {
            const listaNova = await modelsController.converteVenda(venda)
            lista.push(listaNova)
            // console.log(vendas1)
            // console.log(vendas[0]._vendedor)
        }
        console.log(vendas)
        setVendas(lista)
    }

    async function deletaVendas(vendaId: number) {
        console.log(vendaId)
        const response = await api.delete("/venda", {
            data: {
                venda_id: vendaId
            }
        })
        carregaVendas()
    }

    return(
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
                            {/* <td>{this.state.vendas[0].usuario.nome}</td> */}
                            {vendas.map((venda: any,index: any) => (
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
                                    <button className={Style.btn}>Editar</button>
                                    <button className={Style.btn} onClick={() => deletaVendas(venda.id)}>Apagar</button>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </>
    )
}
