import Navbar from "../../../components/navbar";
import Sidebar from "../../../components/sidebar";
import Style from "../dashboardAdm/dashboardAdm.module.scss";
import Pizza from "../../../components/graficos/pie";
import HistoricoAdm from "../../../components/historicoAdm";


export default function DashboardAdm(){
    return(
      <>
      <Navbar />
      <Sidebar />
      <div className={Style.cards}>
        <div className={Style.topTitle}>
          <h1>Bem-vindo, administrador</h1>
        </div>
        <section className={Style.grafico}>
          <HistoricoAdm/>
          
          <Pizza valores={[25,25,25,25]} legenda={['Cliente Novo / Produto Novo', 'Cliente Antigo / Produto Novo', 'Cliente Antigo / Produto Antigo', 'Cliente Novo / Produto Antigo']} />
        </section>
        
      </div>
    </>
      );
}