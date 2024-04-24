import { BrowserRouter, Routes, Route } from "react-router-dom";
import CliNovoProNovo from './pages/cliNovoProNovo';
import DashboardVendedor from "./pages/dashboardVendedor/dashboardVendedor";
import CliNovoProAntigo from "./pages/cliNovoProAntigo";
import Homepage from "./pages/homepage";
import CliAntigoProNovo from "./pages/cliAntigoProNovo";
import CliAntigoProAntigo from "./pages/cliAntigoProAntigo";

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
          <Route path="/homepage" element={<Homepage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

