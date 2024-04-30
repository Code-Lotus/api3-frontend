import Card from "../../../components/card";
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
          <Pizza valores={[10,20,30,40]} legenda={['Cliente Novo / Produto Novo', 'Cliente Antigo / Produto Novo', 'Cliente Antigo / Produto Antigo', 'Cliente Novo / Produto Antigo']} />
          <Historico/>
        </section>
      </div>
    </>
    );
}
