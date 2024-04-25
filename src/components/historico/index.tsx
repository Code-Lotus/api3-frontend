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
                                    <th>Vendedor</th>
                                    <th>Data</th>
                                    <th>Status</th>
                                </tr>
                                <hr/>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        {/* <img src="img/avatar.png"> */}
                                        <p>João Pedro</p>
                                    </td>
                                    <td>06/10/2024</td>
                                    <td><span className={Style.statusCompleted}>Completa</span></td>
                                </tr>
                                <tr>
                                    <td>
                                        {/* <img src="img/avatar.png"> */}
                                        <p>João Pedro</p>
                                    </td>
                                    <td>06/10/2024</td>
                                    <td><span className={Style.statusPending}>Pendente</span></td>
                                </tr>
                                <tr>
                                    <td>
                                        {/* <img src="img/avatar.png"> */}
                                        <p>João Pedro</p>
                                    </td>
                                    <td>06/10/2024</td>
                                    <td><span className={Style.statusProcess}>Em Processamento</span></td>
                                </tr>
                                <tr>
                                    <td>
                                        {/* <img src="img/avatar.png"> */}
                                        <p>João Pedro</p>
                                    </td>
                                    <td>05/10/2024</td>
                                    <td><span className={Style.statusPending}>Pendente</span></td>
                                </tr>
                                <tr>
                                    <td>
                                        {/* <img src="img/avatar.png"> */}
                                        <p>João Pedro</p>
                                    </td>
                                    <td>05/10/2024</td>
                                    <td><span className={Style.statusCompleted}>Completa</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
