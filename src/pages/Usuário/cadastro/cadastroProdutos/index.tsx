import { useEffect, useRef, useState } from "react";
import Navbar from "../../../../components/navbar"
import SidebarAdm from "../../../../components/sidebar/adm"
import Style from "../cadastro.module.scss"
import { api } from "../../../../services/api";
import swal from 'sweetalert';

interface produtoProps {
    produto_id: number,
    produto_nome: string,
    produto_valor: number,
    produto_data: Date
}

export default function CadastroProduto() {

    const [produtos, setProdutos] = useState<produtoProps[]>([]);
    const nomeRef = useRef<HTMLInputElement | null>(null);
    const valorRef = useRef<HTMLInputElement | null>(null);
    const dataRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        carregaProduto();
    }, [])

    async function carregaProduto() {
        const response = await api.get("/produtos")
        setProdutos(response.data)
    }

    async function criaProduto() {
        if(!nomeRef.current?.value || !valorRef.current?.value || !dataRef.current?.value) return;
        console.log(nomeRef.current?.value)
        console.log(valorRef.current?.value)
        console.log(dataRef.current?.value)
        dataRef.current.value += "T00:00:00.000Z"

        const response = await api.post("/produto", {
            produto_nome: nomeRef.current?.value,
            produto_valor: parseFloat(valorRef.current?.value),
            produto_data: dataRef.current?.value
        })

        nomeRef.current.value = ""
        valorRef.current.value = ""
        dataRef.current.value = ""

        swal({
            title: "Produto cadastrado",
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
                    <h1>Cadastro Produto</h1>
                </div>
                <div>
                    <input type='text' name="nome" placeholder="Nome" ref={nomeRef}></input>
                    <i className='bx bx-rename' ></i> &nbsp; {/* mudar */}
                </div>
                <div>
                    <input type='number' name="valor" placeholder="Valor" ref={valorRef}></input>
                    <i className='bx bx-dollar-circle'></i> &nbsp;
                </div>
                <div>
                    <input type='text' name="data" placeholder="Data" ref={dataRef}></input>
                    <i className='bx bx-calendar' ></i> &nbsp;
                </div>
                <div>
                    <button onClick={criaProduto}><h3>Registrar</h3></button>
                </div>
            </div>
        </>
    )
}