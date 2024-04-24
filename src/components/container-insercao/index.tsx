import { Component } from "react";
import Style from "./containerInsercao.module.scss";
//import './style.css';

export default class ContainerInsercao extends Component {
    render() {
        return (
			
            <div className={Style.dateTable}>
				
				<div className={Style.order}>
					<div className={Style.head}>
						<h3>{}Inserção de Arquivo</h3>
						{/* <i className='bx bx-search' ></i>
						<i className='bx bx-filter' ></i> */}
					</div>
					<div>
						<p> Insira o arquivo excel para armazenar: </p>
						<input type="file"/>
					</div>
					<input type="submit" className={Style.buttonSubmit} />
				</div>
			</div>
        )
    }
}