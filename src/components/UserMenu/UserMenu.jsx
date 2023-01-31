import { getUserName } from 'redux/selector';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from 'redux/operations';
import { NavLink } from 'react-router-dom';
import css from '../UserMenu/UserMenu.module.css';

export const UserMenu = () => {
  const dispatch = useDispatch();
  const name = useSelector(getUserName);

  const handleClick = e => {
    dispatch(logOut());
  };

  return (
    <div className={css.menuWrapper}>
      <NavLink to ='/contacts'>Contacts</NavLink>
      <p className={css.userName}>{name}</p>
      <button className={css.menuButton} type="button" onClick={handleClick}>
        Logout
      </button>
    </div>
  );
};
