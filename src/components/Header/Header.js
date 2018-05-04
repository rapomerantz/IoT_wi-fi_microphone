import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.css'

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Drawer from 'material-ui/Drawer';


const mapStateToProps = state => ({
  state
});

class Header extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      top: false
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  
  render() {

//contents of drawer
    const topDrawer = (
        <div>
        <AppBar position="static">
            <p>
              <Button size="small" id="appBarButton" > Username: {this.props.state.user.userName} </Button>                
              <Button size="small" id="logoutButton" onClick={this.logout}> Log Out </Button>         
            </p>
        </AppBar>
      </div>
    )

    return(
      <div className="navbar">

        <Button onClick={this.toggleDrawer('top', true)}>
          User <Icon>keyboard_arrow_down</Icon>
        </Button>

        <Drawer anchor="top" open={this.state.top} onClose={this.toggleDrawer('top', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('top', false)}
            onKeyDown={this.toggleDrawer('top', false)}>
            {topDrawer}
          </div>
        </Drawer>
      </div>
    )
  }
}

export default connect(mapStateToProps) (Header);
