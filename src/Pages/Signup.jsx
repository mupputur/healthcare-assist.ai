import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Select from 'react-select';
import { Country, State } from 'country-state-city';
import styles from '../styles/signup.module.css';
import Header from "../Components/Header"; 

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [step, setStep] = useState(1);
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    const allowed = allCountries.filter(c => 
      c.isoCode === "IN" || c.isoCode === "US"|| c.isoCode === "GB"
    );
    const mapped = allowed.map(c => ({ label: c.name, value: c.isoCode }));
    setCountries(mapped);
  }, []);

  useEffect(() => {
    if (formData.country) {
      const allStates = State.getStatesOfCountry(formData.country);
      const mapped = allStates.map(s => ({ label: s.name, value: s.isoCode }));
      setStates(mapped);
    } else {
      setStates([]);
    }
  }, [formData.country]);

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateStep = () => {
    const fieldsToValidate = stepFields[step];
    const newErrors = {};
    fieldsToValidate.forEach(({ name }) => {
      if (name === 'middleName') return; 
      const value = formData[name];
      if (!value || value.toString().trim() === '') {
        newErrors[name] = `${name} is required`;
      } else {
        if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
          newErrors[name] = 'Enter a valid email';
        }
        if (name === 'password' && value.length < 6) {
          newErrors[name] = 'Password must be at least 6 characters';
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allValid = [1, 2, 3].every((s) => {
      setStep(s);
      return validateStep();
    });
    if (!allValid) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find((u) => u.email === formData.email);
    if (userExists) {
      alert("⚠️ User already exists. Please login.");
      navigate("/login");
      return;
    }

    // 🟢 Add loginCount + appointments for new user
    const newUser = {
      ...formData,
      loginCount: 0,
      appointments: []
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // 🟢 Store current user for session tracking
    localStorage.setItem("currentUserEmail", formData.email);

    setApiResponse(newUser);
    alert("✅ Signup successful! Redirecting to login...");
    setTimeout(() => navigate("/login"), 1500);
  };

  const renderField = (field) => {
    const fieldError = errors[field.name];

    const commonInputWrapper = (element) => (
      <div className={styles.inputGroup} key={field.name}>
        {element}
        {fieldError && <span className={styles.error}>{fieldError}</span>}
      </div>
    );

    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'date':
        return commonInputWrapper(
          <input
            name={field.name}
            placeholder={field.label}
            type={field.type}
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
          />
        );
      case 'phone':
        return commonInputWrapper(
          <PhoneInput
            country={'us'}
            value={formData[field.name] || ''}
            onChange={(value) => handleInputChange(field.name, value)}
            inputStyle={{
              width: '100%',
              borderRadius: '8px',
              padding: '14px',
              border: '1px solid #ccc',
              fontSize: '15px'
            }}
          />
        );
      case 'select':
        return commonInputWrapper(
          <select
            name={field.name}
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
          >
            <option value="">{`Select ${field.label}`}</option>
            {field.options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        );
      case 'country':
        return commonInputWrapper(
          <Select
            options={countries}
            value={countries.find(c => c.value === formData.country)}
            onChange={(selected) => handleInputChange('country', selected?.value || '')}
            placeholder="Select Country"
            isClearable
            styles={{
              control: (base) => ({
                ...base,
                padding: '2px',
                borderRadius: '8px',
                borderColor: '#ccc',
                boxShadow: 'none',
                fontSize: '15px'
              })
            }}
          />
        );
      case 'state':
        return commonInputWrapper(
          <Select
            options={states}
            value={states.find(s => s.value === formData.state)}
            onChange={(selected) => handleInputChange('state', selected?.value || '')}
            placeholder="Select State"
            isClearable
            styles={{
              control: (base) => ({
                ...base,
                padding: '2px',
                borderRadius: '8px',
                borderColor: '#ccc',
                boxShadow: 'none',
                fontSize: '15px'
              })
            }}
          />
        );
      default:
        return null;
    }
  };

  const stepFields = {
    1: [
      { name: 'firstName', label: 'First Name', type: 'text' },
      { name: 'middleName', label: 'Middle Name', type: 'text' },
      { name: 'lastName', label: 'Last Name', type: 'text' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'password', label: 'Password', type: 'password' },
    ],
    2: [
      { name: 'phone', label: 'Phone', type: 'phone' },
      { name: 'dob', label: 'Date of Birth', type: 'date' },
      {
        name: 'gender',
        label: 'Gender',
        type: 'select',
        options: [
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
          { label: 'Other', value: 'other' },
        ]
      },
      { name: 'insuranceId', label: 'Insurance ID', type: 'text' },
      {
        name: 'role',
        label: 'Role',
        type: 'select',
        options: [
          { label: 'Patient', value: 'patient' },
          { label: 'Doctor', value: 'doctor' },
          { label: 'Admin', value: 'admin' },
        ]
      }
    ],
    3: [
      { name: 'country', label: 'Country', type: 'country' },
      { name: 'state', label: 'State', type: 'state' },
      { name: 'street', label: 'Street', type: 'text' },
      { name: 'city', label: 'City', type: 'text' },
      { name: 'zip', label: 'ZIP Code', type: 'text' }
    ]
  };

  return (
    <>
      <Header showAuthButtons={false} />  
      <div className={styles.signupPage}>
        <div className={styles.marqueeBar}>
          <div className={styles.marqueeLeft}></div>
          <marquee className={styles.marqueeText}>
            Welcome to our Hospital Management System Signup Page!
          </marquee>
        </div>

        <div className={styles.signupContainer}>
          <div className={styles.formWrapper}>
            <div className={styles.formBox}>
              <h2>Create Account</h2>
              <form onSubmit={handleSubmit}>
                {stepFields[step].map(field => renderField(field))}
                <div className={styles.buttonGroup}>
                  {step > 1 && <button type="button" onClick={() => setStep(step - 1)}>Back</button>}
                  {step < 3 && <button type="button" onClick={() => validateStep() && setStep(step + 1)}>Next</button>}
                  {step === 3 && <button type="submit">Sign Up</button>}
                </div>
                <p>Already have an account? <Link to="/login">Login</Link></p>
              </form>

              {apiResponse && (
                <div className={styles.apiResponse}>
                  <h3>Saved User Data:</h3>
                  <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
