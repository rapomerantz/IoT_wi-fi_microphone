import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.css'

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

const mapStateToProps = state => ({
  state
});

class Header extends Component {

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  }

  render() {
    return(
      <div className="instructions">
                <p>
                    Username: {this.props.state.user.userName}
                    <button id="logoutButton" onClick={this.logout}> Log Out </button>         
                </p>
      </div>
    )
  }
}

export default connect(mapStateToProps) (Header);
