export default class DadosController {
    public mascaraCPF(cpf: string) {
        return cpf
          .replace(/\D/g, "")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d{1,2})/, "$1-$2")
          .replace(/(-\d{2})\d+?$/, "$1")
    }

    public mascaraData(data: string) {
        return data
          .replace(/\D/g, "")
          .replace(/(\d{2})(\d)/, "$1/$2")
          .replace(/(\d{2})(\d)/, "$1/$2")
          .replace(/(\d{4})(\d)/, "$1")
      }

    public mascaraPreco(preco: string) {
        let temVirgula = preco.includes('.')
        if(temVirgula) {
            preco = preco.replace('.', ',')
            return `R$${preco}`
        } else {
            return `R$${preco},00`
        }
    }

    public mascaraQuantidade(qtd: string) {
        if(qtd.length < 4) {
            return qtd
        } else {
            return qtd //arrumar com regex
        }
    }
}