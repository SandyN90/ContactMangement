import { createSlice } from '@reduxjs/toolkit'
import { Contact, NavBar } from '../types';

export const contactSlice = createSlice({
  name: 'counter',
  initialState: {
    contactList: [] as Contact[],
    navBar: [
    {
      tabName: "Dashboard",
      path: '/dashboard',
      active: true,
    },
    {
      tabName: "Contacts",
      path: '/contact-list',
      active: false
    },
  ] as NavBar[],
  },
  reducers: {
    addContacts: (initialState, data) => {
      initialState.contactList.push(data.payload.formData);      
    },

    updateList: (initialState, data) => {
      initialState.contactList = data.payload.formData;
    },

    updateNavbar: (initialState, data)=> {
      const {payload} = data.payload;
      initialState.navBar = payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { addContacts, updateList , updateNavbar} = contactSlice.actions

export default contactSlice.reducer