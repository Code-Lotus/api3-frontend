import Style from "../cadastro/cadastro.module.scss";

export default function Cadastro() {
    return (
        <div className={Style.register}>
            <h1>Registro</h1>
            <br />
            <form>
                <ul>
                    <li>
                    <label htmlFor='nome'>Nome:</label> &nbsp;
                    <input type='text'></input>
                    </li>

                    <li>
                    <label htmlFor='cpf'>CPF:</label> &nbsp;
                    <input type='number'></input>
                    </li>

                    <li>
                    <label htmlFor='email'>E-mail:</label> &nbsp;
                    <input type='email'></input>
                    </li>

                    <li>
                    <label htmlFor='senha'>Senha:</label> &nbsp;
                    <input type='password'></input>
                    </li>
                </ul>
            </form>
        </div>
    )
}