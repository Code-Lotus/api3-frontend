import Navbar from "../../../components/navbar";
import Style from "../comissaoAdm/comissaoAdm.module.scss"
import SidebarAdm from "../../../components/sidebar/adm";
import Card from "../../../components/card";

export default function ComissaoAdm() {
    return (
        <>
        <Navbar />
        <SidebarAdm />
        {/* <div className={Style.cards}>
          <div className={Style.topTitle}>
            <h1>Comissões</h1>
          </div>
          <div className={Style.log}>
          <HistoricoAdm />
          </div>
        </div> */}
        <div className={Style.all}>
          <div className={Style.topTitle}>
            <h1>Comissões</h1>
          </div>
          <div className={Style.cards}>
            <Card classeCss="bx bxs-badge-dollar" quantidade={"5%"} titulo={"Produto novo / Cliente novo"} />
            <Card classeCss="bx bxs-badge-dollar" quantidade={"3,2%"} titulo={"Cliente novo / Produto antigo"} />
            <Card classeCss="bx bxs-badge-dollar" quantidade={"2,3%"} titulo={"Cliente antigo / Produto novo"} />
            <Card classeCss="bx bxs-badge-dollar" quantidade={"1,5%"} titulo={"Cliente antigo / Produto antigo"} />
          </div>
          {/* <div className={Style.cards}>
            <Card quantidade={""} titulo={""} />
          </div> */}
          <section className={Style.dateTable}>
            <div className={Style.order}>
              <div className={Style.head}>
                <h3>Inserção de comissão</h3>
              </div>
              <div>
                <p> Insira os valores de comissão: </p>
                {/* <input type="file" /> */}
                <p>Cliente novo / Produto novo</p>
                <input type="number"></input>
                <p>Cliente novo / Produto antigo</p>
                <input type="number"></input>
                <p>Cliente antigo / Produto novo</p>
                <input type="number"></input>
                <p>Cliente antigo / Produto antigo</p>
                <input type="number"></input>
              </div>
              <input type="button" value="Inserir" className={Style.buttonSubmit} />
            </div>
          </section>
        </div>
      </>
    );
}