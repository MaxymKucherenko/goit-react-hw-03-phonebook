import React, { Component } from 'react'
import Form from './Form'
import ContactsList from './contactList'
import Filter from './filter';
import { v4 as uuidv4 } from "uuid";


class Contacts extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  formSubmitHandler = (data) => {
    console.log(data);
  };
  createContact = ({ name, number }) => {
    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    const foundContact = this.state.contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (foundContact) {
      alert(`${name} is already in contacts`);
      return;
    }

    this.setState({
      contacts: [...this.state.contacts, contact],
    });
  };

  onFilterChange = ({ target }) => {
    this.setState({
      filter: target.value,
    });
  };

  deleteContact = ({ target }) => {
    const id = target.id.split(":")[1];
    console.log(id);
    this.setState({
      contacts: this.state.contacts.filter((contact) => contact.id !== id),
    });
  };

  componentDidMount() {
    
    const LocalContacts = localStorage.getItem("contacts");
    const parsedLocalContacts = JSON.parse(LocalContacts);
    if (parsedLocalContacts) {
      this.setState({ contacts: parsedLocalContacts });
    }
     
  }

  componentDidUpdate(preProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

    render() {
      const filteredContacts = this.state.contacts.filter((contact) =>
        contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
      );

    return (
      <div>
        <Form
          onSubmit={this.createContact}
        />
        <div>
          <h2>CONTACTS</h2>
          <Filter
            handleChange={this.onFilterChange}
            filter={this.state.filter}
          />
          <ContactsList
            contacts={filteredContacts}
            handleDelete={this.deleteContact}
          />
        </div>
      </div>
    );
  }
}

export default Contacts;