import React, { useContext, useState } from 'react';
import Card from '../../util/card';
import { Store } from '../../AppState/Store';
import { useHistory } from 'react-router-dom';
import './login.css';

export default function Login() {
  const { state, actions } = useContext(Store);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const history = useHistory();

  console.log("Current User:", state.currentUser); // Debugging: Check if currentUser is correctly updated

  const handleLogin = () => {
    const { email, password } = formData;
    const user = state.users.find(user => user.email === email && user.password === password);
    if (user) {
      actions.logIn(user);
      console.log("Logged in user:", user); // Debugging: Log the user to see if it's correctly retrieved
      history.push('/profile');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlelogOut = () => {
    actions.logOut();
    history.push('/createaccount');
  };

  return (
    <div className="container">
      <Card
        bgcolor="transparent"
        header={state.currentUser ? "PROFILE" : "Login"}
        body={
          !state.currentUser
            ? (
              <div>
                <div className="mb-3">
                  <label htmlFor="emailField" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="emailField" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="passwordField" className="form-label">Password</label>
                  <input type="password" className="form-control" id="passwordField" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <button className="btn btn-light" onClick={handleLogin}>Login</button>
                {error && <div className="text-danger">{error}</div>}
              </div>
            )
            : (
              <div>
                <div id="login-message"></div>
                <br />
                <table className="profile-table">
                  <tbody style={{ backgroundColor: 'secondary' }}>
                    <tr>
                      <td className="profile-label"><strong>Name      :</strong></td>
                      <td className="profile-value">{state.currentUser.name}</td>
                    </tr>
                    <tr>
                      <td className="profile-label"><strong>Email     :</strong></td>
                      <td className="profile-value">{state.currentUser.email}</td>
                    </tr>
                    <tr>
                      <td className="profile-label"><strong>AccountBalance:</strong></td>
                      <td className="profile-value">{state.currentUser.balance}</td>
                    </tr>
                    <tr>
                      <td className="profile-label"><strong>Password  :</strong></td>
                      <td className="profile-value">{state.currentUser.password}</td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <button className="btn btn-secondary" onClick={handlelogOut}>Logout</button>
              </div>
            )
        }
        className={state.currentUser ? "profile-card" : "login-card"}
      />
    </div>
  );
}
