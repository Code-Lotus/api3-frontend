// import PlanilhaVendas from "../../assets/planilhaVenda";
import Linha from "../graficos/linha/index";
import Pizza from "../graficos/pie/index";
import Style from "../bloco/bloco.module.scss";

export default function Bloco({v1,v2,v3,v4}: {v1: Array<number>, v2: Array<number>, v3: Array<number>, v4: Array<number>}){
    // let vendas = new PlanilhaVendas()
    return (
        <div className={Style.dashboard}>
            <div className={Style.dashboardBlocos}>
                <h3>Produto Novo</h3>
                <div className={Style.dashboardBlocosProduto}>
                    <section>
                        <h4>Cliente novo</h4>
                        <div className={Style.grafico}>
                            <Linha categoria={["Janeiro", "Fevereiro", "Março", "Abril", "Maio"]} nome="produto" valor={[1,2,3,4,10]} />
                        </div>
                    </section>
                    <section>
                        <h4>Cliente antigo</h4>
                        <div className={Style.grafico}>
                            <Linha categoria={["Janeiro", "Fevereiro", "Março", "Abril", "Maio"]} nome="produto" valor={[1,2,3,4,5]} />
                        </div>
                    </section>
                </div>
                <h3>Produto antigo</h3>
                <div className={Style.dashboardBlocosProduto}>
                    <section>
                        <h4>Cliente novo</h4>
                        <div className={Style.grafico}>
                            <Linha categoria={["Janeiro", "Fevereiro", "Março", "Abril", "Maio"]} nome="produto" valor={[1,2,3,4,5]}/>
                        </div>
                    </section>
                    <section>
                        <h4>Cliente antigo</h4>
                        <div className={Style.grafico}>
                            <Linha categoria={["Janeiro", "Fevereiro", "Março", "Abril", "Maio"]} nome="produto" valor={[1,2,3,5,7 ]}/>
                        </div>
                    </section>
                </div>
            </div>
            <div className={Style.graficoPizza}>
                <h3 className="tituloGraficoPizza">Geral</h3>
                <Pizza valores={[1,2,3,4]} legenda={['novo', 'velho', 'mumia', 'cadaver']}  />
            </div>
        </div>
    );
}