import CampoProduto from "../models/campoProduto"
import CampoProdutoAdm from "../models/campoProdutoAdm"
import PlanilhaVendas from "../models/planilhaVendas"

export default class CamposController {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(
        private _vendas: PlanilhaVendas[]
    ){}

    public set vendas(vendas: PlanilhaVendas[]) {
        this._vendas = vendas
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