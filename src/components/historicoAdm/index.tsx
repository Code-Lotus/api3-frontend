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
                                    <th>Cliente</th>
                                    <th>Data</th>
                                    <th>Comissão gerada</th>
                                </tr>
                                <hr/>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        {/* <img src="img/avatar.png"> */}
                                        <p>Pedro</p>
                                    </td>
                                    <td>06/10/2024</td>
                                    <td><span className={Style.statusCompleted}>R$ 201,51</span></td>
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
                                    <td>
                                        {/* <img src="img/avatar.png"> */}
                                        <p>André</p>
                                    </td>
                                    <td>08/10/2024</td>
                                    <td><span className={Style.statusPending}>R$305,79</span></td>
                                </tr>
                                <tr>
                                    <td>
                                        {/* <img src="img/avatar.png"> */}
                                        <p>Luiz</p>
                                    </td>
                                    <td>10/10/2024</td>
                                    <td><span className={Style.statusCompleted}>R$50,34</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
