import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Store } from "../../AppState/Store";

const Logout = () => {
    
const {state, actions} = useContext(Store)
const { dispatch } = useContext(Store);
  const history = useHistory();

  const handleLogout = () => {
    // Perform logout actions here
    dispatch({ type: 'Logout' }); // Dispatch action to update state (e.g., clear currentUser)
    history.push('/login'); // Redirect to login page after logout
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};
export default Logout;
