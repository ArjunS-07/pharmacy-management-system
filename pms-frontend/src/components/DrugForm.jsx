import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DrugForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    price: "",
  });

  const [companies, setCompanies] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  useEffect(() => {
    axios.get("http://localhost:8000/api/companies/")
      .then((res) => setCompanies(res.data));

    if (isEdit) {
      axios.get(`http://localhost:8000/api/drugs/${id}/`)
        .then((res) => setFormData({
          name: res.data.name,
          company: res.data.company,
          price: res.data.price,
        }));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = isEdit
      ? axios.put(`http://localhost:8000/api/drugs/${id}/`, formData)
      : axios.post("http://localhost:8000/api/drugs/", formData);

    request.then(() => navigate("/drugs"))
           .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>{isEdit ? "Edit Drug" : "Add Drug"}</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <select name="company" value={formData.company} onChange={handleChange} required>
          <option value="">Select Company</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>{company.name}</option>
          ))}
        </select>
        <input name="price" placeholder="Price" value={formData.price} onChange={handleChange} type="number" required />
        <button type="submit">{isEdit ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default DrugForm;
