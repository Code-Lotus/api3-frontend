import Linha from "../graficos/linha";
import Pizza from "../graficos/pie";
import Style from "./bloco.module.scss";
import Vendas from "../../scripts/controllers/vendas-controller"
import PlanilhaVendas from "../../scripts/models/planilhaVendas";
import Vendedor from "../../scripts/models/vendedor";
import Produto from "../../scripts/models/produto";
import Cliente from "../../scripts/models/cliente";
import Comissao from "../../scripts/models/comissao";

export default function Bloco({v1,v2,v3,v4}: {v1: Array<number>, v2: Array<number>, v3: Array<number>, v4: Array<number>}){
    let vendas = new Vendas([new PlanilhaVendas(new Date('3/12/2024'), new Vendedor('123.456.789-00', 'Rafael Araújo Moreno Monteiro'), new Produto(1, 'Sistema de descrição de cargos', new Date('5/11/2022')), new Cliente('30.062.036/0001-60', 'Jorge e Lucas Escritório Contábil', 'Contábil', new Date('1/2/2024')), 1500, 'Parcelado'), new PlanilhaVendas(new Date('4/10/2024'), new Vendedor('123.456.789-00', 'Rafael Araújo Moreno Monteiro'), new Produto(1, 'Sistema de descrição de cargos', new Date('5/11/2024')), new Cliente('30.062.036/0001-60', 'Jorge e Lucas Escritório Contábil', 'Contábil', new Date('1/1/2022')), 1500, 'Parcelado'), new PlanilhaVendas(new Date('4/5/2024'), new Vendedor('987.654.321-00', 'Carolina Silva Santos'), new Produto(2, 'Software de Contabilidade Integrada', new Date('6/15/2024')), new Cliente('45.678.901/0001-23', 'Empresa Tech Solutions', 'Tecnologia', new Date('2/5/2024')), 2000, 'À vista'), new PlanilhaVendas(new Date('4/20/2024'), new Vendedor('111.222.333-44', 'Pedro Oliveira Lima'), new Produto(3, 'Plataforma de Gestão de Projetos', new Date('7/20/2022')), new Cliente('12.345.678/0001-99', 'Empresa Projetos em Ação', 'Consultoria', new Date('3/20/2023')), 3000, 'Parcelado'), new PlanilhaVendas(new Date('4/10/2023'), new Vendedor('555.666.777-88', 'Maria Santos Souza'), new Produto(4, 'Sistema de Gestão de RH', new Date('8/25/2024')), new Cliente('98.765.432/0001-12', 'Empresa RH em Foco', 'Recursos Humanos', new Date('4/10/2024')), 2500, 'Parcelado'), new PlanilhaVendas(new Date('12/15/2022'), new Vendedor('123.456.789-00', 'Rafael Araújo Moreno Monteiro'), new Produto(1, 'Sistema de descrição de cargos', new Date('3/25/2022')), new Cliente('30.062.036/0001-60', 'Jorge e Lucas Escritório Contábil', 'Contábil', new Date('1/18/2022')), 1500, 'Parcelado'), new PlanilhaVendas(new Date('1/7/2024'), new Vendedor('987.654.321-00', 'Carolina Silva Santos'), new Produto(2, 'Software de Contabilidade Integrada', new Date('4/14/2023')), new Cliente('45.678.901/0001-23', 'Empresa Tech Solutions', 'Tecnologia', new Date('2/8/2023')), 2000, 'À vista'), new PlanilhaVendas(new Date('2/19/2025'), new Vendedor('111.222.333-44', 'Pedro Oliveira Lima'), new Produto(3, 'Plataforma de Gestão de Projetos', new Date('1/2/2024')), new Cliente('12.345.678/0001-99', 'Empresa Projetos em Ação', 'Consultoria', new Date('12/29/2023')), 3000, 'Parcelado'), new PlanilhaVendas(new Date('3/3/2023'), new Vendedor('555.666.777-88', 'Maria Santos Souza'), new Produto(4, 'Sistema de Gestão de RH', new Date('12/8/2022')), new Cliente('98.765.432/0001-12', 'Empresa RH em Foco', 'Recursos Humanos', new Date('11/14/2022')), 2500, 'Parcelado'), new PlanilhaVendas(new Date('12/5/2023'), new Vendedor('123.456.789-00', 'Rafael Araújo Moreno Monteiro'), new Produto(5, 'Sistema de folha de pagamento', new Date('4/15/2023')), new Cliente('30.062.036/0001-60', 'Jorge e Lucas Escritório Contábil', 'Contábil', new Date('1/20/2023')), 2200, 'Parcelado'), new PlanilhaVendas(new Date('1/10/2025'), new Vendedor('987.654.321-00', 'Carolina Silva Santos'), new Produto(6, 'Sistema de Gestão de Estoque', new Date('3/22/2024')), new Cliente('45.678.901/0001-23', 'Empresa Tech Solutions', 'Tecnologia', new Date('2/15/2024')), 3200, 'À vista'), new PlanilhaVendas(new Date('2/7/2024'), new Vendedor('111.222.333-44', 'Pedro Oliveira Lima'), new Produto(7, 'Sistema de CRM', new Date('12/8/2023')), new Cliente('12.345.678/0001-99', 'Empresa Projetos em Ação', 'Consultoria', new Date('11/20/2023')), 2800, 'Parcelado'), new PlanilhaVendas(new Date('3/20/2022'), new Vendedor('555.666.777-88', 'Maria Santos Souza'), new Produto(8, 'Sistema de Gestão de Clientes', new Date('1/5/2022')), new Cliente('98.765.432/0001-12', 'Empresa RH em Foco', 'Recursos Humanos', new Date('12/10/2021')), 1800, 'Parcelado'), new PlanilhaVendas(new Date('4/15/2023'), new Vendedor('123.456.789-00', 'Rafael Araújo Moreno Monteiro'), new Produto(9, 'Sistema de Controle de Estoque', new Date('6/25/2023')), new Cliente('30.062.036/0001-60', 'Jorge e Lucas Escritório Contábil', 'Contábil', new Date('2/10/2023')), 2400, 'Parcelado'), new PlanilhaVendas(new Date('12/8/2024'), new Vendedor('987.654.321-00', 'Carolina Silva Santos'), new Produto(10, 'Sistema de Gerenciamento de Projetos', new Date('3/10/2024')), new Cliente('45.678.901/0001-23', 'Empresa Tech Solutions', 'Tecnologia', new Date('1/5/2024')), 2800, 'À vista'), new PlanilhaVendas(new Date('1/14/2025'), new Vendedor('111.222.333-44', 'Pedro Oliveira Lima'), new Produto(11, 'Sistema de E-commerce', new Date('4/20/2024')), new Cliente('12.345.678/0001-99', 'Empresa Projetos em Ação', 'Consultoria', new Date('2/15/2024')), 3500, 'Parcelado'), new PlanilhaVendas(new Date('2/28/2023'), new Vendedor('555.666.777-88', 'Maria Santos Souza'), new Produto(12, 'Sistema de CRM', new Date('5/8/2023')), new Cliente('98.765.432/0001-12', 'Empresa RH em Foco', 'Recursos Humanos', new Date('3/20/2023')), 2100, 'Parcelado'), new PlanilhaVendas(new Date('4/12/2024'), new Vendedor('123.456.789-00', 'Rafael Araújo Moreno Monteiro'), new Produto(13, 'Sistema de Gestão de Vendas', new Date('6/22/2024')), new Cliente('30.062.036/0001-60', 'Jorge e Lucas Escritório Contábil', 'Contábil', new Date('2/15/2024')), 2900, 'Parcelado'), new PlanilhaVendas(new Date('12/18/2023'), new Vendedor('987.654.321-00', 'Carolina Silva Santos'), new Produto(14, 'Sistema de Gestão de Clientes', new Date('3/20/2023')), new Cliente('45.678.901/0001-23', 'Empresa Tech Solutions', 'Tecnologia', new Date('1/15/2023')), 2300, 'À vista'), new PlanilhaVendas(new Date('1/25/2025'), new Vendedor('111.222.333-44', 'Pedro Oliveira Lima'), new Produto(15, 'Sistema de Gerenciamento de Projetos', new Date('4/30/2024')), new Cliente('12.345.678/0001-99', 'Empresa Projetos em Ação', 'Consultoria', new Date('2/25/2024')), 3400, 'Parcelado'), new PlanilhaVendas(new Date('2/5/2023'), new Vendedor('555.666.777-88', 'Maria Santos Souza'), new Produto(16, 'Sistema de E-commerce', new Date('5/15/2023')), new Cliente('98.765.432/0001-12', 'Empresa RH em Foco', 'Recursos Humanos', new Date('3/30/2023')), 2200, 'Parcelado'), new PlanilhaVendas(new Date('4/17/2023'), new Vendedor('123.456.789-00', 'Rafael Araújo Moreno Monteiro'), new Produto(17, 'Sistema de Gestão Financeira', new Date('6/27/2023')), new Cliente('30.062.036/0001-60', 'Jorge e Lucas Escritório Contábil', 'Contábil', new Date('2/20/2023')), 2700, 'Parcelado'), new PlanilhaVendas(new Date('12/23/2024'), new Vendedor('987.654.321-00', 'Carolina Silva Santos'), new Produto(18, 'Sistema de Controle de Estoque', new Date('3/25/2024')), new Cliente('45.678.901/0001-23', 'Empresa Tech Solutions', 'Tecnologia', new Date('1/20/2024')), 2500, 'À vista'), new PlanilhaVendas(new Date('1/30/2023'), new Vendedor('111.222.333-44', 'Pedro Oliveira Lima'), new Produto(19, 'Sistema de CRM', new Date('5/10/2023')), new Cliente('12.345.678/0001-99', 'Empresa Projetos em Ação', 'Consultoria', new Date('3/1/2023')), 3100, 'Parcelado'), new PlanilhaVendas(new Date('2/14/2025'), new Vendedor('555.666.777-88', 'Maria Santos Souza'), new Produto(20, 'Sistema de Gestão de Vendas', new Date('4/22/2024')), new Cliente('98.765.432/0001-12', 'Empresa RH em Foco', 'Recursos Humanos', new Date('12/25/2023')), 2600, 'Parcelado')])
    
    //let qtdAbril = vendas.calculaQtdPorMes("Abril")
    let precoAbril = vendas.calculaGanhoPorMes("Abril")
    
    let comissao = new Comissao()
    comissao.tipo[0].porcentagem = 20
    comissao.tipo[1].porcentagem = 10
    comissao.tipo[2].porcentagem = 5
    comissao.tipo[3].porcentagem = 15

    let comissoes = vendas.calculaPrecoComissoes(comissao)

    let totalVendido = precoAbril[0]+precoAbril[1]+precoAbril[2]+precoAbril[3]+precoAbril[4]
    let totalComissao = comissoes[0] + comissoes[1] + comissoes[2] + comissoes[3]
    
    return (
        <div className={Style.dashboard}>
            <div className={Style.dashboardBlocos}>
                <div className={Style.dashboardGraficos}>
                    <h3>Produto Novo</h3>
                    <div className={Style.dashboardBlocosProduto}>
                        <section>
                            <h4>Cliente novo</h4>
                            <div className={Style.grafico}>
                                <Linha categoria={vendas.pegaUltimosMeses(vendas.indexUltimosMeses(3, 5))} nome="produto" valor={vendas.calculaQtdPorMesComissao("Abril", "cnpn")} />
                            </div>
                        </section>
                        <section>
                            <h4>Cliente antigo</h4>
                            <div className={Style.grafico}>
                                <Linha categoria={vendas.pegaUltimosMeses(vendas.indexUltimosMeses(3,5))} nome="produto" valor={vendas.calculaQtdPorMesComissao("Abril", "capn")} />
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
                                <Linha categoria={vendas.pegaUltimosMeses(vendas.indexUltimosMeses(3,5))} nome="produto" valor={vendas.calculaQtdPorMesComissao("Abril", "cnpa")}/>
                            </div>
                        </section>
                        <section>
                            <h4>Cliente antigo</h4>
                            <div className={Style.grafico}>
                                <Linha categoria={vendas.pegaUltimosMeses(vendas.indexUltimosMeses(3,5))} nome="produto" valor={vendas.calculaQtdPorMesComissao("Abril", "capa")}/>
                            </div>
                        </section>
                    </div>
                </div>               
            </div>
            <div className={Style.dashboardGraficos}>
                <h3>Geral</h3>
                <div className={Style.graficoPizza}>
                    <Pizza valores={vendas.calculaQtdPorComissao()} legenda={['Cliente Novo/Produto Novo', 'Cliente Antigo/Produto Novo', 'Cliente Antigo/Produto Antigo', 'Cliente Novo/Produto Antigo']}  />
                </div>
                <div className={Style.valores}>
                    <h5>TOTAL VENDIDO (R$)</h5>
                    <label>{totalVendido}</label>
                </div>
                <div className={Style.valores}>
                    <h5>TOTAL DE COMISSÃO (R$)</h5>
                    <label>{totalComissao}</label>
                </div>
            </div>
        </div>
    );
}