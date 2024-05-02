import Card from "../../../components/card";
import Coluna from "../../../components/graficos/coluna";
import Linha from "../../../components/graficos/linha";
import Pizza from "../../../components/graficos/pie";
import Grid from "../../../components/grid";
import Historico from "../../../components/historico";
import Navbar from "../../../components/navbar";
import Sidebar from "../../../components/sidebar";
import DadosController from "../../../scripts/controllers/dados-controller";
import Style from "./dashboardVendedor.module.scss";

const dadosController=new DadosController()

export default function DashboardVendedor(){
    return(
    <>
      <Navbar />
      <Sidebar />
      <div className={Style.all}>
        <div className={Style.topTitle}>
          <h1>Bem-vindo, vendedor</h1>
        </div>
        <div className={Style.cards}>
          <Card classeCss="bx bxs-dollar-circle" quantidade={dadosController.mascaraQuantidade("100000")} titulo={"Vendas"} />
          <Card classeCss="bx bxs-dollar-circle" quantidade={dadosController.mascaraPreco("200.50")} titulo={"Valor em comissão"} />
          <Card classeCss="bx bxs-dollar-circle" quantidade={dadosController.mascaraPreco("40000")} titulo={"Valor das vendas"} />
        </div>
        <section className={Style.grafico}>
          <Historico/>
          <Pizza valores={[20,20,30,30]} legenda={['Cliente Novo / Produto Novo', 'Cliente Antigo / Produto Novo', 'Cliente Antigo / Produto Antigo', 'Cliente Novo / Produto Antigo']} />
        </section>
        <section className={Style.cards}>
          {/* por enquanto vamos usar pizza, depois sera de coluna */}
          <Coluna valores={[[1,2,3],[4,5,6]]} nome={["produto1", "produto2","produto3" ]} categoria={["jan", "fev"]} />       
          <Linha categoria={["oiii","aaaaaa"]} nome="SAbo" valor={[1,2]}/>   
        </section>

      </div>
    </>
    );
}
