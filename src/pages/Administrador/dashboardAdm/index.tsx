import Navbar from "../../../components/navbar";
import Style from "../dashboardAdm/dashboardAdm.module.scss";
import Pizza from "../../../components/graficos/pie";
import SidebarAdm from "../../../components/sidebar/adm";
import { Component } from "react";
import ContextoDashboardPizza from "../../../contexts/contextoDashboard";
import Coluna from "../../../components/graficos/coluna";
import Linha from "../../../components/graficos/linha";
import DadosController from "../../../scripts/controllers/dados-controller";
import Vendas from "../../../scripts/controllers/vendas-controller";
import { Database } from "../../../scripts/controllers/localStorage";
import Card from "../../../components/card";
import HistoricoAdm from "../../../components/historicoAdm";
import Select from "../../../components/select";
import Input from "../../../components/input";

const dadosController = new DadosController()
const vendasController = new Vendas(Database.getPlanilhaVendas()) //Puxar do banco

export default class DashboardAdm extends Component{
  static contextType = ContextoDashboardPizza;
  state = {
    valoresPizza: [1, 1, 1, 1], // Valores iniciais
    newPizzaValues: [1, 2, 3, 4], // Valores para o componente Pizza (inicialmente diferentes)
    valoresLinha: [1, 1, 1, 1, 1],
    categoriasLinha: ["Dia 1", "Dia 7", "Dia 15", "Dia 22", "Dia 30"],
    newLinhaValues: [2, 1, 1, 2, 1, 3, 2, 4, 6, 7, 2, 5],
    newLinhaCategories: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    valoresColuna: vendasController.calculaQtdTodosOsMesesComissao(false, 10000),
    newColunaValues: vendasController.calculaQtdTodosOsMesesComissao(true, 0),
    categoriasColuna: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    newColunasCategories: ["Dia 5", "Dia 10", "Dia 15", "Dia 20", "Dia 25", "Dia 30"]
  };

  handleValoresPizzaChange = () => {
    console.log("Mudou pizza")
    let contexto: any = this.context;
    let opcaoTempo = contexto.opcaoSelecionadaTempo;
    let inputTempo = contexto.valorInputTempo;
    let opcaoValor = contexto.opcaoSelecionadaValor;
    let inputValor = contexto.valorInputValor;

    // Atualizar valores de acordo com a opção selecionada
    this.mudaGraficoPizza(opcaoTempo, inputTempo, opcaoValor, inputValor);

    // Atualizar 'newPizzaValues' com os novos valores
    this.setState({ newPizzaValues: this.state.valoresPizza });
  };

  handleValoresLinhaChange = () => {
    console.log("Mudou linha")
    let contexto: any = this.context;
    let opcaoTempo = contexto.opcaoSelecionadaTempo;
    let inputTempo = contexto.valorInputTempo;
    let opcaoValor = contexto.opcaoSelecionadaValor;
    let inputValor = contexto.valorInputValor;

    this.mudaGraficoLinha(opcaoTempo, inputTempo, opcaoValor, inputValor);

    this.setState({newLinhaCategories: this.state.categoriasLinha, newLinhaValues: this.state.valoresLinha})
  }

  handleValoresColunaChange = () => {
    console.log("Mudou coluna")
    let contexto: any = this.context;
    let opcaoTempo = contexto.opcaoSelecionadaTempo;
    let inputTempo = contexto.valorInputTempo;
    let opcaoValor = contexto.opcaoSelecionadaValor;
    let inputValor = contexto.valorInputValor;
    this.mudaGraficoColuna(opcaoTempo, inputTempo, opcaoValor, inputValor);
    this.setState({newColunaCategories: this.state.categoriasColuna, newColunaValues: this.state.valoresColuna})
  }

  handleAllChanges = () => {
    this.handleValoresPizzaChange();
    this.handleValoresColunaChange();
    this.handleValoresLinhaChange();
  }

  mudaGraficoPizza(opcaoT: string, inputT: number, opcaoV: string, inputV: number) {
    if (opcaoT === "Mês") {
      if(opcaoV === "Preço Máximo"){
        this.setState({ valoresPizza: vendasController.calculaQtdPorComissaoPorMes(vendasController.filtraPorMesPreco(inputT, false, inputV), inputT)});
      } else if(opcaoV === "Preço Mínimo"){
        this.setState({ valoresPizza: vendasController.calculaQtdPorComissaoPorMes(vendasController.filtraPorMesPreco(inputT, true, inputV), inputT)});
      }
    } else if (opcaoT === "Ano") {
      if (opcaoV === "Preço Máximo") {
        this.setState({ valoresPizza: vendasController.calculaQtdPorComissaoPorAno(vendasController.filtraPorAnoPreco(inputT, false, inputV), inputT) }); // Exemplo de valoresPizza para Ano
      } else if (opcaoV === "Preço Mínimo") {
        this.setState({ valoresPizza: vendasController.calculaQtdPorComissaoPorAno(vendasController.filtraPorAnoPreco(inputT, true, inputV), inputT) });
      }
    }
  }

