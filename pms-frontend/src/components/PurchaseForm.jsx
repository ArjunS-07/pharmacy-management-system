import React, { useState } from 'react';

function PurchaseForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    drug: '',
    quantity: '',
    purchase_date: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ drug: '', quantity: '', purchase_date: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="purchase-form">
      <h2>New Purchase</h2>
      <input type="text" name="drug" placeholder="Drug ID or Name" value={formData.drug} onChange={handleChange} required />
      <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
      <input type="date" name="purchase_date" value={formData.purchase_date} onChange={handleChange} required />
      <button type="submit">Add Purchase</button>
    </form>
  );
}

export default PurchaseForm;
