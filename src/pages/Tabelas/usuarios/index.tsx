import { useEffect, useState } from "react"
import { api } from "../../../services/api";
import Style from "./usuarios.module.scss";

interface UsuarioProps {
    usuario_id: number,
    usuario_nome: string,
    usuario_cpf: string,
    usuario_email: string,
    usuario_senha: string,
    administrador: boolean
}

export default function Usuarios() {
    const titulos = ["ID", "NOME", "CPF", "EMAIL", "ADMINISTRADOR"]
    const [usuarios, setUsuarios] = useState<UsuarioProps[]>([]);

    useEffect(() => {
        carregaUsuarios();
    }, [])

    async function carregaUsuarios() {
        const response = await api.get("/usuarios");
        setUsuarios(response.data);
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
                {usuarios.map(usuario => (
                    <tr>
                        <td>{usuario.usuario_id}</td>
                        <td>{usuario.usuario_nome}</td>
                        <td>{usuario.usuario_cpf}</td>
                        <td>{usuario.usuario_email}</td>
                        <td>{usuario.administrador ? "True" : "False"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}