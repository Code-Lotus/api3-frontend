import { useEffect, useState } from "react"
import { api } from "../../../services/api";
import Style from "./usuarios.module.scss";

interface ProdutoProps {
    produto_id: number,
    produto_nome: string,
    produto_valor: number
}

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

    return (
        <table>
            <thead>
                <tr>
                    {titulos.map(titulo => (
                        <th>{titulo}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {produtos.map(produto => (
                    <tr>
                        <td>{produto.produto_id}</td>
                        <td>{produto.produto_nome}</td>
                        <td>{produto.produto_valor}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}