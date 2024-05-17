import { Component, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Style from "./loginescolha.module.scss";
import { api } from "../../services/api"

interface UsuarioProps {
    usuario_id: number,
    usuario_nome: string,
    usuario_cpf: string,
    usuario_email: string,
    usuario_senha: string,
    administrador: boolean
}

export default function LoginEscolha() {
    const [usuarios, setUsuarios] = useState<UsuarioProps[]>([]);
    const campoRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        carregaUsuarios();
    }, [])

    async function carregaUsuarios(){
        const response = await api.get("/usuarios");
        setUsuarios(response.data);
    }

    return(
        <>
            <div className={Style.divGeral}>
                <h1>Quem esta logando?</h1> 
            </div>
            <div className={Style.divGeral2}>
                <div className={Style.divDentro}>
                    <Link to="/dashboardVendedor" className={Style.card}>
                        <span className={Style.letra}>Vendedor</span>
                    </Link>

                    <Link to="/insercaoExcel" className={Style.card}>
                        <span className={Style.letra}>Administrador</span>
                    </Link>
                    {usuarios.map((usuario, index) => (
                        <div key={usuario.usuario_id}>
                            <p> <span>Nome:</span> {usuario.usuario_nome} </p>
                            <p> <span>Cpf:</span> {usuario.usuario_cpf} </p>
                            <p> <span>Email:</span> {usuario.usuario_email} </p>
                            <p> <span>Senha:</span> {usuario.usuario_senha} </p>
                            <p> <span>Adm:</span> {usuario.administrador ? "SIM" : "NAO"} </p>
                        </div>
                    ))}
                </div>
                <div>
                    <input type="text" placeholder="campo" ref={campoRef}/> 
                </div>
            </div>
        </>
    );
}
