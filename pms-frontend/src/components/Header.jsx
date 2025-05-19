
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <h2>Pharmacy Management</h2>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/companies">Companies</Link>
        <Link to="/drugs">Drugs</Link>
        <Link to="/sales">Sales</Link>
        <Link to="/purchases">Purchases</Link>
      </nav>
    </header>
  );
}

export default Header;

