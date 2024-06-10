import Card from "../../../components/card";
import Coluna from "../../../components/graficos/coluna";
import Linha from "../../../components/graficos/linha";
import Pizza from "../../../components/graficos/pie";
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
import Select from "../../../components/select";
import Input from "../../../components/input";
import Filtros from "../../../scripts/controllers/filtros";
import Vendedor from "../../../scripts/models/vendedor";
import CamposController from "../../../scripts/controllers/camposController";
import ModelsController from "../../../scripts/controllers/models-controller";
import { api } from "../../../services/api";
import PlanilhaVendas from "../../../scripts/models/planilhaVendas";

const dadosController = new DadosController()
const vendasController = new Vendas([])
const camposController = new CamposController(Database.getPlanilhaVendas());
const modelsController = new ModelsController()

const comissao = new Comissao()
const filtro = new Filtros()
const vendas = Database.getPlanilhaVendas()
comissao.defineValComissao(4.5, 'cnpn')
comissao.defineValComissao(3.5, 'cnpa')
comissao.defineValComissao(2.5, 'capn')
comissao.defineValComissao(2.0, 'capa')
const lista = vendasController.calculaPrecoComissoes(comissao, filtro.filtraPorVendedor(new Vendedor('123.456.789-00', 'Joao'), vendas))
const total = vendasController.calculaGanho(filtro.filtraPorVendedor(new Vendedor('123.456.789-00', 'Joao'), vendas))

export default class DashboardVendedor extends Component {
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
    newColunasCategories: ["Dia 5", "Dia 10", "Dia 15", "Dia 20", "Dia 25", "Dia 30"],
    vendas: []
  };

  componentDidMount(): void {
      this.carregaVendas();
  }

  async carregaVendas() {
    const response = await api.get("/vendas")
    const resposta: PlanilhaVendas[] = []
    response.data.forEach(async (venda: any) => {
      let elemento = await modelsController.converteVenda(venda)
      resposta.push(elemento)
    })
    const vendas = modelsController.buscaVendas(resposta, 1)
    vendasController.vendas = vendas
    camposController.vendas= vendas
    this.setState({
      vendas: response.data
    })
  }

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
        this.setState({categoriasLinha: ["Dia 5", "Dia 10", "Dia 15", "Dia 20", "Dia 25", "Dia 30"], valoresLinha: vendasController.calculaQtdDiasDeUmMes(vendasController.filtraPorMesPreco(inputT, false, inputV))})
      } else if(opcaoV === "Preço Mínimo"){
        this.setState({categoriasLinha: ["Dia 5", "Dia 10", "Dia 15", "Dia 20", "Dia 25", "Dia 30"], valoresLinha: vendasController.calculaQtdDiasDeUmMes(vendasController.filtraPorMesPreco(inputT, true, inputV))})
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

    return (
      <>
        <Navbar />
        <Sidebar />
        <div className={Style.all}>
          <div className={Style.topTitle}>
            <h1>Bem-vindo, vendedor</h1>
          </div>
          <Select valores={["Mês", "Ano"]} tipo="tempo"/>
          <Select valores={["Preço Máximo", "Preço Mínimo"]} tipo="valor"/>
          <Input tipo="tempo"/>
          <Input tipo="valor"/>
          <button onClick={this.handleAllChanges}>Filtrar</button>
          <div className={Style.cards}>
            <Card classeCss="bx bxs-cart" quantidade={dadosController.mascaraQuantidade(filtro.filtraPorVendedor(new Vendedor('123.456.789-00', 'Joao'), vendas).length.toString())} titulo={"Vendas"} />
            <Card classeCss="bx bxs-dollar-circle" quantidade={dadosController.mascaraPreco((lista[0]+lista[1]+lista[2]+lista[3]).toString())} titulo={"Valor em comissão"} />
            <Card classeCss="bx bxs-dollar-circle" quantidade={dadosController.mascaraPreco(total.toString())} titulo={"Valor das vendas"} />
          </div>
          <section className={Style.grafico}>
            <Historico cabecalho={["Data","Produto","Cliente","Valor da Venda"]} campos={camposController.mostraUltimasVendas(5)}/>
            <div className={Style.cardGeral}>
              <Pizza valores={newPizzaValues} legenda={['Cliente Novo / Produto Novo', 'Cliente Antigo / Produto Novo', 'Cliente Antigo / Produto Antigo', 'Cliente Novo / Produto Antigo']} key={this.state.newPizzaValues.join('')} />
              {/* <button className={Style.botao} onClick={this.handleValoresPizzaChange}>Atualizar</button> */}
            </div>
          </section>
          <section className={Style.graficos}>
            {/* por enquanto vamos usar pizza, depois sera de coluna */}
            <div className={Style.cardGeralColuna}>
              <Coluna valores={valoresColuna} nome={["Cliente Novo/Produto Novo", "Cliente Antigo/Produto Novo", "Cliente Novo/Produto Antigo", "Cliente Antigo/Produto Antigo"]} categoria={categoriasColuna} />       
              {/* <button className={Style.botao} onClick={this.handleValoresColunaChange}>Atualizar</button> */}
            </div>
            <div className={Style.cardGeral}>
              <Linha categoria={newLinhaCategories} nome="Vendas" valor={newLinhaValues} key={this.state.newLinhaValues.join('')}/>
              {/* <button className={Style.botao} onClick={this.handleValoresLinhaChange}>Atualizar</button>   */}
            </div>
          </section>
        </div>
      </>
    );
  }
}
