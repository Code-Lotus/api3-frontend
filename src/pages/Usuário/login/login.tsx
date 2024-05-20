import React, { useState } from "react";
import Style from "../login/login.module.scss";
import DadosController from "../../../scripts/controllers/dados-controller";

export default function Login() {
    const [cpf, setCpf] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
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
                    placeholder="CPF"/>
                    <i className='bx bx-id-card'></i> &nbsp;
                    </div>

                    <div>
                        <input type={showPassword ? 'text' : 'password'} placeholder="Senha"></input>
                        <i className='bx bx-lock-alt'></i>
                        <div className="showPass">
                        <span className={showPassword ? 'bx bxs-show' : 'bx bxs-low-vision'} onClick={togglePasswordVisibility}></span>
                        </div>
                    </div>

            <div>
                <a href="#"><button><h3>Entrar</h3></button></a> 
            </div>

                    <div className="registro">
                        Não tem uma conta?<a href="/cadastro"><b> Crie aqui</b></a>
                    </div>
        </div>
        </>
    )
}