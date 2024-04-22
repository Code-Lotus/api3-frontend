import Bloco from "../components/bloco";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
// import Style from './App.module.scss';

export default function DashboardVendedor(){
    return(
    <div>
      <Navbar />
      <Sidebar />
      <main>
        <Bloco v1={[1,2,68,14]} v2 ={[1]} v3={[2]} v4={[9]} />
      </main>
      {/* <Footer /> */}
    </div>
    );
}
