import Style from '../historicoAdm/historicoAdm.module.scss'

export default function HistoricoAdm() {
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
                                    <th className={Style.autoWidth}>Data</th>
                                    <th>Vendedor</th>
                                    <th>Produto</th>
                                    <th>Cliente</th>
                                    <th>Valor venda</th>
                                    <th>Tipo comissão</th>
                                </tr>
                                <hr/>
                            </thead>

                            <tbody>
                                <tr>
                                    <td><span className={Style.statusCompleted}>06/10/2024</span></td>
                                    <td>Pedro</td>
                                    <td></td>
                                    <td>Hello World!</td>
                                    <td>cn -Pv </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>
                                        {/* <img src="img/avatar.png"> */}
                                        <p>João</p>
                                    </td>
                                    <td>06/10/2024</td>
                                    <td><span className={Style.statusPending}>R$170,11</span></td>
                                </tr>
                                <tr>
                                    <td>
                                        {/* <img src="img/avatar.png"> */}
                                        <p>Lucas</p>
                                    </td>
                                    <td>07/10/2024</td>
                                    <td><span className={Style.statusProcess}>R$79,88</span></td>
                                </tr>
                                <tr>
                                    <td>André</td>
                                    <td>08/10/2024</td>
                                    <td><span className={Style.statusPending}>R$305,79</span></td>
                                </tr>
                            
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
