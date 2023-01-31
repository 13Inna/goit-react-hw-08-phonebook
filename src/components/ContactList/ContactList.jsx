

import css from './ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts, getFilter } from '../../redux/selector';
import { deleteContact } from '../../redux/operations';
import { toast } from 'react-toastify';

export function ContactList() {
  const contacts = useSelector(getContacts);
  const filterValue = useSelector(getFilter).toLowerCase();;

  const dispatch = useDispatch();
  
  const onDeleteContact = evt => {
    dispatch(deleteContact(evt.currentTarget.id));
    toast.info(`This contact is delited from your phonebook!`);
};


  const getVisibilityContacts = () => {
    if (!filterValue || filterValue === '') {
      return contacts;
    }

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  };

  const visibilityContacts = getVisibilityContacts();

  return (
    <ul className={css.list}>
      {visibilityContacts.map(contact => (
        <li className={css.item} key={contact.id}>
            {contact.name}: {contact.number}
            <button className={css.btn}
              type="button" id={contact.id} onClick={onDeleteContact}>
                Delete
            </button> 
        </li>
      ))}
    </ul>
 );
};

