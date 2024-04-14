// import PlanilhaVendas from "../../assets/planilhaVenda";
import Linha from "../graficos/linha/index";
import Pizza from "../graficos/pie/index";
import Style from "../bloco/bloco.module.scss";

export default function Bloco({v1,v2,v3,v4}: {v1: Array<number>, v2: Array<number>, v3: Array<number>, v4: Array<number>}){
    // let vendas = new PlanilhaVendas()
    return (
        <div className={Style.dashboard}>
            <div className={Style.dashboardBlocos}>
                <div className={Style.dashboardGraficos}>
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
                </div> 
                <div className={Style.dashboardGraficos}>
                    <h3>Produto Antigo</h3>
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
            </div>
            <div className={Style.dashboardGraficos}>
                <h3>Geral</h3>
                <div className={Style.graficoPizza}>
                    <Pizza valores={[1,2,3,4]} legenda={['v1', 'v2', 'v3', 'v4']}  />
                </div>
                <div className={Style.valores}>
                    <h5>TOTAL VENDIDO (R$)</h5>
                    <label>1.970,00</label>
                </div>
                <div className={Style.valores}>
                    <h5>TOTAL DE COMISSÃO (R$)</h5>
                    <label>987,00</label>
                </div>
            </div>
        </div>
    );
}