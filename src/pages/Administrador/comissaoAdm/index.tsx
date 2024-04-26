import Navbar from "../../../components/navbar";
import Sidebar from "../../../components/sidebar";
import Style from "../comissaoAdm/comissaoAdm.module.scss"
import Grid from "../../../components/grid"
import Comissao from "../../../components/comissao-total";

export default function ComissaoAdm() {
    return (
        <>
        <Navbar />
        <Sidebar />
        <div className={Style.cards}>
          <div className={Style.topTitle}>
            <h1>Comissões</h1>
          </div>
          <Comissao />
        </div>
      </>
    );
}