import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    // Backend se data fetch kar rahe hain
    fetch("/api/status")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => {
        console.error(err);
        setMessage("Backend se connect nahi ho paya!");
      });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "sans-serif" }}>
      <h1>Hostel Management System</h1>
      <p style={{ fontSize: "20px", color: "green" }}>{message}</p>
    </div>
  );
}

export default App;