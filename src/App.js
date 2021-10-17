import React, { Component } from 'react';
import Form from './components/Form';
import ContactsList from './components/СontactList';
import Filter from './components/Filter';
import './App.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  createContact = (newContact) => {
    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));
  };

  handleCheckContact = (name) => {
    const { contacts } = this.state;
    const isExistContact = !!contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
    isExistContact && alert(`${name} is already in contacts`);
    return !isExistContact;
  };

  onFilterChange = ({ target }) => {
    this.setState({
      filter: target.value,
    });
  };

  deleteContact = (id) =>
    this.setState(({ contacts }) => ({
      contacts: contacts.filter((contact) => contact.id !== id),
    }));

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  componentDidMount() {
    const LocalContacts = localStorage.getItem('contacts');
    const parsedLocalContacts = JSON.parse(LocalContacts);
    if (parsedLocalContacts) {
      this.setState({ contacts: parsedLocalContacts });
    }
  }

  componentDidUpdate(preProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const filteredContacts = this.getVisibleContacts();
    return (
      <div className="App">
        <header className="App-header">
          <h1>Phonebook</h1>
        </header>
        <Form
          onAdd={this.createContact}
          onCheckUnique={this.handleCheckContact}
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

export default App;
