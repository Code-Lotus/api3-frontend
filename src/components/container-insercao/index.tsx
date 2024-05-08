import { Component } from "react";
import Style from "./containerInsercao.module.scss";
import Vendas from "../../scripts/controllers/vendas-controller";
import readXlsxFile from "read-excel-file";
import PlanilhaVendas from "../../scripts/models/planilhaVendas";
import Vendedor from "../../scripts/models/vendedor";
import Produto from "../../scripts/models/produto";
import Cliente from "../../scripts/models/cliente";
import {Database} from "../../scripts/controllers/localStorage"
import DadosController from "../../scripts/controllers/dados-controller";

const vendas = new Vendas([])
const dadosController = new DadosController()
const listaAuxiliar: PlanilhaVendas[] = []
let venda: PlanilhaVendas
let id = 1

//função para ser colocada no onChange de um input type file, a função recebe um parâmetro do próprio input que é uma lista de arquivos
async function recebeArquivo(evento: any) {
    const arquivo = evento.target.files[0] //pega o primeiro elemento da lista de arquivos
    const rows = await readXlsxFile(arquivo) //lê um arquivo excel e guarda numa variável um array de linhas do excel
    for(let i = 1; i < rows.length; i++){
		const dados = rows[i] //pega as linhas com os conteúdos (não os cabeçalhos)
		const dataVenda = dadosController.ajustaData(dados[0].toString())
		console.log(dataVenda)
		const dadosVendedor = [dados[2].toString(), dados[1].toString()]
		const dadosProduto = [dados[4].toString(), dados[3].toString()]
		const dadosCliente = [dados[6].toString(), dados[5].toString(), dados[7].toString()]
		const valor = dados[8].toString()
		const formaPagamento = dados[9].toString()
		let dia = aleatoriza(29).toString()
		let mes = aleatoriza(13).toString()
		let ano = anoAleatorio().toString()
		const dataProduto = `${mes}/${dia}/${ano}`    //APAGAR!!!!!!!
		let dia1 = aleatoriza(29).toString()
		let mes1 = aleatoriza(13).toString()
		let ano1 = anoAleatorio().toString()
		const dataCliente = `${mes1}/${dia1}/${ano1}`
		venda = new PlanilhaVendas(id++, new Date(dataVenda), new Vendedor(dadosVendedor[0], dadosVendedor[1]), new Produto(parseInt(dadosProduto[0]), dadosProduto[1], new Date(dataProduto)), new Cliente(dadosCliente[0], dadosCliente[1], dadosCliente[2], new Date(dataCliente)), parseFloat(valor), formaPagamento) //cria um objeto da classe planilha vendas com os valores do excel
		listaAuxiliar.push(venda)
	}
}

// APAGAR FUTURAMENTE
function aleatoriza(max :number) {
	let num = Math.floor(Math.random() * max);
	if(num === 0) {
		num++
	}
	return num
}

// APAGAR FUTURAMENTE MAIS AINDA
function anoAleatorio() {
	let num = Math.floor(Math.random() * 3); 
	return (2022 + num)
}

function salvaArquivo() {
	listaAuxiliar.forEach(item => {
		vendas.vendas.push(item)
		Database.addEntry(item)
	}) //adiciona o objeto planilha vendas na lista de vendas
	alert("Arquivo enviado!")
}

export default class ContainerInsercao extends Component {
    render() {
        return (
		
				<div className={Style.dateTable}>
					
					<div className={Style.order}>
						<div className={Style.head}>
							<h3>Inserção de Arquivo</h3>
						</div>
						<div>
							<p> Insira o arquivo excel para armazenar: </p>
							<input type="file" onChange={(e) => {recebeArquivo(e)}}/>
						</div>
						<input type="button" value="Carregar" className={Style.buttonSubmit} onClick={(e) => {salvaArquivo()}} />
					</div>
				</div>
	
        )
    }
}