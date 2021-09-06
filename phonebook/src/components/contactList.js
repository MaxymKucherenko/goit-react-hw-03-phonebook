import React from 'react';

const ContactList = ({ contacts, handleDelete}) => (
   <ul>
    {contacts.map(({ id, name, number }) => (
      <li key={id}>
        {name}: {number}
        <button type="button" onClick={handleDelete} id={`deletebtn:${id}`}>
          Delete
        </button>
      </li>
    ))}
  </ul>
)

export default ContactList;