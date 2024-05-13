import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardAdm from "./pages/Administrador/dashboardAdm";
import DashboardVendedor from "./pages/Vendedor/dashboardVendedor/dashboardVendedor";
import InsercaoExcel from "./pages/Administrador/insercaoExcel";
import ComissaoAdm from "./pages/Administrador/comissaoAdm";
import ComponenteContextoDashboard from "./contexts/componenteContextoDashboard";
import Login from "./pages/Usuário/login/login";
import Cadastro from "./pages/Usuário/cadastro/cadastro";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/dashboardVendedor" element={<ComponenteContextoDashboard child={<DashboardVendedor/>} />} />
          <Route path="/dashboardAdm" element={<ComponenteContextoDashboard child={<DashboardAdm />} />}/>
          <Route path="/comissaoAdm" element={<ComissaoAdm />}/>
          <Route path="/insercaoExcel" element={<InsercaoExcel />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
