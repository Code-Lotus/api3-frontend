import Navbar from "../../../components/navbar";
import Style from "../comissaoAdm/comissaoAdm.module.scss"
import SidebarAdm from "../../../components/sidebar/adm";
import Card from "../../../components/card";
import { useEffect, useRef, useState } from "react";
import { api } from "../../../services/api";

interface ComissoesProps {
  comissao_id: number,
  cnpn: number,
  cnpa: number,
  capn: number,
  capa: number
}

export default function ComissaoAdm() {
  const [comissoes, setComissoes] = useState<ComissoesProps[]>([]);
  const cnpnRef = useRef<HTMLInputElement | null>(null);
  const capnRef = useRef<HTMLInputElement | null>(null);
  const cnpaRef = useRef<HTMLInputElement | null>(null);
  const capaRef = useRef<HTMLInputElement | null>(null);
  const [cnpn, setCnpn] = useState('0');
  const [cnpa, setCnpa] = useState('0');
  const [capn, setCapn] = useState('0');
  const [capa, setCapa] = useState('0');

  useEffect(() => {
    carregaComissoes();
  }, [])
  
  async function carregaComissoes() {
    const response = await api.get("/comissoes");
    setComissoes(response.data);

    setCnpn(response.data[0].cnpn.toString());
    setCnpa(response.data[0].cnpa.toString());
    setCapn(response.data[0].capn.toString());
    setCapa(response.data[0].capa.toString());
  }

  async function alteraComissao(){
    if(!cnpnRef.current?.value || !cnpaRef.current?.value || !capnRef.current?.value || !capaRef.current?.value) return;
    
    const newCnpn = parseFloat(cnpnRef.current?.value);
    const newCnpa = parseFloat(cnpaRef.current?.value);
    const newCapn = parseFloat(capnRef.current?.value);
    const newCapa = parseFloat(capaRef.current?.value);
    
    const response = await api.put("/comissao", {
      comissao_id: 1,
      cnpn: newCnpn,
      cnpa: newCnpa,
      capn: newCapn,
      capa: newCapa
    })

    setComissoes(response.data);

    setCnpn(newCnpn.toString());
    setCnpa(newCnpa.toString());
    setCapn(newCapn.toString());
    setCapa(newCapa.toString());

    cnpnRef.current.value = "";
    cnpaRef.current.value = "";
    capnRef.current.value = "";
    capaRef.current.value = "";
  }

  return (
    <>
      <Navbar />
      <SidebarAdm />
      {/* <div className={Style.cards}>
        <div className={Style.topTitle}>
          <h1>Comissões</h1>
        </div>
        <div className={Style.log}>
        <HistoricoAdm />
        </div>
      </div> */}
      <div className={Style.all}>
        <div className={Style.topTitle}>
          <h1>Comissões</h1>
        </div>
        <div className={Style.cards}>
          <Card classeCss="bx bxs-badge-dollar" quantidade={cnpn} titulo={"Cliente novo / Produto novo"} />
          <Card classeCss="bx bxs-badge-dollar" quantidade={cnpa} titulo={"Cliente novo / Produto antigo"} />
          <Card classeCss="bx bxs-badge-dollar" quantidade={capn} titulo={"Cliente antigo / Produto novo"} />
          <Card classeCss="bx bxs-badge-dollar" quantidade={capa} titulo={"Cliente antigo / Produto antigo"} />
        </div>
        {/* <div className={Style.cards}>
          <Card quantidade={""} titulo={""} />
        </div> */}
        <section className={Style.dateTable}>
          <div className={Style.order}>
            <div className={Style.head}>
              <h3>Inserção de comissão</h3>
            </div>
            <div>
              <p> Insira os valores de comissão: </p>
              {/* <input type="file" /> */}
              <p>Cliente novo / Produto novo</p>
              <input type="number" ref={cnpnRef}></input>
              <p>Cliente novo / Produto antigo</p>
              <input type="number" ref={capnRef}></input>
              <p>Cliente antigo / Produto novo</p>
              <input type="number" ref={cnpaRef}></input>
              <p>Cliente antigo / Produto antigo</p>
              <input type="number" ref={capaRef}></input>
            </div>
            <input type="button" value="Inserir" className={Style.buttonSubmit} onClick={alteraComissao}/>
          </div>
        </section>
      </div>
    </>
  );
}