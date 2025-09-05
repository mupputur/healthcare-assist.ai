import React, { useState } from "react";
import "./Providers.css";

const Providers = () => {
  const [providers, setProviders] = useState([
    {
      provider_id: 1,
      name: "Dr. Sarah Lee",
      specialty: "Cardiology",
      network_type: "PPO",
      facility_name: "Heart Care Clinic",
      address_line: "123 Wellness Street",
      city: "New York",
      state: "NY",
      zip_code: "10001",
      phone_number: "555-1234",
      email: "sarah.lee@clinic.com",
      availability: "Mon-Fri",
      rating: 4.8,
      accepting_new_patients: true
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    network_type: "",
    facility_name: "",
    address_line: "",
    city: "",
    state: "",
    zip_code: "",
    phone_number: "",
    email: "",
    availability: "",
    rating: "",
    accepting_new_patients: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleAddProvider = () => {
    const newProvider = {
      ...formData,
      provider_id: providers.length + 1
    };
    setProviders([...providers, newProvider]);
    setShowForm(false);
    setFormData({
      name: "",
      specialty: "",
      network_type: "",
      facility_name: "",
      address_line: "",
      city: "",
      state: "",
      zip_code: "",
      phone_number: "",
      email: "",
      availability: "",
      rating: "",
      accepting_new_patients: false
    });
  };

  const handleDelete = (id) => {
    setProviders(providers.filter((p) => p.provider_id !== id));
  };

  return (
    <div className="providers-container">
      <div className="providers-header">
        <h2>Providers</h2>
        <p>Manage healthcare providers and their details.</p>
        <button className="add-btn" onClick={() => setShowForm(true)}>
          + Add Provider
        </button>
      </div>

      <table className="providers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialty</th>
            <th>Network</th>
            <th>Facility</th>
            <th>City</th>
            <th>Phone</th>
            <th>Rating</th>
            <th>New Patients</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {providers.map((prov) => (
            <tr key={prov.provider_id}>
              <td>{prov.name}</td>
              <td>{prov.specialty}</td>
              <td>{prov.network_type}</td>
              <td>{prov.facility_name}</td>
              <td>{prov.city}</td>
              <td>{prov.phone_number}</td>
              <td>{prov.rating}</td>
              <td>{prov.accepting_new_patients ? "Yes" : "No"}</td>
              <td>
                <button className="edit-btn">✏️</button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(prov.provider_id)}
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container popup-animate">
            <h3>Add New Provider</h3>
            <div className="form-grid">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Specialty</label>
                <input
                  type="text"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Network Type</label>
                <input
                  type="text"
                  name="network_type"
                  value={formData.network_type}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Facility Name</label>
                <input
                  type="text"
                  name="facility_name"
                  value={formData.facility_name}
                  onChange={handleChange}
                />
              </div>

              <div className="full-width">
                <label>Address</label>
                <input
                  type="text"
                  name="address_line"
                  value={formData.address_line}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Zip Code</label>
                <input
                  type="text"
                  name="zip_code"
                  value={formData.zip_code}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Phone</label>
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Availability</label>
                <input
                  type="text"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Rating</label>
                <input
                  type="number"
                  step="0.1"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                />
              </div>

              <div className="full-width">
                <label>
                  <input
                    type="checkbox"
                    name="accepting_new_patients"
                    checked={formData.accepting_new_patients}
                    onChange={handleChange}
                  />
                  Accepting New Patients
                </label>
              </div>
            </div>

            <div className="form-buttons">
              <button className="save-btn" onClick={handleAddProvider}>
                Save
              </button>
              <button className="cancel-btn" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Providers;
