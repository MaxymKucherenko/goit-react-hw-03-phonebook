import React from 'react';

const Filter = ({ handleChange, filter }) => (
  <>
    <p>Find contacts by name</p>
    <input type="text" onChange={handleChange} value={filter} />
  </>
);

export default Filter;
