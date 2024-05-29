import React, { useState, useRef, useEffect } from "react";
import Style from "../cadastro/cadastro.module.scss";
import DadosController from "../../../scripts/controllers/dados-controller";
// import CreateUsuarioService from "../../../../api3-backend/src/services/usuario/createUsuarioService";
import { api } from "../../../services/api"
import swal from 'sweetalert';
import Sidebar from "../../../components/sidebar";
import SidebarAdm from "../../../components/sidebar/adm";
import Navbar from "../../../components/navbar";

interface usuarioProps {
    usuario_id: number,
    usuario_nome: string,
    usuario_cpf: string,
    usuario_email: string,
    usuario_senha: string,
    administrador: boolean
}

export default function Cadastro() {
    const [cpf, setCpf] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const dadosController = new DadosController();

    const [usuarios, setUsuarios] = useState<usuarioProps[]>([]);
    const nomeRef = useRef<HTMLInputElement | null>(null);
    const cpfRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const senhaRef = useRef<HTMLInputElement | null>(null);
    const [adm, setAdm] = useState<boolean>(false);

    useEffect(() => {
        carregaUsuarios();
    }, [])

    async function carregaUsuarios() {
        const response = await api.get("/usuarios");
        setUsuarios(response.data)
    }

    async function criaUsuario() {
        if(!nomeRef.current?.value || !cpfRef.current?.value || !emailRef.current?.value || !senhaRef.current?.value) return;

        const response = await api.post("/usuario", {
            usuario_nome: nomeRef.current?.value,
            usuario_cpf: cpfRef.current?.value,
            usuario_email: emailRef.current?.value,
            usuario_senha: senhaRef.current?.value,
            administrador: adm ? '1' : '0'
        })

        nomeRef.current.value = "";
        cpfRef.current.value = "";
        emailRef.current.value = "";
        senhaRef.current.value = "";
        
        swal({
            title: "Usuário cadastrado",
            text: "Cadastro realizado com sucesso!",
            icon: "success"
        })
    }

    const handleAdm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAdm(e.target.checked)
    }

    const ajustarCpf = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputCPF = event.target.value;
        const maskCPF = dadosController.mascaraCPF(inputCPF);
        setCpf(maskCPF);
    }


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <>
        <SidebarAdm />
        <Navbar />
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
        <div className={Style.box}>
            <div className={Style.topTitle}>
            <h1>Cadastro</h1>
            </div>
                    <div>
                    <input type='text' name="nome" placeholder="Nome" ref={nomeRef}></input>
                    <i className='bx bx-user-circle'></i> &nbsp;
                    </div>

                    <div>
                    <input type='text' id='cpf' value={cpf} onChange={ajustarCpf}
                    placeholder="CPF" ref={cpfRef}/>
                    <i className='bx bx-id-card'></i> &nbsp;
                    </div>

                    <div>
                    <input type='email' name="email" placeholder="E-mail" ref={emailRef}></input>
                    <i className='bx bx-envelope' ></i> &nbsp;
                    </div>

                    <div>
                        <input type={showPassword ? 'text' : 'password'} name="senha" placeholder="Senha" ref={senhaRef}></input>
                        <i className='bx bx-lock-alt'></i>
                        <div className="showPass">
                        <span className={showPassword ? 'bx bxs-show' : 'bx bxs-low-vision'} onClick={togglePasswordVisibility} id="showpass"></span>
                        </div>
                    </div>

                    <div>
                        <h4>Administrador</h4>
                        <label className={Style.switch}>
                        <input type='checkbox' className={Style.checkbox} onChange={handleAdm}/>
                        <span className={Style.slider}/>
                        </label>
                    </div>

            <div>
                <button onClick={criaUsuario}><h3>Registrar</h3></button>
            </div>
        </div>
        </>
    )
}
