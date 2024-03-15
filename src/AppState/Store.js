/* eslint-disable react/prop-types */
import React from "react";
import { useHistory } from "react-router-dom";
import { useActions } from "./actions";

export const Store = React.createContext();

const initialState = {
  users:[
    {
      name:'Charlie',
      email:'Charlie@gmail.com',
      password:'64636463',
      balance:1000
    },
  ],
  currentUser: null,
  success: false,
  showError: false
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD_USER":
      return { ...state, users: action.payload };
    case "LOGIN":
      return { ...state, currentUser: action.payload };
    case "UPDATE_USERS":
      return {...state, users: action.payload}
    case "UPDATE_USER": 
      return {...state, currentUser: action.payload}
    case "SET_SUCCESS":
      return {...state, success: action.payload}
    case "SET_ERROR":
      return {...state, error: action.payload}
    case "LOGOUT":
      return { ...state, currentUser: null }; // Reset currentUser to null on logout
    default:
      return state; // Return current state for unhandled actions
  }
}

export function StoreProvider(props) {
  const history =  useHistory(); // Initialize useHistory hook
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const actions = useActions(state, dispatch);

  // Handle logout action
  const handleLogout = () => {
    actions.logOut(); // Call logOut action to reset currentUser
    history.push('/'); // Redirect to home page after logout
    // or history.push('/createaccount'); // Redirect to create account page after logout
  };

  const value = { state, dispatch, actions };

  return (
    <Store.Provider value={value}>
      {/* Pass handleLogout function as a prop */}
      {React.cloneElement(props.children, { handleLogout })}
    </Store.Provider>
  );
}
