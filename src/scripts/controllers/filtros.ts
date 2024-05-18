import Cliente from "../models/cliente"
import PlanilhaVendas from "../models/planilhaVendas"
import Produto from "../models/produto"
import Vendedor from "../models/vendedor"

export default class Filtros {
    constructor(){}

    //----------------------FILTROS DE FAIXA TEMPORAL--------------------------//
    public filtraPorMes(mes: number, lista: PlanilhaVendas[]): Array<PlanilhaVendas> {
        const listaFiltrada: Array<PlanilhaVendas> = [] //cria uma lista para armazenar a lista filtrada
        lista.forEach(venda => { //percorre a lista completa de vendas
            if(new Date(venda._data).getMonth() === mes) { 
                listaFiltrada.push(venda) //e adiciona na lista filtrada onde a data da venda do prduto é igual a data da venda pesquisada no argumento 
            }
        })
        return listaFiltrada //retorna a lista filtrada
    }

    public filtraPorSemestre(data: Date, lista: Array<PlanilhaVendas>): ReadonlyArray<PlanilhaVendas> {
        const listaFiltrada: Array<PlanilhaVendas> = []
        const meses = this.indexUltimosMeses(data.getMonth(), 6)
        lista.forEach(venda => {
            if(meses.includes(venda.data.getMonth())){
                listaFiltrada.push(venda)
            }
        })
        return listaFiltrada
    }

    public filtraPorAno(ano: number, lista: PlanilhaVendas[]): ReadonlyArray<PlanilhaVendas> {
        const listaFiltrada: Array<PlanilhaVendas> = [] //cria uma lista para armazenar a lista filtrada
        lista.forEach((venda => { //percorre a lista completa de vendas
            if(new Date(venda._data).getFullYear() === ano) { 
                listaFiltrada.push(venda) //e adiciona na lista filtrada onde o ano da venda do prduto é igual o ano da venda pesquisada no argumento 
            }
        }))
        return listaFiltrada //retorna a lista filtrada
    }

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

    //----------------------OUTROS FILTROS--------------------------//

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
    public filtraPorPreco(min: boolean, preco: number, lista: PlanilhaVendas[]): ReadonlyArray<PlanilhaVendas> {
        const listaFiltrada: Array<PlanilhaVendas> = []; //cria uma lista para armazenar a lista filtrada
        lista.forEach((venda) => { //percorre a lista completa de vendas
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

    private indexUltimosMeses(index: number, qtdMeses: number): Array<number> {
        const listaMeses = []
        for(let i = 0; i < qtdMeses; i++){
            listaMeses.push(this.gerenciaMes(index - 4 + i))
        }
        return listaMeses
    }

    //função que recebe um index de mês maior que 11 (index máximo dos meses) e retorna um index válido (usado em cálculos de outras funções)
    private gerenciaMes(numeroMes: number): number {
        if(numeroMes < 0) {
            return numeroMes + 12
        } 
        return numeroMes
    }
}