import Navbar from "../../../components/navbar";
import Sidebar from "../../../components/sidebar";
import Grid from "../../../components/grid";
import Style from "../dashboardAdm/dashboardAdm.module.scss";
import Historico from "../../../components/historico";
import Pizza from "../../../components/graficos/pie";

export default function DashboardAdm(){
    return(
      <>
      <Navbar />
      <Sidebar />
      <div className={Style.cards}>
        <div className={Style.topTitle}>
          <h1>Bem-vindo, administrador</h1>
        </div>
        <Grid />
        <section className={Style.grafico}>
          <Pizza valores={[25,25,25,25]} legenda={['Cliente Novo / Produto Novo', 'Cliente Antigo / Produto Novo', 'Cliente Antigo / Produto Antigo', 'Cliente Novo / Produto Antigo']} />
          <Historico/>
        </section>
      </div>
    </>
      );
}