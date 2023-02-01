import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getIsRefreshing } from 'redux/selector';
import { refreshUser } from 'redux/operations';
import { Layout } from 'components/Layout';
import { AppBar } from 'components/AppBar/AppBar';
import css from './App.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <ToastContainer
        font-size="15px"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      </>
    )
  );
};
 
 