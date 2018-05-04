import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

import {Tabs, Tab} from 'material-ui'
import Router from '@material-ui/icons/Router';
import ShowChart from '@material-ui/icons/TrendingUp'
import Add from '@material-ui/icons/LibraryAdd'
import Play from '@material-ui/icons/PlayArrow'
import Person from '@material-ui/icons/Person'
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Drawer from 'material-ui/Drawer';

import './Nav.css'

const mapStateToProps = state => ({
  state
});

class Nav extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      top: false,
      value: 0
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

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
            <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                fullWidth
                indicatorColor="primary"
                textColor="primary"
            >
          <Tab className="navTab" icon={<Router />} label="Devices" component={Link} to="/devices"/>
          <Tab icon={<Play />} label="Instant" component={Link} to="/instant"/>
          <Tab icon={<ShowChart />} label="Graph" component={Link} to="/graph"/>
          <Tab icon={<Person />} label="User" onClick={this.toggleDrawer('top', true)}/>
        </Tabs>

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

let routerNav = withRouter(Nav)

export default connect(mapStateToProps) (routerNav);
