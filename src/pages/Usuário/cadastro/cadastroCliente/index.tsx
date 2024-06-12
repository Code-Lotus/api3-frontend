import { useEffect, useRef, useState } from "react";
import Navbar from "../../../../components/navbar";
import SidebarAdm from "../../../../components/sidebar/adm";
import { api } from "../../../../services/api";
import Style from "../cadastro.module.scss"
import swal from 'sweetalert';

interface clienteProps{
    cliente_id: number,
    cliente_nome: string,
    cliente_cpfcnpj: string,
    cliente_segmento: string,
    cliente_data: Date
}

export default function CadastroCliente(){
    const [clientes, setClientes] = useState<clienteProps[]>([]);
    const nomeRef = useRef<HTMLInputElement | null>(null);
    const cpfcnpjRef = useRef<HTMLInputElement | null>(null);
    const segmentoRef = useRef<HTMLInputElement | null>(null);
    const dataRef = useRef<HTMLInputElement | null>(null);
    useEffect(() => {
        carregaCliente();
    }, [])

    async function carregaCliente() {
        const response = await api.get("/clientes")
        setClientes(response.data)
    }

    async function criaCliente() {
        if(!nomeRef.current?.value || !cpfcnpjRef.current?.value || !dataRef.current?.value || !segmentoRef.current?.value) return;
        // console.log(typeof(dataRef.current.value))
        dataRef.current.value += "T00:00:00.000Z"

        const response = await api.post("/cliente", {
            cliente_nome: nomeRef.current?.value,
            cliente_cpfcnpj: cpfcnpjRef.current?.value,
            cliente_segmento: segmentoRef.current?.value,
            cliente_data: dataRef.current?.value
        })

        nomeRef.current.value = ""
        cpfcnpjRef.current.value = ""
        segmentoRef.current.value = ""
        dataRef.current.value = ""
        
        swal({
            title: "Cliente cadastrado",
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
                    <h1>Cadastro Cliente</h1>
                </div>
                <div>
                    <input type='text' name="nome" placeholder="Nome" ref={nomeRef}></input>
                    <i className='bx bx-user-circle' ></i> &nbsp; {/* mudar */}
                </div>
                <div>
                    <input type='text' name="cpfcnpj" placeholder="Cpf ou Cnpj" ref={cpfcnpjRef}></input>
                    <i className='bx bx-rename' ></i> &nbsp; {/* mudar */}
                </div>
                <div>
                    <input type='text' name="segmento" placeholder="Segmento" ref={segmentoRef}></input>
                    <i className='bx bx-rename' ></i> &nbsp; {/* mudar */}
                </div>
                <div>
                    <input type='text' name="data" placeholder="Data de cadastro" ref={dataRef}></input>
                    <i className='bx bx-calendar' ></i> &nbsp; {/* mudar */}
                </div>
                
                <div>
                    <button onClick={criaCliente}><h3>Registrar</h3></button>
                </div>
            </div>
        </>
    )
}


