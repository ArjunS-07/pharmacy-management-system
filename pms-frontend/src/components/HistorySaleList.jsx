// HistorySaleList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HistorySaleList = () => {
  const [historySales, setHistorySales] = useState([]);

  useEffect(() => {
    fetch('/api/history_sales/')
      .then((response) => response.json())
      .then((data) => setHistorySales(data));
  }, []);

  const handleDelete = (historySaleId) => {
    fetch(`/api/history_sales/${historySaleId}/`, {
      method: 'DELETE',
    })
      .then(() => {
        setHistorySales(historySales.filter((historySale) => historySale.id !== historySaleId));
      });
  };

  return (
    <div>
      <h2>History Sale List</h2>
      <table>
        <thead>
          <tr>
            <th>Sale Date</th>
            <th>Drug</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {historySales.map((historySale) => (
            <tr key={historySale.id}>
              <td>{historySale.saleDate}</td>
              <td>{historySale.drug}</td>
              <td>{historySale.quantity}</td>
              <td>{historySale.price}</td>
              <td>
                <Link to={`/history_sales/edit/${historySale.id}`}>Edit</Link> | 
                <button onClick={() => handleDelete(historySale.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistorySaleList;
