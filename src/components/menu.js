import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './menu.css';
import './debitcard.js';
import './helpcenter.js';
class Menu extends React.Component {
  render() {
    return (
      <div className="menu">
        <ul>
          <li><Link to="./debitcard.js">Need Debit Card</Link></li> {/* Use Link instead of anchor tag */}
          <li><Link to="/about">Need Credit Card</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="./helpcenter.js">Help Center</Link></li>
        </ul>
      </div>
    );
  }
}

export default Menu;
