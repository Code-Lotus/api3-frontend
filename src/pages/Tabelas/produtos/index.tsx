import { useEffect, useState } from "react"
import { api } from "../../../services/api";
import Style from "../usuarios/usuarios.module.scss";
import Navbar from "../../../components/navbar";
import SidebarAdm from "../../../components/sidebar/adm";
import DadosController from "../../../scripts/controllers/dados-controller";

interface ProdutoProps {
    produto_id: number,
    produto_nome: string,
    produto_valor: number
}

const dadosController = new DadosController()

export default function Produtos() {
    const titulos = ["ID", "NOME", "PREÇO"]
    const [produtos, setProdutos] = useState<ProdutoProps[]>([]);

    useEffect(() => {
        carregaProdutos();
    }, [])

    async function carregaProdutos() {
        const response = await api.get("/produtos");
        setProdutos(response.data);
    }

    async function deletaProdutos(produtoId: number) {
        const response = await api.delete("/produto", {
            data: {
                produto_id: produtoId
            }
        });
        carregaProdutos()
        // setProdutos(produtos.filter(produto => produto.produto_id !== produtoId));
    }

    return (
        <>
            <Navbar/>
            <SidebarAdm/>
            <div className={Style.usuariosTableContainer}>
                <section className={Style.usuariosTable}>
                    <table className={Style.tabela}>
                        <thead>
                            <tr>
                                {titulos.map(titulo => (
                                    <th>{titulo}</th>
                                ))}
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.map(produto => (
                                <tr>
                                    <td>{produto.produto_id}</td>
                                    <td>{produto.produto_nome}</td>
                                    <td>{dadosController.mascaraPreco(produto.produto_valor.toString())}</td>
                                    <td>
                                    <button className={Style.btn}>Editar</button>
                                    <button className={Style.btn} onClick={() => deletaProdutos(produto.produto_id)}>Apagar</button>
                                    </td>
                                </tr>
                                
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </>
    )
}