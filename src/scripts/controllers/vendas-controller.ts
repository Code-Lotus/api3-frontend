import Comissao from '../models/comissao';
import PlanilhaVendas from '../models/planilhaVendas';
import Vendedor from '../models/vendedor';
import Produto from '../models/produto';
import Cliente from '../models/cliente';
import CampoProduto from '../models/campoProduto';
import CampoProdutoAdm from '../models/campoProdutoAdm';
import Filtros from './filtros';

const filtro = new Filtros();

export default class Vendas {
    private _vendas: Array<PlanilhaVendas>
    private _meses: ReadonlyArray<string>
    
    constructor(vendas: Array<PlanilhaVendas>){
        this._vendas = vendas
        this._meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    }

    public get vendas(): Array<PlanilhaVendas> {
        return this._vendas
    }

    //----------------------FILTROS DE FAIXA TEMPORAL--------------------------//

    public filtraPorAno(ano: number): ReadonlyArray<PlanilhaVendas> {
        const listaFiltrada: Array<PlanilhaVendas> = [] //cria uma lista para armazenar a lista filtrada
        this.vendas.forEach((venda => { //percorre a lista completa de vendas
            if(new Date(venda._data).getFullYear() === ano) { 
                listaFiltrada.push(venda) //e adiciona na lista filtrada onde o ano da venda do prduto é igual o ano da venda pesquisada no argumento 
            }
        }))
        return listaFiltrada //retorna a lista filtrada
    }

    //----------------------FILTROS--------------------------//

    //função responsável por filtrar as vendas de um único cliente passado como argumento
    public filtraPorCliente(cliente: Cliente, lista: Array<PlanilhaVendas>): ReadonlyArray<PlanilhaVendas> {
        const listaFiltrada: Array<PlanilhaVendas> = [] //cria uma lista para armazenar a lista filtrada
        lista.forEach((venda => { //percorre a lista completa de vendas
            if(venda._cliente.cpfcnpj === cliente.cpfcnpj) { 
                listaFiltrada.push(venda) //e adiciona na lista filtrada onde o cpf/cnpj do cliente é igual ao passado no argumento 
            }
        }))
        return listaFiltrada //retorna a lista filtrada
    }

    //função responsável por filtrar as vendas de um único produto passado como argumento
    public filtraPorProduto(produto: Produto, lista: Array<PlanilhaVendas>): ReadonlyArray<PlanilhaVendas> {
        const listaFiltrada: Array<PlanilhaVendas> = [] //cria uma lista para armazenar a lista filtrada
        lista.forEach((venda => { //percorre a lista completa de vendas
            if(venda._produto.id === produto.id) {
                listaFiltrada.push(venda) //e adiciona na lista filtrada onde o cpf/cnpj do cliente é igual ao passado no argumento
            }
        }))
        return listaFiltrada //retorna a lista filtrada
    }

    //função responsável por filtrar as vendas de um único vendedor passado como argumento
    public filtraPorVendedor(vendedor: Vendedor, lista: Array<PlanilhaVendas>): ReadonlyArray<PlanilhaVendas> {
        const listaFiltrada: Array<PlanilhaVendas> = [] //cria uma lista para armazenar a lista filtrada
        lista.forEach((venda => { //percorre a lista completa de vendas
            if(venda.vendedor.cpf === vendedor.cpf) {
                listaFiltrada.push(venda) //e adiciona na lista filtrada onde o cpf/cnpj do cliente é igual ao passado no argumento
            }
        }))
        return listaFiltrada //retorna a lista filtrada
    }
    
    //função responsável por filtrar as vendas de um único cliente passado como argumento e dentro de uma faixa de valores
    public filtraPorPreco(min: boolean, preco: number): ReadonlyArray<PlanilhaVendas> {
        const listaFiltrada: Array<PlanilhaVendas> = []; //cria uma lista para armazenar a lista filtrada
        this.vendas.forEach((venda) => { //percorre a lista completa de vendas
            if(min) {
                if(venda._valor >= preco){
                    listaFiltrada.push(venda)
                }
            }
            else {
                if(venda._valor <= preco){
                    listaFiltrada.push(venda)
                }
            }
                 //adiciona na lista filtrada onde o cpf/cnpj do cliente é igual ao passado no argumento e o valor está dentro da faixa desejada
    });
        return listaFiltrada; //retorna a lista filtrada
    }

