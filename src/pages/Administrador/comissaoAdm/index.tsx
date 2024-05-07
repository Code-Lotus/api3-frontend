import Navbar from "../../../components/navbar";
import Style from "../comissaoAdm/comissaoAdm.module.scss"
import HistoricoAdm from "../../../components/historicoAdm";
import SidebarAdm from "../../../components/sidebar/adm";

export default function ComissaoAdm() {
    return (
        <>
        <Navbar />
        <SidebarAdm />
        <div className={Style.cards}>
          <div className={Style.topTitle}>
            <h1>Comissões</h1>
          </div>
          <div className={Style.log}>
          <HistoricoAdm />
          </div>
        </div>
      </>
    );
}