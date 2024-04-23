import { BrowserRouter, Routes, Route } from "react-router-dom";
import CliNovoProNovo from './pages/cliNovoProNovo';
import DashboardVendedor from "./pages/dashboardVendedor";
import CliNovoProAntigo from "./pages/cliNovoProAntigo";
import Homepage from "./pages/homepage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="/" element={<DashboardVendedor/>} />
          <Route path="/cliNovoProNovo" element={<CliNovoProNovo />} />
          <Route path="/cliNovoProAntigo" element={<CliNovoProAntigo />} />
          <Route path="/homepage" element={<Homepage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

