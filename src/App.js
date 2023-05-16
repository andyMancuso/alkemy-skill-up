//Libraries
import { Route, Routes } from 'react-router-dom';

//Components
import Listado from "./components/Listado";
import Login from "./components/Login";
import Header from './components/Header';
import Footer from './components/Footer';
import Detalle from './components/Detalle';

//Styles
import './css/bootstrap.min.css';
import './css/app.css';


function App() {
  return (
    <div className='section'>
      <Header />
        <div className="container mt-3">
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route path='/listado' element={<Listado />} />
            <Route path='/detalle' element={<Detalle />} />
          </Routes>
        </div>
      <Footer />
    </div>
  );
}

export default App;
