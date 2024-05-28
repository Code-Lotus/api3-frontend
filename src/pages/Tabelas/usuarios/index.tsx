import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import Style from "./usuarios.module.scss";
import Navbar from "../../../components/navbar";
import SidebarAdm from "../../../components/sidebar/adm";

interface UsuarioProps {
    usuario_id: number,
    usuario_nome: string,
    usuario_cpf: string,
    usuario_email: string,
    usuario_senha: string,
    administrador: boolean
}

export default function Usuarios() {
    const titulos = ["ID", "NOME", "CPF", "EMAIL", "ADMINISTRADOR"];
    const [usuarios, setUsuarios] = useState<UsuarioProps[]>([]);

    useEffect(() => {
        carregaUsuarios();
    }, []);

    async function carregaUsuarios() {
        const response = await api.get("/usuarios");
        setUsuarios(response.data);
    }

    return (
        <>
            <Navbar/>
            <SidebarAdm/>
            <div className={Style.usuariosTableContainer}>
                <section  className={Style.usuariosTable}>
                    <table className={Style.tabela}>
                        <thead>
                            <tr>
                                {titulos.map((titulo, index) => (
                                    <th key={index}>{titulo}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario, index) => (
                                <tr key={index}>
                                    <td>{usuario.usuario_id}</td>
                                    <td>{usuario.usuario_nome}</td>
                                    <td>{usuario.usuario_cpf}</td>
                                    <td>{usuario.usuario_email}</td>
                                    <td>{usuario.administrador ? "True" : "False"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </>
    );
}
