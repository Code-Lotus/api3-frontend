// sale.model.ts

import { Model } from 'sequelize-typescript';
import Produto from './produto';
import Cliente from './cliente';

interface atributos {
id: number;
data: Date;
vendedor: string;
produto: Produto;
cliente: Cliente;
valor: number;
}

export class Venda extends Model<atributos> implements atributos {
public id !: number;
public data!: Date;
public vendedor!: string;
public produto!: Produto;
public cliente!: Cliente;
public valor!: number;

public get getValor(){
    return this.valor
 }
}


export default Venda;
