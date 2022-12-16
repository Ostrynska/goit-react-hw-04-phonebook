import PropTypes from 'prop-types';
import {
  ContactsList,
  ContactsListItem,
  ContactsListInf,
  ContactsListButton,
} from './ContactList.styled';
import { IoTrashBinOutline } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import { MdContactPage } from 'react-icons/md';

const ContactList = ({ contacts, handleDelete }) => {
  return (
    <ContactsList>
      {contacts.map(({ id, name, number }) => (
        <ContactsListItem key={id}>
          <IconContext.Provider value={{ color: '#d85841' }}>
            <MdContactPage />
          </IconContext.Provider>
          <ContactsListInf>
            <b>{name}: </b>
            {number}
          </ContactsListInf>
          <ContactsListButton onClick={() => handleDelete(id)}>
            <IoTrashBinOutline />
          </ContactsListButton>
        </ContactsListItem>
      ))}
    </ContactsList>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ContactList;
