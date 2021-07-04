import logo from './logo.svg';
import './App.css';
import Products from './components/Products';

function App() {
  return (
    <div className="App">
      <nav className="navbar-container">
        <ul>
          <li>
            Home
          </li>
          <li>
            Cart
          </li>
        </ul>
      </nav>
      <Products/>
    </div>
  );
}

export default App;
