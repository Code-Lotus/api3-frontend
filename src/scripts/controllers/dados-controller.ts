export default class DadosController {
    public ajustaData(data: string){
        const datas = data.split('/')
        let dia = datas[1]
        let mes = datas[0]
        let ano = datas[2]
        return dia + '/' + mes + '/' + ano
    }

    public ajustaDate(data: Date){
        const dia = data.getDate()
        const mes = data.getMonth()
        const ano = data.getFullYear()
        return dia + '/' + mes + '/' + ano
    }

    public mascaraCPF = (cpf: string): string => {
        return cpf
          .replace(/\D/g, "")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d{1,2})/, "$1-$2")
          .replace(/(-\d{2})\d+?$/, "$1");
      };
      

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

