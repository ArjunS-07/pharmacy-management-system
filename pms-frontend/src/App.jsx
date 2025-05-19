// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./HomePage";
import CompanyForm from "./components/CompanyForm";
import CompanyList from "./components/CompanyList";
import DrugList from "./components/DrugList";
import DrugForm from "./components/DrugForm";



// Add more imports as needed...

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <main style={{ minHeight: "80vh", padding: "20px" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/companies" element={<CompanyList />} />
            <Route path="/companies/add" element={<CompanyForm />} />
            <Route path="/companies/edit/:id" element={<CompanyForm />} />
            <Route path="/drugs" element={<DrugList />} />
            <Route path="/drugs/add" element={<DrugForm />} />
            <Route path="/drugs/edit/:id" element={<DrugForm />} />
            {/* Add other routes similarly */}
          </Routes>

        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
