import React, { useState, useRef, useEffect } from "react";
import Style from "../cadastro/cadastro.module.scss";
import DadosController from "../../../scripts/controllers/dados-controller";
// import CreateUsuarioService from "../../../../api3-backend/src/services/usuario/createUsuarioService";
import { api } from "../../../services/api"
import swal from 'sweetalert';

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
    const nomeRef = useRef<HTMLInputElement | null>(null)
    const cpfRef = useRef<HTMLInputElement | null>(null)
    const emailRef = useRef<HTMLInputElement | null>(null)
    const senhaRef = useRef<HTMLInputElement | null>(null)

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
            administrador: true
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

    const ajustarCpf = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputCPF = event.target.value;
        const maskCPF = dadosController.mascaraCPF(inputCPF);
        setCpf(maskCPF);
    }

    /*  const handleRegistrarClick = async () => { 
        try {
            const nomeInput = document.querySelector("input[name=nome]");
            const cpfInput = document.querySelector("input[name=cpf]");
            const emailInput = document.querySelector("input[name=email]");
            const senhaInput = document.querySelector("input[name=senha]");

            if (!nomeInput || !cpfInput || !emailInput || !senhaInput) {
                throw new Error("Preencha todos os campos");
            }

            const nome = (nomeInput as HTMLInputElement).value;
            const cpf = (cpfInput as HTMLInputElement).value;
            const email = (emailInput as HTMLInputElement).value;
            const senha = (senhaInput as HTMLInputElement).value;

            const usuarioService = new CreateUsuarioService();
            await usuarioService.execute({
                usuario_nome: nome,
                usuario_cpf: cpf,
                usuario_email: email,
                usuario_senha: senha,
                administrador: false // ou true, dependendo da lógica de administração
            });

            // Redirecionar para outra página ou fornecer feedback de sucesso
            alert("Usuário cadastrado com sucesso!");
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", (error as Error).message);
            // Exibir mensagem de erro para o usuário
            alert("Erro ao cadastrar usuário: " + (error as Error).message);
        }
    } */

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <>
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
                        <span className={showPassword ? 'bx bxs-show' : 'bx bxs-low-vision'} onClick={togglePasswordVisibility}></span>
                        </div>
                    </div>

            <div>
                <button onClick={criaUsuario}><h3>Registrar</h3></button>
            </div>

                    <div className="login">
                        Já é um usuário?<a href="/"><b> Faça login aqui</b></a>
                    </div>
        </div>
        </>
    )
}
