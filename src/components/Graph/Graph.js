import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { Paper, Button, Card, CardContent, Menu, MenuItem } from 'material-ui';
import './Graph.css'

//connect to redux
const mapStateToProps = state => ({
    state
});

class Graph extends Component {
    constructor(props) {
      super(props) 
      this.state = {
        anchorElDevice: null,
        anchorElTime: null,
      };
    }

//fetch user info
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }
//check user - boot unauthorized user
  componentDidUpdate() {
    if (!this.props.state.user.isLoading && this.props.state.user.userName === null) {
      this.props.history.push('home');
    }
  }

  //Menu handlers
  closeDeviceMenu = () => {
    this.setState({ anchorElDevice: null });
  };
  openDeviceMenu = event => {
    this.setState({ anchorElDevice: event.currentTarget });
  };
  closeTimeMenu = () => {
    this.setState({ anchorElTime: null });
  };
  openTimeMenu = event => {
    this.setState({ anchorElTime: event.currentTarget });
  };

  render() {
    const { anchorElDevice } = this.state;
    const { anchorElTime } = this.state;


    return (
      <div>
        <Nav />
        <div id="graphContainer">
          <h1>Graph</h1>

          <Menu id="deviceSelect"
                anchorEl = {anchorElDevice}
                open={Boolean(anchorElDevice)}
                onClose={this.closeDeviceMenu}>
              <MenuItem onClick={this.closeDeviceMenu}>Device</MenuItem>
              <MenuItem onClick={this.closeDeviceMenu}>Device</MenuItem>
              <MenuItem onClick={this.closeDeviceMenu}>Device</MenuItem>
          </Menu>
          <Menu id="timeSelect"
                anchorEl = {anchorElTime}
                open={Boolean(anchorElTime)}
                onClose={this.closeTimeMenu}>
              <MenuItem onClick={this.closeTimeMenu}>Time</MenuItem>
              <MenuItem onClick={this.closeTimeMenu}>Time</MenuItem>
              <MenuItem onClick={this.closeTimeMenu}>Time</MenuItem>
          </Menu>


          
          <Card id="graphContent">
            {/* Anchor Element for Menu */}
            <Button variant="raised" color="primary" className="buttonWire" onClick={this.openDeviceMenu}> Select Device </Button>
            <Button variant="raised" color="primary" className="buttonWire" onClick={this.openTimeMenu}> Select Timeframe </Button>

            <div className="graphWire"></div>
            <div className="warningWire"></div>
            

            <Button variant="raised" color="primary" className="buttonWire">See Instant</Button>

          </Card>

        </div>
      </div>
    );
  }
}

// allows us to use <App /> in index.js
export default connect(mapStateToProps)(Graph);
