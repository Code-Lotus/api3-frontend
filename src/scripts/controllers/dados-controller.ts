export default class DadosController {
    public ajustaData(data: string){
        const datas = data.split('/')
        let dia = datas[1]
        let mes = datas[0]
        let ano = datas[2]
        return dia + '/' + mes + '/' + ano
    }
    
    public ajustaDataVenda(data: string){
        const datas = data.split('-')
        let dia = datas[2].substring(0,2)
        let mes = datas[1]
        let ano = datas[0]
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
        let temVirgula = preco.includes('.');
        if (temVirgula) {
            preco = preco.replace('.', ',');
        } else {
            preco += ',00';
        }
        preco = preco.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
        return `R$${preco}`;
    }

    public mascaraQuantidade(qtd: string) {
        if(qtd.length < 4) {
            return qtd
        } else {
            qtd = qtd.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

            return qtd
        }
    }
}

