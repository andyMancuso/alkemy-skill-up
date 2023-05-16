import { Link } from 'react-router-dom';
import '../css/header.css';

const Header = () => {
  return (
   <header>
        <h1>AlkeFlix</h1>
    <nav>
      <ul>
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/listado">Listado</Link>
        </li>
      </ul>
    </nav>
   </header>
  )
}

export default Header