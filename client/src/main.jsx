import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'

function App() {
  const [message, setMessage] = useState("Loading...");
  
  // Form ke liye state fields
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    roomNumber: "",
    phone: ""
  });
  const [formStatus, setFormStatus] = useState("");

  // Connection check karne ke liye
  useEffect(() => {
    fetch("/api/status")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => {
        console.error(err);
        setMessage("Backend se connect nahi ho paya!");
      });
  }, []);

  // Form input change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form submit handler (Database mein data bhejne ke liye)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("Saving...");
    
    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setFormStatus("Student Added Successfully! 🎉");
        // Form ko khali karne ke liye
        setFormData({ name: "", rollNumber: "", roomNumber: "", phone: "" });
      } else {
        setFormStatus(`Error: ${data.error || "Kuch galti hui"}`);
      }
    } catch (err) {
      console.error(err);
      setFormStatus("Server connection failed!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px", fontFamily: "sans-serif" }}>
      <h1>Hostel Management System</h1>
      <p style={{ fontSize: "16px", color: "green", fontWeight: "bold" }}>Status: {message}</p>
      
      <hr style={{ width: "50%", margin: "20px auto" }} />

      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit} style={{ display: "inline-block", textAlign: "left", background: "#f4f4f4", padding: "20px", borderRadius: "8px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>Student Name: </label><br />
          <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: "250px", padding: "5px" }} />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Roll Number: </label><br />
          <input type="text" name="rollNumber" value={formData.rollNumber} onChange={handleChange} required style={{ width: "250px", padding: "5px" }} />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Room Number: </label><br />
          <input type="text" name="roomNumber" value={formData.roomNumber} onChange={handleChange} required style={{ width: "250px", padding: "5px" }} />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Phone Number: </label><br />
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required style={{ width: "250px", padding: "5px" }} />
        </div>
        <button type="submit" style={{ padding: "8px 15px", background: "blue", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Save Student
        </button>
      </form>

      {formStatus && <p style={{ marginTop: "15px", fontWeight: "bold", color: formStatus.includes("Error") ? "red" : "blue" }}>{formStatus}</p>}
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)