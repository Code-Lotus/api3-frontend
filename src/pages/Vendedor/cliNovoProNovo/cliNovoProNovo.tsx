import Navbar from "../../../components/navbar";
import Sidebar from "../../../components/sidebar";
import Linha from "../../../components/graficos/linha";
import Style from "./cliNovoProNovo.module.scss"

export default function CliNovoProNovo(){
    return(
        <>
            <Navbar />
            <Sidebar />
            <div className={Style.grafico}>
                <Linha categoria={["a", "b"]} nome={"Produto"} valor={[1,2,3]} />
            </div>
        </>
    );
}
