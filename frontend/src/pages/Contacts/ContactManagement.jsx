import React, { useState } from "react";
import "./Style.css";  
function ContactManagement() {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const addContact = () => {
    if (!name || !phone) return;

    setContacts([...contacts, { name, phone }]);
    setName("");
    setPhone("");
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