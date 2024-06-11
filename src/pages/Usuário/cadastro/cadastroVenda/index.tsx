import { useEffect, useRef, useState } from "react";
import { api } from "../../../../services/api";
import Navbar from "../../../../components/navbar";
import SidebarAdm from "../../../../components/sidebar/adm";
import Style from "../cadastro.module.scss";
import swal from 'sweetalert';

interface vendaProps {
    venda_id: number,
    venda_data: Date,
    venda_forma_pagamento: string,
    cliente_id: number,
    produto_id: number,
    usuario_id: number
}

export default function CadastroVenda() {

    const [vendas, setVendas] = useState<vendaProps[]>([]);
    const dataRef = useRef<HTMLInputElement | null>(null);
    const pagamentoRef = useRef<HTMLInputElement | null>(null);
    const clienteRef = useRef<HTMLInputElement | null>(null);
    const produtoRef = useRef<HTMLInputElement | null>(null);
    const usuarioRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        carregaProduto();
    }, [])

    async function carregaProduto() {
        const response = await api.get("/vendas")
        setVendas(response.data)
    }

    async function criaVenda() {
        if(!dataRef.current?.value || !pagamentoRef.current?.value || !clienteRef.current?.value || !produtoRef.current?.value || !usuarioRef.current?.value) return;
        dataRef.current.value += "T00:00:00.000Z"

        const response = await api.post("/venda", {
            venda_data: dataRef.current?.value,
            venda_forma_pagamento: pagamentoRef.current?.value,
            cliente_id: parseInt(clienteRef.current?.value),
            produto_id: parseInt(produtoRef.current?.value),
            usuario_id: parseInt(usuarioRef.current?.value)
        })

        dataRef.current.value = "";
        pagamentoRef.current.value = "";
        clienteRef.current.value = "";
        produtoRef.current.value = "";
        usuarioRef.current.value = "";

        swal({
            title: "Venda cadastrada",
            text: "Cadastro realizado com sucesso!",
            icon: "success"
        })
    }

    return(
        <>
            <SidebarAdm />
            <Navbar />
            <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
            <div className={Style.box}>
                <div className={Style.topTitle}>
                    <h1>Cadastro Venda</h1>
                </div>
                <div>
                    <input type='text' name="data" placeholder="Data" ref={dataRef}></input>
                    <i className='bx bx-calendar'></i> &nbsp;
                </div>
                <div>
                    <input type='text' name="Forma de pagamento" placeholder="Forma de pagamento" ref={pagamentoRef}></input>
                    <i className='bx bx-credit-card'></i> &nbsp;
                </div>
                <div>
                    <input type='number' name="ID do cliente" placeholder="ID do cliente" ref={clienteRef}></input>
                    <i className='bx bx-male'></i> &nbsp;
                </div>
                <div>
                    <input type='number' name="ID do produto" placeholder="ID do produto" ref={produtoRef}></input>
                    <i className='bx bx-package'></i> &nbsp;
                </div>
                <div>
                    <input type='number' name="ID do usuário" placeholder="ID do usuário" ref={usuarioRef}></input>
                    <i className='bx bx-user-circle'></i> &nbsp;
                </div>

                <div>
                    <button onClick={criaVenda}><h3>Registrar</h3></button>
                </div>
            </div>
        </>
    )
}