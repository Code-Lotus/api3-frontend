import Cliente from "./cliente"
import Produto from "./produto"
import TipoComissao from "./tipoComissao"

export default class Comissao {
    private _tipo: Array<TipoComissao> //pncn = Produto novo Cliente novo
    // private valor!: number
   

    constructor(){
        this._tipo = [new TipoComissao('cnpn', 0), new TipoComissao('capn', 0), new TipoComissao('capa', 0), new TipoComissao('cnpa', 0)]
    }
    
//    public get nome(): string {
//        return this._nome
//    }

//    public set nome(nome: string) {
//        this._nome = nome
//    }
    
    public get tipo(): Array<TipoComissao> {
        return this._tipo
    }

    public defineValComissao(valor: number, nomeComissao: string): void {
        this._tipo.forEach((comissao) => {
            if(comissao.nome === nomeComissao) {
                comissao.porcentagem = valor
            }
        })
    }

    //  public get getvalor(): number {
    //     return this.valor
    // }
    // public set setvalor(value: number) {
    //     this.valor = value
    // }

    public acharTipo(cliente: Cliente, produto: Produto): string{

        const hoje = new Date() 
        // const anoMileSeg =  365 * 24 * 60 * 60 * 1000
        const clienteNovo = hoje.getFullYear() - new Date(cliente._dataCadastro).getFullYear() < 1  // só q se ele for maior que 1 ano por meses ainda retorna 1
        const produtoNovo = hoje.getFullYear() - new Date(produto._dataCadastro).getFullYear() < 1

        if (clienteNovo && produtoNovo) {
            return 'cnpn' //cliente novo - produto novo
        }

        else if (!clienteNovo && produtoNovo) {
            return 'capn' //cliente antigo - produto novo
        }

        else if (!clienteNovo && !produtoNovo) {
            return 'capa' //cliente antigo - produto antigo
        }
         
        else {
            return 'cnpa' //cliente novo - produto antigo
        }
    }

    public calcComissao (valorVenda: number, tipoComissao: string): number { 
        let index = 3
        if(tipoComissao === 'cnpn') {
            index = 0
        } else if(tipoComissao === 'capn') {
            index = 1
        } else if(tipoComissao === 'capa') {
            index = 2
        }

        const pct = this._tipo[index].porcentagem
        const valcomissao = valorVenda * (pct/100)
        
       return valcomissao
    }
}

