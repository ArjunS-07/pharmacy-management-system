import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DrugList = () => {
  const [drugs, setDrugs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/drugs/")
      .then((res) => setDrugs(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/drugs/${id}/`)
      .then(() => setDrugs(drugs.filter((drug) => drug.id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Drugs</h2>
      <Link to="/drugs/add">Add Drug</Link>
      <ul>
        {drugs.map((drug) => (
          <li key={drug.id}>
            {drug.name} - {drug.company_name}
            <Link to={`/drugs/edit/${drug.id}`}> Edit</Link>
            <button onClick={() => handleDelete(drug.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrugList;
