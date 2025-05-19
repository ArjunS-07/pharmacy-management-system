// src/components/SaleList.jsx
import React from 'react';

const SaleList = () => {
  // Mock sale data
  const sales = [
    { id: 1, details: 'Sale 1' },
    { id: 2, details: 'Sale 2' },
  ];

  return (
    <div>
      <h2>Sale List</h2>
      <ul>
        {sales.map((sale) => (
          <li key={sale.id}>{sale.details}</li>
        ))}
      </ul>
    </div>
  );
};

export default SaleList;
