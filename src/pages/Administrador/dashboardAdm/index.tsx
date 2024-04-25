import Navbar from "../../../components/navbar"
import Sidebar from "../../../components/sidebar"
import Grid from "../../../components/grid";
import Style from "../dashboardAdm/dashboardAdm.module.scss"
import ContainerGrafico from "../../../components/container-adm";

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
          <ContainerGrafico />
        </div>
      </>
      );
}