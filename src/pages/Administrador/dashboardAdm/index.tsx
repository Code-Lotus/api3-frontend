import Navbar from "../../../components/navbar";
import Style from "../dashboardAdm/dashboardAdm.module.scss";
import Pizza from "../../../components/graficos/pie";
import SidebarAdm from "../../../components/sidebar/adm";
import { Component} from "react";
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
import { api } from "../../../services/api";
import CamposController from "../../../scripts/controllers/camposController";
import ModelsController from "../../../scripts/controllers/models-controller";
import Comissao from "../../../scripts/models/comissao";
import Filtros from "../../../scripts/controllers/filtros";

const dadosController = new DadosController();
const vendasController = new Vendas([]);
const camposController = new CamposController([]);
const modelsController = new ModelsController();

const comissao = new Comissao();
const filtro = new Filtros();

function somaComissao(lista: number[]) {
  let retorno = 0
  lista.forEach(n => {
    retorno+=n
  })
  return retorno
}

export default class DashboardAdm extends Component {
  static contextType = ContextoDashboardPizza;
  state = {
    valoresPizza: [1, 1, 1, 1], // Valores iniciais
    newPizzaValues: [1, 2, 3, 4], // Valores para o componente Pizza (inicialmente diferentes)
    valoresLinha: [1, 1, 1, 1, 1],
    categoriasLinha: ["Dia 1", "Dia 7", "Dia 15", "Dia 22", "Dia 30"],
    newLinhaValues: [2, 1, 1, 2, 1, 3, 2, 4, 6, 7, 2, 5],
    newLinhaCategories: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    valoresColuna: [[1,2,3],[4,5,6],[7,8,9]],
    newColunaValues: [[1,2,3],[4,5,6],[7,8,9]],
    categoriasColuna: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    newColunasCategories: ["Dia 5", "Dia 10", "Dia 15", "Dia 20", "Dia 25", "Dia 30"],
    vendas: [],
    qtd: '0',
    listaComissao: [],
    totalComissao: '0',
    total: '0'
  };
  
  // vendasController: Vendas | null = null

  componentDidMount(): void {
     this.carregaVendas();
  }

  async carregaComissao() {
    const response = await api.get("/comissoes")
    comissao.defineValComissao(response.data[0].cnpn, 'cnpn')
    comissao.defineValComissao(response.data[0].capn, 'capn')
    comissao.defineValComissao(response.data[0].cnpa, 'cnpa')
    comissao.defineValComissao(response.data[0].capa, 'capa')
  }

  async carregaVendas() {
    const response = await api.get("/vendas");
    const resposta: any[] = []
    for(const venda of response.data){
        let elemento = await modelsController.converteVenda(venda)
        resposta.push(elemento)
    }
    vendasController.vendas = resposta
    camposController.vendas = resposta
    await this.carregaComissao()
    this.setState({
      vendas: resposta,
      qtd: vendasController.vendas.length.toString(),
      listaComissao: vendasController.calculaPrecoComissoes(comissao, resposta),
      totalComissao: somaComissao(this.state.listaComissao).toString(),
      total: vendasController.calculaGanho(vendasController.vendas).toString(),
      valoresColuna: vendasController.calculaQtdTodosOsMesesComissao(false, 1000000, 2024),
      newColunaValues: vendasController.calculaQtdTodosOsMesesComissao(true, 0, 2024),
      valoresPizza: vendasController.calculaQtdPorComissaoPorAno(vendasController.filtraPorAnoPreco(2024, false, 1000000), 2024),
      newPizzaValues: vendasController.calculaQtdPorComissaoPorAno(vendasController.filtraPorAnoPreco(2024, true, 1), 2024),
      valoresLinha: vendasController.calculaQtdTodosMeses(2024, false, 1000000),
      newLinhaValues: vendasController.calculaQtdTodosMeses(2024, true, 1)
      })
  }
  
  handleValoresPizzaChange = () => {
    let contexto: any = this.context;
    let opcaoTempo = contexto.opcaoSelecionadaTempo;
    let inputTempo = contexto.valorInputTempo;
    let opcaoValor = contexto.opcaoSelecionadaValor;
    let inputValor = contexto.valorInputValor;

    this.mudaGraficoPizza(opcaoTempo, inputTempo, opcaoValor, inputValor);

    this.setState({ newPizzaValues: this.state.valoresPizza });
  };

  handleValoresLinhaChange = () => {
    let contexto: any = this.context;
    let opcaoTempo = contexto.opcaoSelecionadaTempo;
    let inputTempo = contexto.valorInputTempo;
    let opcaoValor = contexto.opcaoSelecionadaValor;
    let inputValor = contexto.valorInputValor;

    this.mudaGraficoLinha(opcaoTempo, inputTempo, opcaoValor, inputValor);

    this.setState({newLinhaCategories: this.state.categoriasLinha, newLinhaValues: this.state.valoresLinha})
  }

