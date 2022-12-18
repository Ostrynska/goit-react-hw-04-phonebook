import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Notiflix from 'notiflix';
import { nanoid } from 'nanoid';
import { Box } from './Box';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

const contactsList = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', contactsList);
  const [filter, setFilter] = useState('');

  const addContact = values => {
    const { name, number } = values;
    const newContact = {
      id: nanoid(4),
      name,
      number,
    };
    if (
      contacts
        .map(({ name }) => name.toLowerCase())
        .includes(name.toLowerCase())
    ) {
      Notiflix.Notify.failure(`${name} is already in contacts`);
    } else {
      setContacts(prevState => [newContact, ...prevState]);
    }
  };

  const handleSubmit = (values, { resetForm }) => {
    addContact(values);
    resetForm();
  };

  const handleFilter = e => {
    setFilter(e.target.value);
  };

  const handleDelete = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

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
        <ContactForm onSubmit={handleSubmit} />
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
        <Filter filter={filter} handleFilter={handleFilter} />
        <ContactList contacts={filterContacts()} handleDelete={handleDelete} />
      </Box>
    </>
  );
};
