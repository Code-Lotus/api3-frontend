import CampoProduto from "../models/campoProduto"

export default class Ordenador {
    constructor(){}

    //--------------------ORDENADORES-----------------------//
    public ordenaQtd(lista: CampoProduto[]): ReadonlyArray<CampoProduto> {
        return lista.sort((a, b) => {
            if(a.qtd > b.qtd){
                return -1
            } else if(a.qtd < b.qtd){
                return 1
            } else {
                return 0
            }
        })
    }

    public ordenaPrecoUni(lista: CampoProduto[]): ReadonlyArray<CampoProduto> {
        return lista.sort((a, b) => {
            if(a.precoUni > b.precoUni){
                return -1
            } else if(a.precoUni < b.precoUni){
                return 1
            } else {
                return 0
            }
        })
    }

    public ordenaPrecoTotal(lista: CampoProduto[]): ReadonlyArray<CampoProduto> {
        return lista.sort((a, b) => {
            if(a.precoTotal > b.precoTotal){
                return -1
            } else if(a.precoTotal < b.precoTotal){
                return 1
            } else {
                return 0
            }
        })
    }
}