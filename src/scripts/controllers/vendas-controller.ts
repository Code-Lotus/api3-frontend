import Comissao from '../models/comissao';
import PlanilhaVendas from '../models/planilhaVendas';
import CampoProduto from '../models/campoProduto';
import CampoProdutoAdm from '../models/campoProdutoAdm';
import Filtros from './filtros';
import Vendedor from '../models/vendedor';
import Produto from '../models/produto';
import Cliente from '../models/cliente';
import { api } from '../../services/api';

const filtro = new Filtros();

export default class Vendas {
    private _vendas: Array<PlanilhaVendas>
    private _meses: ReadonlyArray<string>
    
    constructor(vendas: Array<PlanilhaVendas>){
        this._vendas = vendas
        this._meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    }

    public set vendas(vendas: PlanilhaVendas[]) {
        this._vendas = vendas;
    }
    public get vendas(): Array<PlanilhaVendas> {
        return this._vendas
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

    public calculaGanho(lista: PlanilhaVendas[]): number{
        let calculoDosMeses = 0
        lista.forEach((venda) => calculoDosMeses += venda._valor)

        return calculoDosMeses
    }

    public calculaQtdPorComissaoPorMes(lista: PlanilhaVendas[], mes: number): Array<number>{
        let achaTipo = new Comissao()
        let qtdComissao = [0, 0, 0, 0]
        lista.forEach((venda) => {
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

    public calculaQtdPorComissaoPorAno(lista: PlanilhaVendas[], ano: number): Array<number> {
        let achaTipo = new Comissao()
        let qtdComissao = [0, 0, 0, 0]
        lista.forEach((venda) => {
            if(new Date(venda._data).getFullYear() == ano){
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
        let listaFiltrada = filtro.filtraPorPreco(min, preco, this._vendas)
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

    public calculaQtdTodosMeses(ano: number, min: boolean, preco: number): Array<number>{
        const listaFiltrada = this.filtraPorAnoPreco(ano, min, preco)
        const qtdDosMeses: Array<number> = []
        let graficoMeses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        listaFiltrada.forEach((venda) => {
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

    public calculaQtdDiasDeUmMes(lista: PlanilhaVendas[]): Array<number> {
        const qtdDoMes: Array<number> = []
        let graficoMeses = [0, 0, 0, 0, 0, 0]
        lista.forEach(venda => {
            if(new Date(venda._data).getDate() <= 5){
                graficoMeses[0]++
            } else if(new Date(venda._data).getDate() <= 10){
                graficoMeses[1]++
            } else if(new Date(venda._data).getDate() <= 15){
                graficoMeses[2]++
            } else if(new Date(venda._data).getDate() <= 20){
                graficoMeses[3]++
            } else if(new Date(venda._data).getDate() <= 25){
                graficoMeses[4]++
            } else {
                graficoMeses[5]++
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

    public filtraPorAnoPreco(ano: number, min: boolean, preco: number){
        const listaFiltrada: Array<PlanilhaVendas> = []
        this.vendas.forEach(venda => {
            if(min){
                if(new Date(venda._data).getFullYear() == ano && venda._valor >= preco) {
                    listaFiltrada.push(venda)
                }
            }
            else {
                if(new Date(venda._data).getFullYear() == ano && venda._valor <= preco){
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
        qtdDosMeses.push(capn)
        qtdDosMeses.push(capa)
        qtdDosMeses.push(cnpa)
        return qtdDosMeses
    }

    private filtraCada5Dias(lista: PlanilhaVendas[]){
        const listaFiltrada: PlanilhaVendas[][] = [[],[],[],[],[],[]]
        lista.forEach(venda => {
            if(new Date(venda._data).getDate() <= 5){
                listaFiltrada[0].push(venda)
            } else if(new Date(venda._data).getDate() <= 10){
                listaFiltrada[1].push(venda)
            } else if(new Date(venda._data).getDate() <= 15){
                listaFiltrada[2].push(venda)
            } else if(new Date(venda._data).getDate() <= 20){
                listaFiltrada[3].push(venda)
            } else if(new Date(venda._data).getDate() <= 25){
                listaFiltrada[4].push(venda)
            } else {
                listaFiltrada[5].push(venda)
            }
        })
        return listaFiltrada
    }

    public calculaQtdDiasDoMesComissao(mes: number, min: boolean, preco: number){
        const qtdDosDias: Array<number[]> = []
        let listaFiltrada = this.filtraCada5Dias(this.filtraPorMesPreco(mes, min, preco))
        console.log(this.filtraPorMesPreco(mes, min, preco))
        let cnpn: number[] = []
        let cnpa: number[] = []
        let capn: number[] = []
        let capa: number[] = []

        listaFiltrada.forEach(lista => {
            cnpn.push(this.calculaUmaComissaoPorMes('cnpn', lista))
            cnpa.push(this.calculaUmaComissaoPorMes('cnpa', lista))
            capn.push(this.calculaUmaComissaoPorMes('capn', lista))
            capa.push(this.calculaUmaComissaoPorMes('capa', lista))
        })

        qtdDosDias.push(cnpn)
        qtdDosDias.push(capn)
        qtdDosDias.push(capa)
        qtdDosDias.push(cnpa)
        return qtdDosDias
}

    public calculaPrecoComissoes(comissao: Comissao, lista: PlanilhaVendas[]): Array<number> {
        let precoComissao = [0, 0, 0, 0]
        lista.forEach((venda) => {
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

    // async geraVendas(data: any[]) {
    //     const listaVendas: PlanilhaVendas[] = []
    //     data.forEach(vendaBanco => {
    //         const vendedor = new Vendedor();
    //         const produto = new Produto();
    //         const cliente = new Cliente();
    //         const valor = ;
    //         const venda = new PlanilhaVendas(vendaBanco.venda_id, vendaBanco.venda_data, vendedor, produto, cliente, valor, vendaBanco.forma_pagamento)
    //     })
    // }

    // async puxaVendas() {
    //     const response = await api.get("/vendas")
    //     return response.data;
    // } 
}