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
      .then(data => setContacts(data))
      .catch(err => console.error(err));
  }, []);

  const addContact = async () => {
    if (!name || !phone) return;

    const newContact = { name, phone };
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
    }
  };

  return (
    <div className="crm-container">
      <h2>Contact Management</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button onClick={addContact}>Add Contact</button>

      <ul>
        {contacts.map((c, i) => (
          <li key={i}>{c.name} - {c.phone}</li>
        ))}
      </ul>
    </div>
  );
}

export default ContactManagement;