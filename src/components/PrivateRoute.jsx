import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getIsLoggedIn } from 'redux/selector';

export const PrivateRoute = ({ redirectTo, component }) => {
  const isLoggedIn = useSelector(getIsLoggedIn);

  return isLoggedIn ? component : <Navigate to={redirectTo} />;
};
