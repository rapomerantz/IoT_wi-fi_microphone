import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/user">
            User Home
          </Link>
        </li>
        <li>
          <Link to="/devices">
            Devices
          </Link>
        </li>

        <li>
          <Link to="/addDevice">
            Add
          </Link>
        </li>
        <li>
          <Link to="/instant">
            Instant
          </Link>
        </li>
        <li>
          <Link to="/graph">
            Graph
          </Link>
        </li>
        <li>
          <Link to="/info">
            Info Page
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
