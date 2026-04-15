import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    reason: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/waitlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMessage(data.message);

    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      reason: "",
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Join Our Waitlist</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
        />
        <br />
        <br />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
        />
        <br />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <br />
        <br />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />
        <br />
        <br />

        <textarea
          name="reason"
          placeholder="Why do you want to join?"
          value={form.reason}
          onChange={handleChange}
        />
        <br />
        <br />

        <button type="submit">Join Waitlist</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

export default App;
