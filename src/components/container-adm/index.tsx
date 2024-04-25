import Style from "./container-adm.module.scss";
import Pizza from "../graficos/pie";

export default function ContainerAdm() {
    return (
        <section className={Style.box}>
            <div className={Style.graph}>
            <Pizza valores={[25,25,25,25]} legenda={['Cliente Novo/Produto Novo', 'Cliente Antigo/Produto Novo', 'Cliente Antigo/Produto Antigo', 'Cliente Novo/Produto Antigo']} />
            </div>
            
        </section>
    );
}

