import { Link }    from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import ContainerInsercao from "../components/container-insercao";

export default function CliNovoProNovo(){
    return(
        <>
            <Navbar/>
            <Sidebar></Sidebar>
            <ContainerInsercao />
        </>
    );
}
