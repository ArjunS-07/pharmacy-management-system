import React from 'react';

function PurchaseList({ purchases, onDelete }) {
  return (
    <div className="purchase-list">
      <h2>Purchase Records</h2>
      <table>
        <thead>
          <tr>
            <th>Drug</th>
            <th>Quantity</th>
            <th>Purchase Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase) => (
            <tr key={purchase.id}>
              <td>{purchase.drug}</td>
              <td>{purchase.quantity}</td>
              <td>{purchase.purchase_date}</td>
              <td><button onClick={() => onDelete(purchase.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PurchaseList;
