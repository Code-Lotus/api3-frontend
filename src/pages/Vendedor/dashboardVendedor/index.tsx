import Card from "../../../components/card";
import Coluna from "../../../components/graficos/coluna";
import Linha from "../../../components/graficos/linha";
import Pizza from "../../../components/graficos/pie";
// import Grid from "../../../components/grid";
import Historico from "../../../components/historico";
import Navbar from "../../../components/navbar";
import Sidebar from "../../../components/sidebar";
import ContextoDashboardPizza from "../../../contexts/contextoDashboard";
import DadosController from "../../../scripts/controllers/dados-controller";
import Vendas from "../../../scripts/controllers/vendas-controller";
import Style from "./dashboardVendedor.module.scss";
import { Database } from "../../../scripts/controllers/localStorage";
import { Component } from "react";
import Comissao from "../../../scripts/models/comissao";

const dadosController = new DadosController()
const vendasController = new Vendas(Database.getPlanilhaVendas())
const comissao = new Comissao()
comissao.defineValComissao(4.5, 'cnpn')
comissao.defineValComissao(3.5, 'cnpa')
comissao.defineValComissao(2.5, 'capn')
comissao.defineValComissao(2.0, 'capa')
const lista = vendasController.calculaPrecoComissoes(comissao)
const total = vendasController.calculaGanho()

export default class DashboardVendedor extends Component {
  static contextType = ContextoDashboardPizza;
  state = {
    valoresPizza: [1, 1, 1, 1], // Valores iniciais
    newPizzaValues: [1, 2, 3, 4], // Valores para o componente Pizza (inicialmente diferentes)
    valoresLinha: [1, 1, 1, 1, 1],
    categoriasLinha: ["Dia 1", "Dia 7", "Dia 15", "Dia 22", "Dia 30"],
    newLinhaValues: [2, 1, 1, 2, 1, 3, 2, 4, 6, 7, 2, 5],
    newLinhaCategories: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    valoresColuna: [[2,3,7]],
    newColunaValues: vendasController.calculaQtdTodosOsMesesComissao(true, 0),
  };

  handleValoresPizzaChange = () => {
    let contexto: any = this.context;
    let opcaoPizza = contexto.opcaoSelecionadaPizza;
    let inputPizza = contexto.valorInputPizza;

    // Atualizar valores de acordo com a opção selecionada
    this.mudaGraficoPizza(opcaoPizza, inputPizza);

    // Atualizar 'newPizzaValues' com os novos valores
    this.setState({ newPizzaValues: this.state.valoresPizza });
  };

  handleValoresLinhaChange = () => {
    let contexto: any = this.context;
    let opcaoLinha = contexto.opcaoSelecionadaLinha;
    let inputLinha = contexto.valorInputLinha;

    this.mudaGraficoLinha(opcaoLinha, inputLinha);

    this.setState({newLinhaCategories: this.state.categoriasLinha, newLinhaValues: this.state.valoresLinha})
  }

  handleValoresColunaChange = () => {
    let contexto: any = this.context;
    let opcaoColuna = contexto.opcaoSelecionadaColuna;
    let inputColuna = contexto.valorInputColuna;

    this.mudaGraficoColuna(opcaoColuna, inputColuna);

    this.setState({newColunaValues: this.state.valoresColuna})
  }

  mudaGraficoPizza(opcao: any, input: any) {
    if (opcao === "Mês") {
      this.setState({ valoresPizza: vendasController.calculaQtdPorComissaoPorMes(parseInt(input))});
    } else if (opcao === "Ano") {
      this.setState({ valoresPizza: vendasController.calculaQtdPorComissaoPorAno(parseInt(input)) }); // Exemplo de valoresPizza para Ano
    } else if (opcao === "Preço Máximo") {
      this.setState({ valoresPizza: vendasController.calculaQtdPorComissaoPorPreco(false, parseInt(input)) }); // Exemplo de valoresPizza para Preço Máximo
    } else if (opcao === "Preço Mínimo") {
      this.setState({ valoresPizza: vendasController.calculaQtdPorComissaoPorPreco(true, parseInt(input)) }); // Exemplo de valoresPizza para Preço Mínimo
    }
  }

  mudaGraficoLinha(opcao: any, input: any){
    if(opcao === "Mês"){
      this.setState({categoriasLinha: ["Dia 7", "Dia 15", "Dia 22", "Dia 30"], valoresLinha: vendasController.calculaQtdDiasDeUmMes(parseInt(input))})
    } else if(opcao === "Ano"){
      this.setState({categoriasLinha: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"], valoresLinha: vendasController.calculaQtdTodosMeses()})
    }
  }

  mudaGraficoColuna(opcao: any, input: any){
    if(opcao === "Preço Máximo"){
      this.setState({valoresColuna: vendasController.calculaQtdTodosOsMesesComissao(false, input)})
    } else if(opcao === "Preço Mínimo"){
      this.setState({valoresColuna: vendasController.calculaQtdTodosOsMesesComissao(true, input)})
    }
  }

  render() {
    const { newPizzaValues, newLinhaValues, newLinhaCategories, newColunaValues } = this.state;

    return (
      <>
        <Navbar />
        <Sidebar />
        <div className={Style.all}>
          <div className={Style.topTitle}>
            <h1>Bem-vindo, vendedor</h1>
          </div>
          <div className={Style.cards}>
            <Card classeCss="bx bxs-cart" quantidade={dadosController.mascaraQuantidade(Database.getPlanilhaVendas().length.toString())} titulo={"Vendas"} />
            <Card classeCss="bx bxs-dollar-circle" quantidade={dadosController.mascaraPreco((lista[0]+lista[1]+lista[2]+lista[3]).toString())} titulo={"Valor em comissão"} />
            <Card classeCss="bx bxs-dollar-circle" quantidade={dadosController.mascaraPreco(total.toString())} titulo={"Valor das vendas"} />
          </div>
          <section className={Style.grafico}>
            <Historico cabecalho={["Data","Produto","Cliente","Valor da Venda"]} campos={vendasController.mostraUltimasVendas(5)}/>
            <div className={Style.cardGeral}>
              <Pizza valores={newPizzaValues} legenda={['Cliente Novo / Produto Novo', 'Cliente Antigo / Produto Novo', 'Cliente Antigo / Produto Antigo', 'Cliente Novo / Produto Antigo']} key={this.state.newPizzaValues.join('')} />
              <button className={Style.botao} onClick={this.handleValoresPizzaChange}>Atualizar</button>
            </div>
          </section>
          <section className={Style.graficos}>
            {/* por enquanto vamos usar pizza, depois sera de coluna */}
            <div className={Style.cardGeralColuna}>
              <Coluna valores={newColunaValues} nome={["Cliente Novo/Produto Novo", "Cliente Novo/Produto Antigo", "Cliente Antigo/Produto Novo", "Cliente Antigo/Produto Antigo"]} categoria={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]} />       
              <button className={Style.botao} onClick={this.handleValoresColunaChange}>Atualizar</button>
            </div>
            <div className={Style.cardGeral}>
              <Linha categoria={newLinhaCategories} nome="Vendas" valor={newLinhaValues} key={this.state.newLinhaValues.join('')}/>
              <button className={Style.botao} onClick={this.handleValoresLinhaChange}>Atualizar</button>  
            </div>
          </section>
        </div>
      </>
    );
  }
}