  mudaGraficoLinha(opcaoT: string, inputT: number, opcaoV: string, inputV: number){
    if(opcaoT === "Mês"){
      if(opcaoV === "Preço Máximo"){
        this.setState({categoriasLinha: ["Dia 5", "Dia 10", "Dia 15", "Dia 20", "Dia 25", "Dia 30"], valoresLinha: vendasController.calculaQtdDiasDeUmMes(vendasController.filtraPorMesPreco(inputT, false, inputV), inputT)})
      } else if(opcaoV === "Preço Mínimo"){
        this.setState({categoriasLinha: ["Dia 5", "Dia 10", "Dia 15", "Dia 20", "Dia 25", "Dia 30"], valoresLinha: vendasController.calculaQtdDiasDeUmMes(vendasController.filtraPorMesPreco(inputT, true, inputV), inputT)})
      }
    } else if(opcaoT === "Ano"){
      if(opcaoV === "Preço Máximo"){
        this.setState({categoriasLinha: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"], valoresLinha: vendasController.calculaQtdTodosMeses(inputT, false, inputV)})
      } else if(opcaoV === "Preço Mínimo"){
        this.setState({categoriasLinha: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"], valoresLinha: vendasController.calculaQtdTodosMeses(inputT, true, inputV)})
      }
    }
  }

  mudaGraficoColuna(opcaoT: string, inputT: number, opcaoV: string, inputV: number){
    if(opcaoT === "Mês"){
      this.setState({categoriasColuna: ["Dia 5", "Dia 10", "Dia 15", "Dia 20", "Dia 25", "Dia 30"]})
      if(opcaoV === "Preço Máximo"){
        let valores = vendasController.calculaQtdDiasDoMesComissao(inputT, false, inputV)
        this.setState({valoresColuna: valores})
      } else if(opcaoV === "Preço Mínimo"){
        let valores = vendasController.calculaQtdDiasDoMesComissao(inputT, true, inputV)
        this.setState({valoresColuna: valores})
      }
    } else if(opcaoT === "Ano") {
      this.setState({categoriasColuna: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]})
      if(opcaoV === "Preço Máximo"){
        this.setState({valoresColuna: vendasController.calculaQtdTodosOsMesesComissao(false, inputV)})
      } else if(opcaoV === "Preço Mínimo"){
        this.setState({valoresColuna: vendasController.calculaQtdTodosOsMesesComissao(true, inputV)})
      }
    }
  }


  render() {
    const { newPizzaValues, newLinhaValues, newLinhaCategories, valoresColuna, categoriasColuna } = this.state;
    let contexto: any = this.context;

    return(
      <>
        <Navbar />
        <SidebarAdm />
        <div className={Style.all}>
          <div className={Style.topTitle}>
            <h1>Bem-vindo, Administrador</h1>
          </div>
          <Select valores={["Mês", "Ano"]} tipo="tempo"/>
          <Select valores={["Preço Máximo", "Preço Mínimo"]} tipo="valor"/>
          <Input tipo="tempo"/>
          <Input tipo="valor"/>
          <button onClick={this.handleAllChanges}>Filtrar</button>
          <p>{contexto.opcaoSelecionadaTempo},{contexto.valorInputTempo},{contexto.opcaoSelecionadaValor},{contexto.valorInputValor}</p>
          <div className={Style.cards}>
            <Card classeCss="bx bxs-dollar-circle" quantidade={dadosController.mascaraQuantidade(Database.getPlanilhaVendas().length.toString())} titulo={"Vendas"} />
            {/* <Card classeCss="bx bxs-dollar-circle" quantidade={dadosController.mascaraPreco("200.50")} titulo={"Valor em comissão"} /> */}
            <Card classeCss="bx bxs-dollar-circle" quantidade={dadosController.mascaraPreco(vendasController.calculaGanho().toString())} titulo={"Valor das vendas"} />
          </div>
          <section className={Style.grafico}>
            <HistoricoAdm cabecalho={["Data", "Produto", "Cliente", "Vendedor", "Valor da Venda"]} campos={vendasController.mostraUltimasVendasAdm(5)}/>
            <div className={Style.cardGeral}>
              <Pizza valores={newPizzaValues} legenda={['Cliente Novo / Produto Novo', 'Cliente Antigo / Produto Novo', 'Cliente Antigo / Produto Antigo', 'Cliente Novo / Produto Antigo']} key={this.state.newPizzaValues.join('')} />
              <button className={Style.botao} onClick={this.handleValoresPizzaChange}>Atualizar</button>
            </div>
          </section>
          <section className={Style.graficos}>
            <div className={Style.cardGeralColuna}>
              <Coluna valores={valoresColuna} nome={["Cliente Novo/Produto Novo", "Cliente Novo/Produto Antigo", "Cliente Antigo/Produto Novo", "Cliente Antigo/Produto Antigo"]} categoria={categoriasColuna} />
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