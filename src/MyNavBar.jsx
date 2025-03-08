import { Link } from "react-router-dom";
import React from "react";
import './navbar.css'

const MyNavBar = ({ AddType }) => {
  return (
    <>
      <nav className="navbar">
        <ul>
          <li className="link"><Link to="/">רשימה</Link> </li>
          <li className="link"><Link to="/toDonate"> תרום</Link> </li>
          <li>
            <select onChange={(e) => AddType(e.target.value)}>
              <option value="S">₪</option>
              <option value="D">$</option>
            </select>
          </li>
        </ul>
        <img className="logo" src="fixlogo.png" alt="Logo" />

      </nav>
    </>
  );
};

export default MyNavBar;
