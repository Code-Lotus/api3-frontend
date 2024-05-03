import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardAdm from "./pages/Administrador/dashboardAdm";
import DashboardVendedor from "./pages/Vendedor/dashboardVendedor/dashboardVendedor";
import InsercaoExcel from "./pages/Administrador/insercaoExcel";
import ComissaoAdm from "./pages/Administrador/comissaoAdm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="/" element={<DashboardVendedor/>} />
          <Route path="/dashboardAdm" element={<DashboardAdm />}/>
          <Route path="/comissaoAdm" element={<ComissaoAdm />}/>
          <Route path="/insercaoExcel" element={<InsercaoExcel />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
