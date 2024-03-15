import { useContext } from 'react';
import { Store } from './AppState/Store';
import { useLocation } from 'react-router-dom';

export default function NavBar() { 
  const { state } = useContext(Store);
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#">HOME</a>
          </li>
          <li className="nav-item">
            <a className={location.pathname==="/CreateAccount/" ? "nav-link active" : "nav-link"} href="#/CreateAccount/">CREATE ACCOUNT</a>
          </li>
          <li className="nav-item">
            <a className={location.pathname==="/login/" ? "nav-link active" : "nav-link"} href="#/login/" aria-label="login-link">{state.currentUser ? "PERSONAL INFO" : "LOGIN"}</a>
          </li>
          {state.currentUser && 
            <>
              <li className="nav-item">
                <a className={location.pathname==="/deposit/" ? "nav-link active" : "nav-link"} href="#/deposit/">DEPOSIT</a>
              </li>
              <li className="nav-item">
                <a className={location.pathname==="/withdraw/" ? "nav-link active" : "nav-link"} href="#/withdraw/">WITHDRAW</a>
              </li>
              <li className="nav-item">
                <a className={location.pathname==="/alldata/" ? "nav-link active" : "nav-link"} href="#/alldata/">ALL DATA</a>
              </li>
            </>
          }
        </ul>
      </div>
    </nav>
  );
}
