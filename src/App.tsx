import { BrowserRouter, Routes, Route } from "react-router-dom";
import CliNovoProAntigo from "./pages/Vendedor/cliNovoProAntigo/cliNovoProAntigo";
import DashboardAdm from "./pages/Administrador/dashboardAdm";
import CliAntigoProNovo from "./pages/Vendedor/cliAntigoProNovo/cliAntigoProNovo";
import CliAntigoProAntigo from "./pages/Vendedor/cliAntigoProAntigo/cliAntigoProAntigo";
import DashboardVendedor from "./pages/Vendedor/dashboardVendedor/dashboardVendedor";
import CliNovoProNovo from "./pages/Vendedor/cliNovoProNovo/cliNovoProNovo";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="/" element={<DashboardVendedor/>} />
          <Route path="/cliNovoProNovo" element={<CliNovoProNovo />} />
          <Route path="/cliNovoProAntigo" element={<CliNovoProAntigo />} />
          <Route path="/cliAntigoProNovo" element={<CliAntigoProNovo />} />
          <Route path="/cliAntigoProAntigo" element={<CliAntigoProAntigo />} />
          <Route path="/dashboardAdm" element={<DashboardAdm />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

