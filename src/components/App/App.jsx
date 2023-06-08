// import { Component } from 'react';
import { useState, useEffect } from 'react';
import ContactList from '../ContactList/ContactList';
import ContactForm from '../ContactForm/ContactForm';
import { H2Styled } from './App.styled';
import Filter from '../Filter';

const CL_KEY = 'contacts';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localStorageContacts = JSON.parse(localStorage.getItem(CL_KEY));
    if (localStorageContacts) {
      setContacts(prevState => {
        return [...prevState, ...localStorageContacts];
      });
    }
  }, []);

  useEffect(() => {
    contacts && localStorage.setItem(CL_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data => {
    const isExist = contacts.find(
      contact => contact.name.toLowerCase() === data.name.toLowerCase(),
    );

    if (isExist) {
      alert(`${data.name} is already in contacts.`);
      return;
    }
    setContacts(prevState => {
      return [...prevState, data];
    });
  };
  const filterHandlerData = e => {
    setFilter(e.currentTarget.value);
  };
  const onDeleteContactHandler = id => {
    setContacts(
      contacts.filter(contact => {
        return contact.id !== id;
      }),
    );
  };

  function getFilteredContacts(data) {
    if (data === undefined || data === '') {
      return;
    }
    return data.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  return (
    <div>
      <H2Styled>PhoneBook</H2Styled>
      <ContactForm onSubmitForm={formSubmitHandler} />
      <H2Styled>Contacts</H2Styled>
      <Filter value={filter} onChange={filterHandlerData} />
      <ContactList contacts={getFilteredContacts(contacts)} onClick={onDeleteContactHandler} />
    </div>
  );
};

export default App;
