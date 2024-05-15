import React, { useState } from "react";
import Style from "../cadastro/cadastro.module.scss";
import DadosController from "../../../scripts/controllers/dados-controller";

export default function Cadastro() {
    const [cpf, setCpf] = useState<string>('');
    const dadosController = new DadosController();

    const ajustarCpf = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputCPF = event.target.value;
        const maskCPF = dadosController.mascaraCPF(inputCPF);
        setCpf(maskCPF);
    }

    return (
        <>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
        <div className={Style.register}>
            <div className={Style.topTitle}>
            <h1>Cadastro</h1>
            </div>
                    <div>
                    <input type='text' placeholder="Nome"></input>
                    <i className='bx bx-user-circle'></i> &nbsp;
                    </div>

                    <div>
                    <input type='text' id='cpf' value={cpf} onChange={ajustarCpf}
                    placeholder="CPF"/>
                    <i className='bx bx-id-card'></i> &nbsp;
                    </div>

                    <div>
                    <input type='email' placeholder="E-mail"></input>
                    <i className='bx bx-envelope' ></i> &nbsp;
                    </div>

                    <div className="password-container">
                        <input type='password' placeholder="Senha"></input>
                        <i className='bx bx-lock-alt'></i>
                    </div>

            <div>
                <a href="#"><button><h3>Registrar</h3></button></a> 
            </div>

                    <div className="login">
                        Já é um usuário?<a href="#"> Faça login aqui</a>
                    </div>
        </div>
        </>
    )
}