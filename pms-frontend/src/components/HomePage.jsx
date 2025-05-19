import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container">
      <h1>Pharmacy Management System</h1>
      <nav>
        <ul>
          <li><Link to="/companies">Manage Companies</Link></li>
          <li><Link to="/drugs">Manage Drugs</Link></li>
          <li><Link to="/purchases">Manage Purchases</Link></li>
          <li><Link to="/sales">Manage Sales</Link></li>
          <li><Link to="/history-sales">History Sales</Link></li>
          <li><Link to="/users">User Settings</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
