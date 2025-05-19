// HistorySaleForm.js
import React, { useState, useEffect } from 'react';

const HistorySaleForm = ({ historySaleId, onHistorySaleSave }) => {
  const [historySaleData, setHistorySaleData] = useState({
    saleDate: '',
    drug: '',
    quantity: '',
    price: ''
  });

  useEffect(() => {
    if (historySaleId) {
      fetch(`/api/history_sales/${historySaleId}/`)
        .then((response) => response.json())
        .then((data) => setHistorySaleData(data));
    }
  }, [historySaleId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHistorySaleData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = historySaleId ? 'PUT' : 'POST';
    const url = historySaleId ? `/api/history_sales/${historySaleId}/` : '/api/history_sales/';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(historySaleData),
    })
      .then((response) => response.json())
      .then((data) => {
        onHistorySaleSave(); // Callback to refresh the HistorySaleList after saving
      });
  };

  return (
    <div>
      <h2>{historySaleId ? 'Edit History Sale' : 'Add History Sale'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Sale Date:</label>
          <input
            type="date"
            name="saleDate"
            value={historySaleData.saleDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Drug:</label>
          <input
            type="text"
            name="drug"
            value={historySaleData.drug}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={historySaleData.quantity}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={historySaleData.price}
            onChange={handleChange}
          />
        </div>
        <button type="submit">{historySaleId ? 'Update History Sale' : 'Add History Sale'}</button>
      </form>
    </div>
  );
};

export default HistorySaleForm;