    //--------------------ORDENADORES-----------------------//
    public ordenaQtd(): ReadonlyArray<CampoProduto> {
        return this.criaCampos().sort((a, b) => {
            if(a.qtd > b.qtd){
                return -1
            } else if(a.qtd < b.qtd){
                return 1
            } else {
                return 0
            }
        })
    }

    public ordenaPrecoUni(): ReadonlyArray<CampoProduto> {
        return this.criaCampos().sort((a, b) => {
            if(a.precoUni > b.precoUni){
                return -1
            } else if(a.precoUni < b.precoUni){
                return 1
            } else {
                return 0
            }
        })
    }

    public ordenaPrecoTotal(): ReadonlyArray<CampoProduto> {
        return this.criaCampos().sort((a, b) => {
            if(a.precoTotal > b.precoTotal){
                return -1
            } else if(a.precoTotal < b.precoTotal){
                return 1
            } else {
                return 0
            }
        })
    }
    
    //função que recebe um index do mês e retorna o nome do mês 
    public getMes(index: number): string {
        return this._meses[index]
    }
    
    public pegaUltimosMeses(meses: Array<number>): Array<string> {
        const nomesMeses: Array<string> = []
        meses.forEach((e) => nomesMeses.push(this._meses[e]))
        return nomesMeses
    }

    public calculaGanho(): number{
        let calculoDosMeses = 0
        this.vendas.forEach((venda) => calculoDosMeses += venda._valor)

        return calculoDosMeses
    }

    public calculaQtdPorComissaoPorMes(mes: number): Array<number>{
        let achaTipo = new Comissao()
        let qtdComissao = [0, 0, 0, 0]
        this.vendas.forEach((venda) => {
            if(new Date(venda._data).getMonth() === mes-1){
                const cliente = venda._cliente
                const produto = venda._produto
                let tipo = achaTipo.acharTipo(cliente, produto)
                switch(tipo){
                    case 'cnpn':
                        qtdComissao[0]++
                        break;
                    case 'capn':
                        qtdComissao[1]++
                        break;
                    case 'capa':
                        qtdComissao[2]++
                        break;
                    case 'cnpa':
                        qtdComissao[3]++
                        break;
                }    
            }
        })
    return qtdComissao
    }

    public calculaQtdPorComissaoPorAno(ano: number): Array<number> {
        let listaFiltrada = this.filtraPorAno(ano)
        let achaTipo = new Comissao()
        let qtdComissao = [0, 0, 0, 0]
        listaFiltrada.forEach((venda) => {
            if(new Date(venda._data).getFullYear() === ano){
                const cliente = venda._cliente
                const produto = venda._produto
                let tipo = achaTipo.acharTipo(cliente, produto)
                switch(tipo){
                    case 'cnpn':
                        qtdComissao[0]++
                        break;
                    case 'capn':
                        qtdComissao[1]++
                        break;
                    case 'capa':
                        qtdComissao[2]++
                        break;
                    case 'cnpa':
                        qtdComissao[3]++
                        break;
                }    
            }
        })
    return qtdComissao
    }

    calculaQtdPorComissaoPorPreco(min: boolean, preco: number): Array<number>{
        let listaFiltrada = this.filtraPorPreco(min, preco)
        let achaTipo = new Comissao()
        let qtdComissao = [0, 0, 0, 0]
        listaFiltrada.forEach((venda) => {
            const cliente = venda._cliente
            const produto = venda._produto
            let tipo = achaTipo.acharTipo(cliente, produto)
            switch(tipo){
                case 'cnpn':
                    qtdComissao[0]++
                    break;
                case 'capn':
                    qtdComissao[1]++
                    break;
                case 'capa':
                    qtdComissao[2]++
                    break;
                case 'cnpa':
                    qtdComissao[3]++
                    break;
                } 
        })
        return qtdComissao
    }

