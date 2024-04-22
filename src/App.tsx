import { BrowserRouter, Routes, Route } from "react-router-dom";
import CliNovoProNovo from './pages/cliNovoProNovo';
import DashboardVendedor from "./pages/dashboardVendedor";
import HomepageAdm from "./pages/homepageAdm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardVendedor />}>
          <Route path="/cliNovoProNovo" element={<CliNovoProNovo />} />
          <Route path="/homepage" element={<HomepageAdm />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

