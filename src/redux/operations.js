import { createAsyncThunk } from '@reduxjs/toolkit';

import{ instanceContact} from 'Api/ContactsApi';

import {
  getContacts,
  addContacts,
  deleteContacts,
  registerNewUser,
  logInUser,
  logOutUser
} from 'Api/ContactsApi';

const token = {
  set(token) {
    instanceContact.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    instanceContact.defaults.headers.common.Authorization = '';
  },
};

export const fetchContacts = createAsyncThunk('contacts/fetch',
  async (_, thunkApi) => {
    try {
      const data = await getContacts();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const addContact  = createAsyncThunk('contacts/add',
    async (newContact, { rejectWithValue }) => {
        try {
            const data  = await addContacts(newContact)
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

export const deleteContact = createAsyncThunk('contacts/delete',
    async (id, { rejectWithValue }) => {
        try {
            const data  = await deleteContacts(id)
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);


export const register = createAsyncThunk('auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const user = await registerNewUser(credentials);
      token.set(user.token);
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);



export const logIn = createAsyncThunk('auth/logIn',
  async (credentials, { rejectWithValue }) => {
    try {
      const user = await logInUser(credentials);
      token.set(user.token);
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const logOut = createAsyncThunk('auth/logOut',
  async (_, { rejectWithValue }) => {
    try {
      await logOutUser();
      token.unset();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const refreshUser = createAsyncThunk('auth/refreshUser',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    // console.log(state);
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue();
    }
    token.set(persistedToken);
    try {
      const { data } = await instanceContact.get('/users/current');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);