import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getIsRefreshing } from 'redux/selector';
import { refreshUser } from 'redux/operations';
import { Layout } from 'components/Layout';
import { AppBar } from 'components/AppBar/AppBar';
import css from './App.module.css';

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(getIsRefreshing);
  
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    !isRefreshing && (
      <>
        <AppBar />
        <div className={css.wrapper}>
          <Layout />
        </div>
        <footer className={css.footer}>
        <p> &copy; 2023 Inna Bronnikova. All rights reserved</p>
      </footer>
      </>
    )
  );
};
 
 