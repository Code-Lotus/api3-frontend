import Navbar from "../../../components/navbar";
import Sidebar from "../../../components/sidebar";
import Style from "../comissaoAdm/comissaoAdm.module.scss"
import HistoricoAdm from "../../../components/historicoAdm";

export default function ComissaoAdm() {
    return (
        <>
        <Navbar />
        <Sidebar />
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