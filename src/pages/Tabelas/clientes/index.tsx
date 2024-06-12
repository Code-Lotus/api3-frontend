import { useEffect, useState } from "react"
import { api } from "../../../services/api";
import Style from "../usuarios/usuarios.module.scss";
import Navbar from "../../../components/navbar";
import SidebarAdm from "../../../components/sidebar/adm";

interface ClienteProps {
    cliente_id: number,
    cliente_nome: string,
    cliente_cpfcnpj: string,
    cliente_segmento: string
}

export default function Clientes() {

    const titulos = ["ID", "NOME", "CPF/CNPJ", "SEGMENTO"]
    const [clientes, setClientes] = useState<ClienteProps[]>([]);

    useEffect(() => {
        carregaClientes();
    }, [])

    async function carregaClientes() {
        const response = await api.get("/clientes");
        setClientes(response.data);
    }

    async function deletaClientes(clienteId: number) {
        if(!clienteId) return;
        // console.log(clienteId)
        // console.log(typeof(clienteId))
        const response = await api.delete("/cliente", {
            data: {
                cliente_id: clienteId
            }
        })
        carregaClientes()
        // setClientes(clientes.filter(cliente => cliente.cliente_id !== clienteId));
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
                                    <th key={titulo}>{titulo}</th>
                                ))}
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map(cliente => (
                                <tr key={cliente.cliente_id}>
                                    <td>{cliente.cliente_id}</td>
                                    <td>{cliente.cliente_nome}</td>
                                    <td>{cliente.cliente_cpfcnpj}</td>
                                    <td>{cliente.cliente_segmento}</td>
                                    <td>
                                    <button className={Style.btn}>Editar</button>
                                    <button className={Style.btn} onClick={() => deletaClientes(cliente.cliente_id)}>Apagar</button>
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