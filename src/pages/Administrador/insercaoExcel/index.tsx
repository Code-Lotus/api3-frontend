import readXlsxFile from "read-excel-file";
import ContainerInsercao from "../../../components/container-insercao";
import Navbar from "../../../components/navbar";
import Sidebar from "../../../components/sidebar";
import Vendas from "../../../scripts/controllers/vendas-controller";
import PlanilhaVendas from "../../../scripts/models/planilhaVendas";
import Vendedor from "../../../scripts/models/vendedor";
import Produto from "../../../scripts/models/produto";
import Cliente from "../../../scripts/models/cliente";

export default function InsercaoExcel() {
    return (
        <>
            <Sidebar />
            <Navbar />
            <ContainerInsercao />
        </>
    )
} 