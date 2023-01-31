import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from 'redux/selector';
import css from '../Navigation/Navigation.module.css';

export const Navigation = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return (
    <>
      <ul className={css.listNav}>
        <li className={css.itemNav}>
          <NavLink className={css.linkNav} to='/' end>Home</NavLink>
        </li>
        {!isLoggedIn && ( 
          <>     
        <li className={css.itemNav}>
          <NavLink to='/register'>Registration</NavLink>
        </li>
        <li className={css.itemNav}>
          <NavLink to='/login'>Login</NavLink>
        </li>
          </> 
        )} 
      </ul>
    </>
  );
};
