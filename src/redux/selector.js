export const getContacts = ({ contacts }) => contacts.items;
export const getFilter = ({filter}) => filter.filter;


export const getIsLoggedIn = ({ auth }) => auth.isLoggedIn;
export const getUserName = ({ auth }) => auth.user.name;
export const getIsRefreshing = ({ auth }) => auth.isRefreshing;
export const getAuthError = ({ auth }) => auth.error;