import "./status.css";

export default function Status() {
    return (
            <ul className="box">
                    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
                <li>
                    <i className='bx bxs-calendar-plus'></i>
                    <span>
                     <h3>66</h3>
                    <p>Vendas novas</p>
                    </span>
                </li>

                <li>
                    <i className='bx bxs-group'></i>
                    <span>
                 <h3>103</h3>
                    <p>Visitantes</p>
                     </span>
                </li>

                <li>
                    <i className='bx bxs-dollar-circle' ></i>
                    <span>
                    <h3>$2001</h3>
                    <p>Total de vendas</p>
                    </span>
                </li>
            </ul>
    );
}