import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { logIn } from 'redux/operations';
import css from '../LoginPage/LoginPage.module.css';

import { getAuthError } from 'redux/selector';

export const LoginPage = () => {
  const error = useSelector(getAuthError);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case 'inputName':
        setName(value);
        break;

      case 'inputEmail':
        setEmail(value);
        break;

      case 'inputPassword':
        setPassword(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(logIn({ name, email, password }));
    if (error) {
      return;
    }
    setName('');
    setEmail('');
    setPassword('');
  };
//используем useMemo для оптимизации
  const nameInputId = useMemo(()=> nanoid(), []);
  const emailInputId = useMemo(()=> nanoid(), []);
  const passwordInputId = useMemo(()=> nanoid(), []);

  return (
    <>
      <div className={css.logWrapper}>
        <h1 className={css.logTitle}>Login, please</h1>
        {error && <p className={css.logTitle}>Something went wrong, try again!</p>}
        <form className={css.loginForm} onSubmit={handleSubmit}>
          <label className={css.formLabel} htmlFor="nameInputId">Name</label>
          <input className={css.formInput}
            type="text"
            name="inputName"
            value={name}
            onChange={handleChange}
            id={nameInputId}
          />

          <label className={css.formLabel} ormLabel htmlFor="emailInputId">Email</label>
          <input className={css.formInput}
            type="email"
            name="inputEmail"
            value={email}
            onChange={handleChange}
            id={emailInputId}
          />

          <label className={css.formLabel} htmlFor="passwordInputId">Password</label>
          <input className={css.formInput}
            type="password"
            name="inputPassword"
            value={password}
            onChange={handleChange}
            id={passwordInputId}
          />

          <button className={css.submitBtn} type="submit">Sign in</button>
        </form>
      </div>
    </>
  );
};
