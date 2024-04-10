// import PlanilhaVendas from "../../assets/planilhaVenda";
import Linha from "../graficos/linha/index";
import Pizza from "../graficos/pie/index";

export default function Bloco({v1,v2,v3,v4}: {v1: Array<number>, v2: Array<number>, v3: Array<number>, v4: Array<number>}){
    // let vendas = new PlanilhaVendas()
    return (
        <>
            <div>
                <h3>Geral</h3>
                <Pizza  />
            </div>
            <div>
                <h3>Produto Novo</h3>
                <Linha categoria={["Janeiro", "Fevereiro", "Março", "Abril", "Maio"]} nome="produto" valor={[1,2,3,4,10]} />
                <Linha categoria={["Janeiro", "Fevereiro", "Março", "Abril", "Maio"]} nome="produto" valor={[1,2,3,4,5]} />
            </div>
            <div>
                <h3>Produto Velho</h3>
                <Linha categoria={["Janeiro", "Fevereiro", "Março", "Abril", "Maio"]} nome="produto" valor={[1,2,3,4,5]}/>
                <Linha categoria={["Janeiro", "Fevereiro", "Março", "Abril", "Maio"]} nome="produto" valor={[1,2,3,5,7 ]}/>
            </div>
        </>
    );
}