    public calculaQtdTodosMeses(): Array<number>{
        //let listaFiltrada = this.filtraPorPreco(min, preco)
        const qtdDosMeses: Array<number> = []
        let graficoMeses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        this._vendas.forEach((venda) => {
            switch(new Date(venda._data).getMonth()) {
                case 0:
                    graficoMeses[0]++
                    break;
                case 1:
                    graficoMeses[1]++
                    break;
                case 2:
                    graficoMeses[2]++
                    break;
                case 3:
                    graficoMeses[3]++
                    break;
                case 4:
                    graficoMeses[4]++
                    break;
                case 5:
                    graficoMeses[5]++
                    break;
                case 6:
                    graficoMeses[6]++
                    break;
                case 7:
                    graficoMeses[7]++
                    break;
                case 8:
                    graficoMeses[8]++
                    break;
                case 9:
                    graficoMeses[9]++
                    break;
                case 10:
                    graficoMeses[10]++
                    break;
                case 11:
                    graficoMeses[11]++
                    break;
            }
        })
        graficoMeses.forEach(n => qtdDosMeses.push(n))
        return qtdDosMeses
    }

    public calculaQtdDiasDeUmMes(mes: number): Array<number> {
        const listaFiltrada = filtro.filtraPorMes(mes, this.vendas)
        const qtdDoMes: Array<number> = []
        let graficoMeses = [0, 0, 0, 0]
        listaFiltrada.forEach(venda => {
            if(new Date(venda._data).getDate() <= 7){
                graficoMeses[0]++
            } else if(new Date(venda._data).getDate() <= 15){
                graficoMeses[1]++
            } else if(new Date(venda._data).getDate() <= 22){
                graficoMeses[2]++
            } else {
                graficoMeses[3]++
            }
        })
        graficoMeses.forEach(n => qtdDoMes.push(n))
        return qtdDoMes
    }

    private calculaUmaComissaoPorMes(comissao: string, lista: Array<PlanilhaVendas>): number{
        let achaTipo = new Comissao()
        let contMes = 0
        lista.forEach(venda => {
            const cliente = venda._cliente
            const produto = venda._produto
            let tipo = achaTipo.acharTipo(cliente, produto)
            if(tipo === comissao){
                contMes++
            }
        })
        return contMes
    }

    public filtraPorMesPreco(mes: number, min: boolean, preco: number){
        const listaFiltrada: Array<PlanilhaVendas> = []
        this.vendas.forEach(venda => {
            if(min){
                if(new Date(venda._data).getMonth() === mes && venda._valor >= preco) {
                    listaFiltrada.push(venda)
                }
            }
            else {
                if(new Date(venda._data).getMonth() === mes && venda._valor <= preco){
                    listaFiltrada.push(venda)
                }
            }
        })
        return listaFiltrada
    }

    public calculaQtdTodosOsMesesComissao(min: boolean, preco: number){
        const qtdDosMeses: Array<number[]> = []
        let listaFiltrada = []
        let cnpn = []
        let cnpa = []
        let capn = []
        let capa = []
        
        for(let i = 0; i < 12; i++){
            listaFiltrada = this.filtraPorMesPreco(i, min, preco)
            cnpn.push(this.calculaUmaComissaoPorMes('cnpn', listaFiltrada))
            cnpa.push(this.calculaUmaComissaoPorMes('cnpa', listaFiltrada))
            capn.push(this.calculaUmaComissaoPorMes('capn', listaFiltrada))
            capa.push(this.calculaUmaComissaoPorMes('capa', listaFiltrada))
        }

        qtdDosMeses.push(cnpn)
        qtdDosMeses.push(cnpa)
        qtdDosMeses.push(capn)
        qtdDosMeses.push(capa)
        return qtdDosMeses
    }

