import {ContactForm} from 'components/ContactForm/ContactForm';
import {Filter} from 'components/Filter/Filter';
import {ContactList} from 'components/ContactList/ContactList';
import css from '../ContactsPage/ContactsPage.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from 'redux/selector';
import { getFilter } from 'redux/selector';
import { setFilterContacts } from 'redux/filterSlice';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';

export const ContactsPage = () => {
  const { isLoading } = useSelector(getContacts);
  const contacts = useSelector(getContacts);

  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filterChange = evt => {
    const { value } = evt.currentTarget;
    dispatch(setFilterContacts(value));
  };

  const getFilters = () => {
    if (!filter) {
      return contacts;
    }
    const normalaizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) => {
      const normalaizedName = name.toLowerCase();
      const result = normalaizedName.includes(normalaizedFilter);
      return result;
    });
  };
  return (
    <div className={css.contactsPageWrapper}>
      <div className={css.contactsFormWrapper}>
        <p className={css.pageTitle}>New Contact</p>
        <ContactForm />
      </div>

      <div className={css.contactsListWrapper}>
        <h2 className={css.contactsTitle}>Contacts</h2>
        <Filter onChange={filterChange} value={filter} />
        {isLoading && <h2 className={css.loaderText}>Waiting...</h2>}

        <ContactList contacts={getFilters()}/>
      </div>
    </div>
  );
};