import React, { Component } from 'react';
import Notiflix from 'notiflix';
import { nanoid } from 'nanoid';
import { Box } from './Box';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = values => {
    const { name, number } = values;
    const newContact = {
      id: nanoid(4),
      name,
      number,
    };
    if (
      this.state.contacts
        .map(({ name }) => name.toLowerCase())
        .includes(name.toLowerCase())
    ) {
      Notiflix.Notify.failure(`${name} is already in contacts`);
    } else {
      this.setState(prevState => ({
        contacts: [newContact, ...prevState.contacts],
      }));
    }
  };

  handleSubmit = (values, { resetForm }) => {
    this.addContact(values);

    resetForm();
  };

  handleFilter = e => {
    this.setState({ filter: e.target.value });
  };

  handleDelete = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const filterContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return (
      <>
        <Box fontSize={16} pt="60px" as="section">
          <h1
            style={{
              textAlign: 'center',
              textTransform: 'uppercase',
              fontSize: '28px',
              color: '#1C4931',
            }}
          >
            Phonebook
          </h1>
          <ContactForm onSubmit={this.handleSubmit} />
        </Box>
        <Box fontSize={16} pt="30px" as="section">
          <h2
            style={{
              textAlign: 'center',
              textTransform: 'uppercase',
              fontSize: '28px',
              color: '#1C4931',
            }}
          >
            Contacts
          </h2>
          <Filter filter={filter} handleFilter={this.handleFilter} />
          <ContactList
            contacts={filterContacts}
            handleDelete={this.handleDelete}
          />
        </Box>
      </>
    );
  }
}
