// src/components/CompanyList.jsx
import React, { useEffect, useState } from "react";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/companies/") // adjust if needed
      .then((res) => res.json())
      .then((data) => setCompanies(data))
      .catch((error) => console.error("Error fetching companies:", error));
  }, []);

  return (
    <div>
      <h2>Company List</h2>
      {companies.length > 0 ? (
        <ul>
          {companies.map((company) => (
            <li key={company.id}>{company.name}</li>
          ))}
        </ul>
      ) : (
        <p>No companies found.</p>
      )}
    </div>
  );
};

export default CompanyList;