  handleValoresColunaChange = () => {
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
        this.setState({ valoresPizza: vendasController.calculaQtdPorComissaoPorMes(vendasController.filtraPorMesPreco(inputT, false, inputV, vendasController.vendas), inputT)});
      } else if(opcaoV === "Preço Mínimo"){
        this.setState({ valoresPizza: vendasController.calculaQtdPorComissaoPorMes(vendasController.filtraPorMesPreco(inputT, true, inputV, vendasController.vendas), inputT)});
      }
    } else if (opcaoT === "Ano") {
      if (opcaoV === "Preço Máximo") {
        this.setState({ valoresPizza: vendasController.calculaQtdPorComissaoPorAno(vendasController.filtraPorAnoPreco(inputT, false, inputV), inputT) });
      } else if (opcaoV === "Preço Mínimo") {
        this.setState({ valoresPizza: vendasController.calculaQtdPorComissaoPorAno(vendasController.filtraPorAnoPreco(inputT, true, inputV), inputT) });
      }
    }
  }

  mudaGraficoLinha(opcaoT: string, inputT: number, opcaoV: string, inputV: number){
    if(opcaoT === "Mês"){
      if(opcaoV === "Preço Máximo"){
        this.setState({categoriasLinha: ["Dia 5", "Dia 10", "Dia 15", "Dia 20", "Dia 25", "Dia 30"], valoresLinha: vendasController.calculaQtdDiasDeUmMes(vendasController.filtraPorMesPreco(inputT, false, inputV, vendasController.vendas))})
      } else if(opcaoV === "Preço Mínimo"){
        this.setState({categoriasLinha: ["Dia 5", "Dia 10", "Dia 15", "Dia 20", "Dia 25", "Dia 30"], valoresLinha: vendasController.calculaQtdDiasDeUmMes(vendasController.filtraPorMesPreco(inputT, true, inputV, vendasController.vendas))})
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
        this.setState({valoresColuna: vendasController.calculaQtdTodosOsMesesComissao(false, inputV, inputT)})
      } else if(opcaoV === "Preço Mínimo"){
        this.setState({valoresColuna: vendasController.calculaQtdTodosOsMesesComissao(true, inputV, inputT)})
      }
    }
  }


  render() {
    const { newPizzaValues, newLinhaValues, newLinhaCategories, valoresColuna, categoriasColuna, vendas } = this.state;
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
          <br/>
          <Input tipo="tempo"/>
          <Input tipo="valor"/>
          <button className={Style.btnConfirm} onClick={this.handleAllChanges}>Filtrar</button>
          {/* <p>{contexto.opcaoSelecionadaTempo},{contexto.valorInputTempo},{contexto.opcaoSelecionadaValor},{contexto.valorInputValor}</p>
          <p>{vendas.length}</p> */}
          <div className={Style.cards}>
            <Card classeCss="bx bxs-cart" quantidade={dadosController.mascaraQuantidade(this.state.qtd)} titulo={"Vendas"} />
            <Card classeCss="bx bxs-dollar-circle" quantidade={dadosController.mascaraPreco(this.state.totalComissao)} titulo={"Valor em comissão"} />
            <Card classeCss="bx bxs-dollar-circle" quantidade={dadosController.mascaraPreco(this.state.total)} titulo={"Valor das vendas"} />
          </div>
          <section className={Style.grafico}>
            <HistoricoAdm cabecalho={["Data", "Produto", "Cliente", "Vendedor", "Valor da Venda"]} campos={vendasController.vendas.length < 5 ? camposController.mostraUltimasVendasAdm(vendasController.vendas.length) : camposController.mostraUltimasVendasAdm(5)}/>
            <div className={Style.cardGeral}>
              <Pizza valores={newPizzaValues} legenda={['Cliente Novo / Produto Novo', 'Cliente Antigo / Produto Novo', 'Cliente Antigo / Produto Antigo', 'Cliente Novo / Produto Antigo']} key={this.state.newPizzaValues.join('')} />
              {/* <button className={Style.botao} onClick={this.handleValoresPizzaChange}>Atualizar</button> */}
            </div>
          </section>
          <section className={Style.graficos}>
            <div className={Style.cardGeralColuna}>
              <Coluna valores={valoresColuna} nome={["Cliente Novo/Produto Novo", "Cliente Antigo/Produto Novo", "Cliente Antigo/Produto Antigo", "Cliente Novo/Produto Antigo"]} categoria={categoriasColuna} />
              {/* <button className={Style.botao} onClick={this.handleValoresColunaChange}>Atualizar</button> */}
            </div>
            <div className={Style.cardGeral}>
              <Linha categoria={newLinhaCategories} nome="Vendas" valor={newLinhaValues} key={this.state.newLinhaValues.join('')}/>
              {/* <button className={Style.botao} onClick={this.handleValoresLinhaChange}>Atualizar</button> */}
            </div>
          </section>
        </div>
      </>
      );
  }
}