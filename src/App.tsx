import { BrowserRouter, Routes, Route } from "react-router-dom";
import CliNovoProNovo from './pages/cliNovoProNovo';
import DashboardVendedor from "./pages/dashboardVendedor";
import CliNovoProAntigo from "./pages/cliNovoProAntigo";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardVendedor />}>
          <Route path="/cliNovoProNovo" element={<CliNovoProNovo />} />
          <Route path="/cliNovoProAntigo" element={<CliNovoProAntigo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

