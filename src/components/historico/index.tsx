import Style from './historico.module.scss';

export default function Historico() {
    return (
        <div id={Style.content}>
            <div className={Style.main}>
                <div className={Style.dateTable}>
                    <div className={Style.order}>
                        <div className={Style.head}>
                            <h3>Últimas Vendas</h3>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Produto</th>
                                    <th>Cliente</th>
                                    <th>Valor da venda</th>
                                    <th>Valor da comissão</th>
                                    
                                </tr>
                                <hr/>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        {/* <img src="img/avatar.png"> */}
                                        06/10/2024
                                    </td>
                                    <td>
                                        <p>Sistema de descrição de cargos</p>
                                    </td>
                                    <td>
                                        <p>Pedro de Alcantra</p>
                                    </td>
                                    <td>
                                        <p>10,30</p>
                                    </td>
                                    <td>
                                    <p>10,30</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        {/* <img src="img/avatar.png"> */}
                                        06/10/2024
                                    </td>
                                    <td>
                                        <p>Sistema de descrição de cargos</p>
                                    </td>
                                    <td>
                                        <p>Pedro de Alcantra</p>
                                    </td>
                                    <td>
                                        <p>10,30</p>
                                    </td>
                                    <td>
                                    <p>10,30</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        {/* <img src="img/avatar.png"> */}
                                        06/10/2024
                                    </td>
                                    <td>
                                        <p>Sistema de descrição de cargos</p>
                                    </td>
                                    <td>
                                        <p>Pedro de Alcantra</p>
                                    </td>
                                    <td>
                                        <p>10,30</p>
                                    </td>
                                    <td>
                                    <p>10,30</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        {/* <img src="img/avatar.png"> */}
                                        06/10/2024
                                    </td>
                                    <td>
                                        <p>Sistema de descrição de cargos</p>
                                    </td>
                                    <td>
                                        <p>Pedro de Alcantra</p>
                                    </td>
                                    <td>
                                        <p>10,30</p>
                                    </td>
                                    <td>
                                    <p>10,30</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        {/* <img src="img/avatar.png"> */}
                                        06/10/2024
                                    </td>
                                    <td>
                                        <p>Sistema de descrição de cargos</p>
                                    </td>
                                    <td>
                                        <p>Pedro de Alcantra</p>
                                    </td>
                                    <td>
                                        <p>10,30</p>
                                    </td>
                                    <td>
                                    <p>10,30</p>
                                    </td>
                                </tr>
                                 
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
