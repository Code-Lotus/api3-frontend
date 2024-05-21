import React, { useEffect, useRef, useState } from "react";
import Style from "../login/login.module.scss";
import DadosController from "../../../scripts/controllers/dados-controller";
import { api } from "../../../services/api";

interface UsuarioProps {
    usuario_id: number,
    usuario_nome: string,
    usuario_cpf: string,
    usuario_email: string,
    usuario_senha: string,
    administrador: boolean
}

export default function Login() {
    const [cpf, setCpf] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    
    const [usuarios, setUsuarios] = useState<UsuarioProps[]>([]);
    const cpfRef = useRef<HTMLInputElement | null>(null);
    const senhaRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        carregaUsuarios();
    }, [])

    async function carregaUsuarios(){
        const response = await api.get("/usuarios");
        setUsuarios(response.data);
    }

    function verificaCredenciais(){
        let achouCpf = false; 
        const cpf = cpfRef.current?.value;
        const senha = senhaRef.current?.value;

        usuarios.forEach(((usuario, index) => {
            if(cpf === usuario.usuario_cpf){
                achouCpf = true;
                if(senha === usuarios[index].usuario_senha){
                    trocaPagina() //mudar página
                } else {
                    console.log("Senha incorreta!")
                }
            }
        }))

        if(!achouCpf) {
            console.log("CPF não encontrado!")
        }
    }

    function trocaPagina() {
        return //mudar página
    }

    const dadosController = new DadosController();

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
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
        <div className={Style.box}>
            <div className={Style.topTitle}>
            <h1>Login</h1>
            </div>

                    <div>
                    <input type='text' id='cpf' value={cpf} onChange={ajustarCpf}
                    placeholder="CPF" ref={cpfRef}/>
                    <i className='bx bx-id-card'></i> &nbsp;
                    </div>

                    <div>
                        <input type={showPassword ? 'text' : 'password'} placeholder="Senha" ref={senhaRef}></input>
                        <i className='bx bx-lock-alt'></i>
                        <div className="showPass">
                        <span className={showPassword ? 'bx bxs-show' : 'bx bxs-low-vision'} onClick={togglePasswordVisibility}></span>
                        </div>
                    </div>

            <div>
                <a href="/insercaoExcel"><button onClick={verificaCredenciais}><h3>Entrar</h3></button></a> 
            </div>
        </div>
        </>
    )
}
