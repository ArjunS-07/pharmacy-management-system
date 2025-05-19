import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CompanyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  // Fetch existing company data if editing
  useEffect(() => {
    if (isEdit) {
      axios
        .get(`http://127.0.0.1:8000/api/companies/${id}/`)
        .then((res) => {
          setFormData(res.data);
        })
        .catch((err) => {
          console.error("Error fetching company:", err);
        });
    }
  }, [id, isEdit]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const request = isEdit
      ? axios.put(`http://127.0.0.1:8000/api/companies/${id}/`, formData)
      : axios.post("http://127.0.0.1:8000/api/companies/", formData);

    request
      .then(() => {
        navigate("/companies");
      })
      .catch((err) => {
        console.error("Error saving company:", err);
      });
  };

  return (
    <div className="container">
      <h2>{isEdit ? "Edit" : "Add"} Company</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">{isEdit ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default CompanyForm;
