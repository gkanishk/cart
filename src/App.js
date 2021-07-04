import './App.css';
import Products from './components/Products';
import Cart from './components/Cart';
import { useState } from 'react';

function App() {
  const [currentPage,setPage]=useState("home")
  return (
    <div className="App">
      <nav className="navbar-container">
        <ul>
          <li onClick={()=>setPage("home")}>
            Home
          </li>
          <li onClick={()=>setPage("cart")}>
            Cart
          </li>
        </ul>
      </nav>
      {
        currentPage==="home"?<Products/>:<Cart/>
      }
    </div>
  );
}

export default App;
