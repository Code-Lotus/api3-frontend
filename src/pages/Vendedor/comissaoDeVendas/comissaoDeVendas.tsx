import Navbar from "../../../components/navbar";
import Sidebar from "../../../components/sidebar";
import Style from "./comissaoDeVendas.module.scss";
import ComissaoDeVendasComponent from "../../../components/comissaoDeVendasComponent";

// Defina algumas comissões fictícias
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const comissoesVendidas = [
  { nome: "Comissão A", porcentagem: 10 },
  { nome: "Comissão B", porcentagem: 15 },
  { nome: "Comissão C", porcentagem: 12 },
];

export default function ComissaoDeVendas() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className={Style.all}>
        <div className={Style.topTitle}>
          <h1>Bem-vindo, administrador</h1>
        </div>
        <div>
          <h1>Exemplo de Comissões de Vendas</h1>
          {/* Renderize o componente ComissaoDeVendasComponent passando as comissões fictícias como propriedade */}
          <ComissaoDeVendasComponent comissao={comissoesVendidas} />
        </div>
      </div>
    </>
  );
}
