import Pizza from "../../../components/graficos/pie";
import Grid from "../../../components/grid";
import Navbar from "../../../components/navbar";
import Sidebar from "../../../components/sidebar";
import Style from "./dashboardVendedor.module.scss";

export default function DashboardVendedor(){
    return(
    <>
      <Navbar />
      <Sidebar />
      <div className={Style.cards}>
        <div className={Style.topTitle}>
          <h1>Dashboard</h1>
        </div>
        <Grid />
        <section className={Style.grafico}>
          <Pizza valores={[10,20,30,40]} legenda={['Cliente Novo/Produto Novo', 'Cliente Antigo/Produto Novo', 'Cliente Antigo/Produto Antigo', 'Cliente Novo/Produto Antigo']} />
        </section>
      </div>
    </>
    );
}