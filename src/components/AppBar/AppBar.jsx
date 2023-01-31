import { useSelector } from 'react-redux';
import { getIsLoggedIn } from 'redux/selector';
import { Navigation } from 'components/Navigation/Navigation';
import { UserMenu } from 'components/UserMenu/UserMenu';

import css from './AppBar.module.css';

export const AppBar = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return (
    <header className={css.appHeader}>              
      <span className={css.logo}>PhoneBook</span>
      <div className={css.headerWrapper}>
          <Navigation />
          {isLoggedIn && <UserMenu />}
      </div>
    </header>
  );
};