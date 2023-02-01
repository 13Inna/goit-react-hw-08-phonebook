import { useState, useMemo } from 'react';
import { useDispatch} from 'react-redux';
import { nanoid } from 'nanoid';
import { register } from 'redux/operations';
import css from '../RegisterPage/RegisterPage.module.css';


export const RegisterPage = () => {
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
    dispatch(register({ name, email, password }));
    setName('');
    setEmail('');
    setPassword('');
  };
//используем useMemo для оптимизации
  const nameInputId = useMemo(()=> nanoid(), []);
  const emailInputId = useMemo(()=> nanoid(), []);
  const passwordInputId = useMemo(()=> nanoid(), []);

  return (
    <div className={css.regWrapper}>
      <h1 className={css.regTitle}>Have no account? Sign up!</h1>
      <form className={css.registerForm} onSubmit={handleSubmit}>
        <label className={css.formLabel} htmlFor="nameInputId">Name</label>
        <input className={css.formInput}
          type="text"
          name="inputName"
          value={name}
          onChange={handleChange}
          id={nameInputId}
        />

        <label className={css.formLabel} htmlFor="emailInputId">Email</label>
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

        <button className={css.submitBtn} type="submit">Sign up</button>
      </form>
    </div>
  );
};
