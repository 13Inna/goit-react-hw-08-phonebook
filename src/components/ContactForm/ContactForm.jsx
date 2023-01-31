import { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';

import css from './ContactForm.module.css';
import { addContact } from 'redux/operations';
import { getContacts} from '../../redux/selector';
import { toast } from 'react-toastify';

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);



  const handleSubmit = e => {
    e.preventDefault();
    if (contacts.findIndex(contact => contact.name.toLowerCase() === name.toLowerCase()) !== -1) {
      return toast.warn(`${name} is already in contacts`);
    }
    dispatch(addContact({ name, number }));
    toast.success (`${name} is added to the contact list!`);
    reset();
  };

  const handleChange = e => {
    const currentTarget = e.currentTarget.name;
    const value = e.currentTarget.value;

    switch (currentTarget) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        throw Error(`CurrentTarget ${currentTarget} is invalid`);
    }

  };
  const reset = () => {
    setName('');
    setNumber('');
  };

  
  return (
    <form className={css.form} onSubmit={handleSubmit}  autoComplete="off">
      <label className={css.label}>
        Name
        <input className={css.input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

      <label className={css.label}>
        Number
        <input className={css.input}
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>

      <button className={css.btn} type="submit">Add contact</button>
    </form>
  );
}
