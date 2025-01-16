import React, { useRef } from "react";
import API from '../Api';

function Register() {
  const fullNameInputRef = useRef();
  const jobTitleInputRef = useRef();
  const departmentInputRef = useRef();  
  const locationInputRef = useRef();    
  const ageInputRef = useRef();         
  const salaryInputRef = useRef();      

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      fullName: fullNameInputRef.current.value,
      jobTitle: jobTitleInputRef.current.value,
      department: departmentInputRef.current.value,   
      location: locationInputRef.current.value,       
      age: ageInputRef.current.value,                  
      salary: salaryInputRef.current.value,            
    };

    try {
      await API.post('http://localhost:4000/api/users/register', data);
      alert('Employee added successfully!');
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Error during request';
      alert(errorMessage);
    }
  };

  return (
    <div className="background">
      <div className="App">
        <br />
        <form onSubmit={handleSubmit}>
          <h1 style={{ textAlign: "center", color: "#007bff" }}>Employee Data</h1>
          <div style={{ textAlign: "center" }}>
            <div>
              <label>Fullname:</label>
              <input placeholder="Fullname" ref={fullNameInputRef} required />
            </div>
            <div>
              <label>JobTitle:</label>
              <input placeholder="JobTitle" ref={jobTitleInputRef} required />
            </div>
            <div>
              <label>Department:</label>
              <input placeholder="Department" ref={departmentInputRef} required />
            </div>
            <div>
              <label>Location:</label>
              <input placeholder="Location" ref={locationInputRef} required />
            </div>
            <div>
              <label>Age:</label>
              <input type="number" placeholder="Age" ref={ageInputRef} required />
            </div>
            <div>
              <label>Salary:</label>
              <input type="number" placeholder="Salary" ref={salaryInputRef} required />
            </div>
            <div>
              <button className="btn" type="submit">
                Add Employee
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