    public calculaPrecoComissoes(comissao: Comissao): Array<number> {
        let precoComissao = [0, 0, 0, 0]
        this._vendas.forEach((venda) => {
            let tipo = comissao.acharTipo(venda._cliente, venda._produto)
            switch(tipo) {
                case 'cnpn':
                    precoComissao[0]+= comissao.calcComissao(venda._valor, 'cnpn')
                    break;
                case 'capn':
                    precoComissao[1]+= comissao.calcComissao(venda._valor, 'capn')
                    break;
                case 'capa':
                    precoComissao[2]+= comissao.calcComissao(venda._valor, 'capa')
                    break;
                case 'cnpa':
                    precoComissao[3]+= comissao.calcComissao(venda._valor, 'cnpa')
                    break;
            }
        })
        return precoComissao
    }

    public criaCampos(): Array<CampoProduto>{
        const ids: Array<number> = []
        const listaProdutos: Array<CampoProduto> = []
        this._vendas.forEach(venda => {
            if(!(ids.includes(venda._produto._id))){
                let campo = new CampoProduto(venda._produto, 1, venda._valor, venda)
                listaProdutos.push(campo)
                ids.push(venda._produto._id)
            } else {
                const index = ids.indexOf(venda._produto._id)
                let qtd = listaProdutos[index].qtd
                let ultimaVenda = listaProdutos[index].ultimaVenda
                
                let campo;

                if(new Date(venda._data).getTime() > new Date(ultimaVenda._data).getTime()){
                    campo = new CampoProduto(venda._produto, qtd+1, venda._valor, venda)
                    campo.ultimaVenda = venda
                    console.log("Entrei")
                }
                else {
                    campo = new CampoProduto(venda._produto, qtd+1, venda._valor, ultimaVenda)
                }
                listaProdutos.splice(index, 1, campo)
            }
        })
        return listaProdutos
    }

    public criaCamposAdm(): Array<CampoProdutoAdm>{
        const ids: Array<number> = []
        const listaProdutos: Array<CampoProdutoAdm> = []
        this._vendas.forEach(venda => {
            if(!(ids.includes(venda._produto._id))){
                let campo = new CampoProdutoAdm(venda._produto, 1, venda._valor, venda._vendedor, venda)
                listaProdutos.push(campo)
                ids.push(venda._produto._id)
            } else {
                const index = ids.indexOf(venda._produto._id)
                let qtd = listaProdutos[index].qtd
                let ultimaVenda = listaProdutos[index].ultimaVenda
                
                let campo;

                if(new Date(venda._data).getTime() > new Date(ultimaVenda._data).getTime()){
                    campo = new CampoProdutoAdm(venda._produto, qtd+1, venda._valor, venda._vendedor, venda)
                    campo.ultimaVenda = venda
                    console.log("Entrei")
                }
                else {
                    campo = new CampoProdutoAdm(venda._produto, qtd+1, venda._valor, venda._vendedor, ultimaVenda)
                }
                listaProdutos.splice(index, 1, campo)
            }
        })
        return listaProdutos
    }

    public mostraUltimasVendas(linhas: number): Array<CampoProduto>{
        const ultimasVendas = []
        for(let i = 0; i < linhas; i++){
            ultimasVendas.push(this.ordenaCampoData()[i])
        }
        return ultimasVendas
    }

    public mostraUltimasVendasAdm(linhas: number): Array<CampoProdutoAdm>{
        const ultimasVendas = []
        for(let i = 0; i < linhas; i++){
            ultimasVendas.push(this.ordenaCampoAdmData()[i])
        }
        return ultimasVendas
    }

    public ordenaCampoData() {
        return this.criaCampos().sort((a, b) => {
            if(new Date(a.ultimaVenda._data).getTime() > new Date(b.ultimaVenda._data).getTime()){
                return -1
            } else if(new Date(b.ultimaVenda._data).getTime() > new Date(a.ultimaVenda._data).getTime()){
                return 1
            } else {
                return 0
            }
        })
    }

    public ordenaCampoAdmData(){
        return this.criaCamposAdm().sort((a, b) => {
            if(new Date(a.ultimaVenda._data).getTime() > new Date(b.ultimaVenda._data).getTime()){
                return -1
            } else if(new Date(b.ultimaVenda._data).getTime() > new Date(a.ultimaVenda._data).getTime()){
                return 1
            } else {
                return 0
            }
        })
    }
}