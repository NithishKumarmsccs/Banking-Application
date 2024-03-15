import { useContext, useEffect, useState } from 'react';
import { Store } from "../../AppState/Store";
import './all data.css';

export default function AllData() {
  const { state } = useContext(Store);
  const [displayedUsers, setDisplayedUsers] = useState([]);

  useEffect(() => {
    // Filter users based on role when component mounts or users change
    const filteredUsers = state.users.filter(user => user.role !== 'admin');
    setDisplayedUsers(filteredUsers);
  }, [state.users]);

  const currentUser = state.currentUser;
  const isAdmin = currentUser && currentUser.isAdmin;

  // Check if the user is signed in
  const isSignedIn = !!currentUser;

  if (!isSignedIn) {
    return null; // If user is not signed in, don't render anything
  }

  return (
    <div className="center-table">
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Name</th>
              {isAdmin && <th scope="col">Balance</th>} {/* Render balance column only for admin */}
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map(element => (
              <tr key={element.email}>
                <td>{element.email}</td>
                <td>{element.name}</td>
                {isAdmin && <td>{element.balance}</td>} {/* Render balance data only for admin */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
