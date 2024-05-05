import Comissao from '../models/comissao';
import PlanilhaVendas from '../models/planilhaVendas';
import readXlsxFile from 'read-excel-file';
import Vendedor from '../models/vendedor';
import Produto from '../models/produto';
import Cliente from '../models/cliente';
import CampoProduto from '../models/campoProduto';

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

    //função para ser colocada no onChange de um input type file, a função recebe um parâmetro do próprio input que é uma lista de arquivos
    public async recebeArquivo(evento: any) {
        const arquivo = evento.target.files[0] //pega o primeiro elemento da lista de arquivos
        const rows = await readXlsxFile(arquivo) //lê um arquivo excel e guarda numa variável um array de linhas do excel
        for(let i = 1; i < rows.length; i++){
            const dados = rows[i] //pega as linhas com os conteúdos (não os cabeçalhos)
            const dataVenda = dados[0].toString()
            const dadosVendedor = [dados[2].toString(), dados[1].toString()]
            const dadosProduto = [dados[4].toString(), dados[3].toString()]
            const dadosCliente = [dados[6].toString(), dados[5].toString(), dados[7].toString()]
            const valor = dados[8].toString()
            const formaPagamento = dados[9].toString()
            const venda = new PlanilhaVendas(0, new Date(dataVenda), new Vendedor(dadosVendedor[0], dadosVendedor[1]), new Produto(parseInt(dadosProduto[0]), dadosProduto[1], new Date()), new Cliente(dadosCliente[0], dadosCliente[1], dadosCliente[2], new Date()), parseFloat(valor), formaPagamento) //cria um objeto da classe planilha vendas com os valores do excel
            console.log(venda)
            this.vendas.push(venda)//adiciona o objeto planilha vendas na lista de vendas
        }
    }

    //----------------------FILTROS DE FAIXA TEMPORAL--------------------------//

    public filtraPorMes(mes: number): ReadonlyArray<PlanilhaVendas> {
        const listaFiltrada: Array<PlanilhaVendas> = [] //cria uma lista para armazenar a lista filtrada
        this.vendas.forEach(venda => { //percorre a lista completa de vendas
            if(new Date(venda._data).getMonth() === mes) { 
                listaFiltrada.push(venda) //e adiciona na lista filtrada onde a data da venda do prduto é igual a data da venda pesquisada no argumento 
            }
        })
        return listaFiltrada //retorna a lista filtrada
    }

    public filtraPorSemestre(data: Date): ReadonlyArray<PlanilhaVendas> {
        const listaFiltrada: Array<PlanilhaVendas> = []
        const meses = this.indexUltimosMeses(data.getMonth(), 6)
        this.vendas.forEach(venda => {
            if(meses.includes(venda.data.getMonth())){
                listaFiltrada.push(venda)
            }
        })
        return listaFiltrada
    }

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
    public filtraPorCliente(cliente: Cliente): ReadonlyArray<PlanilhaVendas> {
        const listaFiltrada: Array<PlanilhaVendas> = [] //cria uma lista para armazenar a lista filtrada
        this.vendas.forEach((venda => { //percorre a lista completa de vendas
            if(venda._cliente.cpfcnpj === cliente.cpfcnpj) { 
                listaFiltrada.push(venda) //e adiciona na lista filtrada onde o cpf/cnpj do cliente é igual ao passado no argumento 
            }
        }))
        return listaFiltrada //retorna a lista filtrada
    }

    //função responsável por filtrar as vendas de um único produto passado como argumento
    public filtraPorProduto(produto: Produto): ReadonlyArray<PlanilhaVendas> {
        const listaFiltrada: Array<PlanilhaVendas> = [] //cria uma lista para armazenar a lista filtrada
        this.vendas.forEach((venda => { //percorre a lista completa de vendas
            if(venda._produto.id === produto.id) {
                listaFiltrada.push(venda) //e adiciona na lista filtrada onde o cpf/cnpj do cliente é igual ao passado no argumento
            }
        }))
        return listaFiltrada //retorna a lista filtrada
    }

    //função responsável por filtrar as vendas de um único vendedor passado como argumento
    public filtraPorVendedor(vendedor: Vendedor): ReadonlyArray<PlanilhaVendas> {
        const listaFiltrada: Array<PlanilhaVendas> = [] //cria uma lista para armazenar a lista filtrada
        this.vendas.forEach((venda => { //percorre a lista completa de vendas
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
    
    public indexUltimosMeses(index: number, qtdMeses: number): Array<number> {
        const listaMeses = []
        for(let i = 0; i < qtdMeses; i++){
            listaMeses.push(this.gerenciaMes(index - 4 + i))
        }
        return listaMeses
    }
    
    //refatorar código
    public calculaQtdPorMes(mes: string): Array<number>{
        const mesAtual = this._meses.indexOf(mes)
        const calculoDosMeses: Array<number> = []
        let graficoMeses = [0, 0, 0, 0, 0]
        this.vendas.forEach((venda) => {
            switch(new Date(venda._data).getMonth()) {
                case mesAtual:
                    graficoMeses[4]++
                    break;
                case this.gerenciaMes(mesAtual - 1):
                    graficoMeses[3]++
                    break;
                case this.gerenciaMes(mesAtual - 2):
                    graficoMeses[2]++
                    break;
                case this.gerenciaMes(mesAtual - 3):
                    graficoMeses[1]++
                    break;
                case this.gerenciaMes(mesAtual - 4):
                    graficoMeses[0]++
                    break;
            }
        })

        calculoDosMeses.push(graficoMeses[0])
        calculoDosMeses.push(graficoMeses[1])
        calculoDosMeses.push(graficoMeses[2])
        calculoDosMeses.push(graficoMeses[3])
        calculoDosMeses.push(graficoMeses[4])
        return calculoDosMeses
    }
    
    public calculaQtdPorMesComissao(mes: string, tipo: string): Array<number>{
        const mesAtual = this._meses.indexOf(mes)
        const comissao = new Comissao()
        const calculoDosMeses: Array<number> = []
        let graficoMeses = [0, 0, 0, 0, 0]
        this.vendas.forEach((venda) => {
            if(comissao.acharTipo(venda.cliente, venda.produto) === tipo){
                switch(venda.data.getMonth()) {
                    case mesAtual:
                        graficoMeses[4]++
                        break;
                    case this.gerenciaMes(mesAtual - 1):
                        graficoMeses[3]++
                        break;
                    case this.gerenciaMes(mesAtual - 2):
                        graficoMeses[2]++
                        break;
                    case this.gerenciaMes(mesAtual - 3):
                        graficoMeses[1]++
                        break;
                    case this.gerenciaMes(mesAtual - 4):
                        graficoMeses[0]++
                        break;
                }
            }
        })

        calculoDosMeses.push(graficoMeses[0])
        calculoDosMeses.push(graficoMeses[1])
        calculoDosMeses.push(graficoMeses[2])
        calculoDosMeses.push(graficoMeses[3])
        calculoDosMeses.push(graficoMeses[4])
        return calculoDosMeses
    }

    public calculaGanhoPorMes(mes: string): Array<number>{
        const mesAtual = this._meses.indexOf(mes)
        const calculoDosMeses: Array<number> = []
        let graficoMeses = [0, 0, 0, 0, 0]
        this.vendas.forEach((venda) => {
            switch(venda.data.getMonth()) {
                case mesAtual:
                    graficoMeses[0]+=venda.valor
                    break;
                case mesAtual - 1:
                    graficoMeses[1]+=venda.valor
                    break;
                case mesAtual - 2:
                    graficoMeses[2]+=venda.valor
                    break;
                case mesAtual - 3:
                    graficoMeses[3]+=venda.valor
                    break;
                case mesAtual - 4:
                    graficoMeses[4]+=venda.valor
                    break;
            }
        })
        calculoDosMeses.push(graficoMeses[0])
        calculoDosMeses.push(graficoMeses[1])
        calculoDosMeses.push(graficoMeses[2])
        calculoDosMeses.push(graficoMeses[3])
        calculoDosMeses.push(graficoMeses[4])

        return calculoDosMeses
    }

    public calculaQtdPorComissao(): Array<number>{
        let achaTipo = new Comissao()
        let qtdComissao = [0, 0, 0, 0]
        this.vendas.forEach((venda) => {
            console.log(venda)
            const cliente = venda._cliente
            const produto = venda._produto
            console.log(cliente)
            console.log(produto)
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

    public calculaQtdPorComissaoPorMes(mes: number): Array<number>{
        let achaTipo = new Comissao()
        let qtdComissao = [0, 0, 0, 0]
        this.vendas.forEach((venda) => {
            if(new Date(venda._data).getMonth() === mes-1){
                const cliente = venda._cliente
                const produto = venda._produto
                let tipo = achaTipo.acharTipo(cliente, produto)
                console.log(tipo)
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
        const qtdDosMeses: Array<number> = []
        let graficoMeses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        this.vendas.forEach((venda) => {
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
        const listaFiltrada = this.filtraPorMes(mes)
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

    public calculaPrecoComissoes(comissao: Comissao): Array<number> {
        let precoComissao = [0, 0, 0, 0]
        this.vendas.forEach((venda) => {
            let tipo = comissao.acharTipo(venda.cliente, venda.produto)
            switch(tipo) {
                case 'cnpn':
                    precoComissao[0]+= comissao.calcComissao(venda.valor, 'cnpn')
                    break;
                case 'capn':
                    precoComissao[1]+= comissao.calcComissao(venda.valor, 'capn')
                    break;
                case 'capa':
                    precoComissao[2]+= comissao.calcComissao(venda.valor, 'capa')
                    break;
                case 'cnpa':
                    precoComissao[3]+= comissao.calcComissao(venda.valor, 'cnpa')
                    break;
            }
        })
        return precoComissao
    }
    
    //função que recebe um index de mês maior que 11 (index máximo dos meses) e retorna um index válido (usado em cálculos de outras funções)
    private gerenciaMes(numeroMes: number): number {
        if(numeroMes < 0) {
            return numeroMes + 12
        } 
        return numeroMes
    }

    private criaCampos(): Array<CampoProduto>{
        const ids: Array<number> = []
        const listaProdutos: Array<CampoProduto> = []
        this._vendas.forEach(venda => {
            if(!(ids.includes(venda.produto.id))){
                listaProdutos.push(new CampoProduto(venda.produto, 1, venda.valor))
            } else {
                const index = ids.indexOf(venda.produto.id)
                let qtd = listaProdutos[index].qtd
                listaProdutos.splice(index, 1, new CampoProduto(venda.produto, qtd+1, venda.valor))
            }
        })
        return listaProdutos
    }
}