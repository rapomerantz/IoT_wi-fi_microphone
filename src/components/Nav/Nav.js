import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

const mapStateToProps = state => ({
  state
});

class Nav extends Component {

  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  }

  render() {
    return(
      <div className="navbar">
        <div>
          <ul>
            {/* <li>
              <Link to="/user">
                User Home
              </Link>
            </li> */}
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
            <li>
              <button onClick={this.logout}>
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps) (Nav);
