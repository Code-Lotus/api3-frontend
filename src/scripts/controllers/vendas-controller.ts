import Comissao from '../models/comissao';
import PlanilhaVendas from '../models/planilhaVendas';
import readXlsxFile from 'read-excel-file';
import Vendedor from '../models/vendedor';
import Produto from '../models/produto';
import Cliente from '../models/cliente';

export default class Vendas {
    private vendas: Array<PlanilhaVendas>
    private _meses: ReadonlyArray<string>
    
    constructor(vendas: Array<PlanilhaVendas>){
        this.vendas = vendas
        this._meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    }

    public async recebeArquivo(evento: any) {
        const arquivo = evento.target.files[0] 
        const rows = await readXlsxFile(arquivo)
        const dados = rows[1]
        const dataVenda = dados[0].toString()
        const dadosVendedor = [dados[2].toString(), dados[1].toString()]
        const dadosProduto = [dados[4].toString(), dados[3].toString()]
        const dadosCliente = [dados[6].toString(), dados[5].toString(), dados[7].toString()]
        const valor = dados[8].toString()
        const formaPagamento = dados[9].toString()
        const venda = new PlanilhaVendas(new Date(dataVenda), new Vendedor(dadosVendedor[0], dadosVendedor[1]), new Produto(parseInt(dadosProduto[0]), dadosProduto[1], new Date()), new Cliente(dadosCliente[0], dadosCliente[1], dadosCliente[2], new Date()), parseFloat(valor), formaPagamento)
        console.log(venda)
        this.vendas.push(venda)
    }

    public filtroPorCliente(cliente: Cliente): ReadonlyArray<PlanilhaVendas> {
        const listaFiltrada: Array<PlanilhaVendas> = [] 
        this.vendas.forEach((venda => {
            if(venda.cliente.cpfcnpj === cliente.cpfcnpj) {
                listaFiltrada.push(venda)
            }
        }))
        return listaFiltrada
    }

    public filtroPorProduto(produto: Produto): ReadonlyArray<PlanilhaVendas> {
        const listaFiltrada: Array<PlanilhaVendas> = []
        this.vendas.forEach((venda => {
            if(venda.produto.id === produto.id) {
                listaFiltrada.push(venda)
            }
        }))
        return listaFiltrada
    }

    public fitroPorVendedor(vendedor: Vendedor): ReadonlyArray<PlanilhaVendas> {
        const listaFiltrada: Array<PlanilhaVendas> = []
        this.vendas.forEach((venda => {
            if(venda.vendedor.cpf === vendedor.cpf) {
                listaFiltrada.push(venda)
            }
        }))
        return listaFiltrada
    }

    public getMes(index: number): string {
        return this._meses[index]
    }

    public gerenciaMes(numeroMes: number): number {
        //console.log(numeroMes)
        if(numeroMes < 0) {
            return numeroMes + 12
        } 
        return numeroMes
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

    public calculaQtdPorMes(mes: string): Array<number>{
        const mesAtual = this._meses.indexOf(mes)
        const calculoDosMeses: Array<number> = []
        let graficoMeses = [0, 0, 0, 0, 0]
        this.vendas.forEach((venda) => {
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
            let tipo = achaTipo.acharTipo(venda.cliente, venda.produto)
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
}