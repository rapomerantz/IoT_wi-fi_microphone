import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


import { triggerLogout } from '../../redux/actions/loginActions';

import {Tabs, Tab} from 'material-ui'
import Router from '@material-ui/icons/Router';
import ShowChart from '@material-ui/icons/TrendingUp'
import Add from '@material-ui/icons/LibraryAdd'
import Play from '@material-ui/icons/PlayArrow'

const mapStateToProps = state => ({
  state
});

class Nav extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      value: 0
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    // this.props.history.push('home');
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return(
        
      <div className="navbar">
            <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                fullWidth
                indicatorColor="primary"
                textColor="primary"
            >
          <Tab icon={<Router />} label="Devices" component={Link} to="/devices"/>
          <Tab icon={<Add />} label="Add" component={Link} to="/addDevice"/>
          <Tab icon={<Play />} label="Instant" component={Link} to="/instant"/>
          <Tab icon={<ShowChart />} label="Graph" component={Link} to="/graph"/>
        </Tabs>
      

{/* start */}
        {/* <div>
          <ul>
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
        </div> */}
{/* end */}
      </div>
    )
  }
}

let routerNav = withRouter(Nav)

export default connect(mapStateToProps) (routerNav);
