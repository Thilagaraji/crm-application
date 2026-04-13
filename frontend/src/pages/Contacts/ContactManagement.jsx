import React, { useState, useEffect } from "react";
import "./Style.css";  

function ContactManagement() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    fetch("/api/contacts", {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setContacts(data);
      })
      .catch(err => console.error(err));
  }, []);

  const addContact = async (e) => {
    e.preventDefault();
    if (!name || !phone) return;

    const newContact = { name, phone };
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newContact)
      });

      if (res.ok) {
        const data = await res.json();
        setContacts([...contacts, data]);
        setName("");
        setPhone("");
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(errorData.error || "Failed to add contact");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding contact. Check backend connection.");
    }
  };

  return (
    <div className="crm-container">
      <h2>Contact Management</h2>

      <form onSubmit={addContact} style={{ marginBottom: "20px" }}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ marginRight: "10px", padding: "8px" }}
        />
        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          style={{ marginRight: "10px", padding: "8px" }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>Add Contact</button>
      </form>

      <ul>
        {contacts.map((c, i) => (
          <li key={c._id || i}>{c.name} - {c.phone}</li>
        ))}
      </ul>
    </div>
  );
}

export default ContactManagement;