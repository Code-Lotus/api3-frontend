import Style from './App.module.scss';
import Bloco from './components/bloco';
import Navbar from './components/navbar';
import Footer from './components/footer';

export default function App() {
  return (
    <div className={Style.AppStyle}>
      <Navbar />
      <main className={Style.main}>
        <Bloco v1={[1,2,68,14]} v2 ={[1]} v3={[2]} v4={[9]} />
      </main>
      <Footer />
    </div>
  );
}

