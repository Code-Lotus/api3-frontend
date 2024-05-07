import Navbar from "../../../components/navbar";
import Style from "../dashboardAdm/dashboardAdm.module.scss";
import Pizza from "../../../components/graficos/pie";
import HistoricoAdm from "../../../components/historicoAdm";
import SidebarAdm from "../../../components/sidebar/adm";


export default function DashboardAdm(){
    return(
      <>
      <Navbar />
      <SidebarAdm />
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