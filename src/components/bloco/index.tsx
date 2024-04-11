// import PlanilhaVendas from "../../assets/planilhaVenda";
import Linha from "../graficos/linha/index";
import Pizza from "../graficos/pie/index";
import Style from "../bloco/bloco.module.scss";

export default function Bloco({v1,v2,v3,v4}: {v1: Array<number>, v2: Array<number>, v3: Array<number>, v4: Array<number>}){
    // let vendas = new PlanilhaVendas()
    return (
        <div className={Style.dashboard}>
            <div className="">
                <h3>Produto Novo</h3>
                <div className={Style.produto}>
                    <div className={Style.grafico}>
                        <h4>Cliente novo</h4>
                        <Linha categoria={["Janeiro", "Fevereiro", "Março", "Abril", "Maio"]} nome="produto" valor={[1,2,3,4,10]} />
                    </div>
                    <div className={Style.grafico}>
                        <h4>Cliente velho</h4>
                        <Linha categoria={["Janeiro", "Fevereiro", "Março", "Abril", "Maio"]} nome="produto" valor={[1,2,3,4,5]} />
                    </div>
                </div>
                <h3>Produto Velho</h3>
                <div className={Style.produto}>
                    <div className={Style.grafico}>
                        <h4>Cliente novo</h4>
                        <Linha categoria={["Janeiro", "Fevereiro", "Março", "Abril", "Maio"]} nome="produto" valor={[1,2,3,4,5]}/>
                    </div>
                    <div className={Style.grafico}>
                        <h4>Cliente velho</h4>
                        <Linha categoria={["Janeiro", "Fevereiro", "Março", "Abril", "Maio"]} nome="produto" valor={[1,2,3,5,7 ]}/>
                    </div>
                </div>
            </div>
            <div>
                <h3>Geral</h3>
                <Pizza valores={[1,2,3,4]} legenda={['novo', 'velho', 'mumia', 'cadaver']}  />
            </div>
        </div>
    );
}