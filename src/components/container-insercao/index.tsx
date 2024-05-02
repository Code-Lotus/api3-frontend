import { Component } from "react";
import Style from "./containerInsercao.module.scss";
import Vendas from "../../scripts/controllers/vendas-controller";
import readXlsxFile from "read-excel-file";
import PlanilhaVendas from "../../scripts/models/planilhaVendas";
import Vendedor from "../../scripts/models/vendedor";
import Produto from "../../scripts/models/produto";
import Cliente from "../../scripts/models/cliente";
import {Database} from "../../scripts/controllers/localStorage"

const vendas = new Vendas([])
let venda: PlanilhaVendas
let id = 0
//função para ser colocada no onChange de um input type file, a função recebe um parâmetro do próprio input que é uma lista de arquivos
async function recebeArquivo(evento: any) {
    const arquivo = evento.target.files[0] //pega o primeiro elemento da lista de arquivos
    const rows = await readXlsxFile(arquivo) //lê um arquivo excel e guarda numa variável um array de linhas do excel
    const dados = rows[1] //pega as linhas com os conteúdos (não os cabeçalhos)
    const dataVenda = dados[0].toString()
    const dadosVendedor = [dados[2].toString(), dados[1].toString()]
    const dadosProduto = [dados[4].toString(), dados[3].toString()]
    const dadosCliente = [dados[6].toString(), dados[5].toString(), dados[7].toString()]
    const valor = dados[8].toString()
    const formaPagamento = dados[9].toString()
    venda = new PlanilhaVendas(id++, new Date(dataVenda), new Vendedor(dadosVendedor[0], dadosVendedor[1]), new Produto(parseInt(dadosProduto[0]), dadosProduto[1], new Date()), new Cliente(dadosCliente[0], dadosCliente[1], dadosCliente[2], new Date()), parseFloat(valor), formaPagamento) //cria um objeto da classe planilha vendas com os valores do excel
}

function salvaArquivo(venda: PlanilhaVendas) {
	vendas.vendas.push(venda)//adiciona o objeto planilha vendas na lista de vendas	
	console.log(venda)
	alert("Arquivo enviado!")
	Database.addEntry(venda)
	console.log(Database.getPlanilhaVendas())
}

export default class ContainerInsercao extends Component {
    render() {
        return (
		
				<div className={Style.dateTable}>
					
					<div className={Style.order}>
						<div className={Style.head}>
							<h3>Inserção de Arquivo</h3>
							{/* <i className='bx bx-search' ></i>
							<i className='bx bx-filter' ></i> */}
						</div>
						<div>
							<p> Insira o arquivo excel para armazenar: </p>
							<input type="file" onChange={(e) => {recebeArquivo(e)}}/>
						</div>
						<input type="button" value="Carregar" className={Style.buttonSubmit} onClick={(e) => {salvaArquivo(venda)}} />
					</div>
				</div>
	
        )
    }
}