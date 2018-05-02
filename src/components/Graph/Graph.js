/* //Samples per TIME division:
//1 min - 6
//5 min - 30
//10 min - 60
//1 hr - 360
//2 hr - 720
//6 hr - 2160
//12 hr - 4320
//24 hr - 8640 */


import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { Button, Card, Menu, MenuItem } from 'material-ui';
import './Graph.css'
import moment from 'moment'

var LineChart = require("react-chartjs").Line;


//connect to redux
const mapStateToProps = state => ({
    state
});

class Graph extends Component {
    constructor(props) {
      super(props) 
      this.state = {
        selectedDevice: '3a0027001647343339383037',
        timeSelection: 30
      };
    }

//fetch user info
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.fetchDevices();
    this.fetchSpl(); 
  }
//check user - boot unauthorized user
  componentDidUpdate() {
    if (!this.props.state.user.isLoading && this.props.state.user.userName === null) {
      this.props.history.push('home');
    }
  }

//GET devices from db
fetchDevices = () => {
  console.log('fetching devices');
  this.props.dispatch({
    type: 'FETCH_DEVICES'
  });
}


//GET most recent SPL data from db
fetchSpl = () => {
  console.log('in fetchSpl');
  this.props.dispatch({
    type:'FETCH_SPL',
    payload: {
      quantity: this.state.timeSelection,
      selectedDevice: this.state.selectedDevice
    }
  })
}


handleTimeSelect = (event) => {
  console.log('select time value: ',event.target.value);
  this.setState({
    timeSelection: event.target.value
  });    
  this.fetchSpl(); 
}







//START Menu handlers
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
//END Menu handlers

  render() {
    // const { anchorElDevice } = this.state;
    // const { anchorElTime } = this.state;

//breaking apart splReducer array to use for chart data
    let splReducer = this.props.state.splReducer;
    let splStampMap = splReducer.map((item) => {
        let formatedStamp = moment(item.stamp).format('h:mm:ss');
        return formatedStamp;   
    })
    let splDataMap = splReducer.map((item) => {
        return item.spl; 
    })
    console.log('splTimeMap', splStampMap);
    console.log('splDataMap', splDataMap);

//data for chart
    let chartData = {
      labels: [],
      datasets: [
          {
              label: "My First dataset",
              fillColor: "rgba(0,0,255,0.3)",
              strokeColor: "rgba(0,0,255,1)",
              pointColor: "rgba(0,0,255,1)",
              pointStrokeColor: "",
              pointHighlightFill: "",
              pointHighlightStroke: "",
              data: splDataMap
          }
      ]
  };
    



    return (
      <div>
        <Nav />
        <div id="graphContainer">
          <h1>Graph</h1>

{/* start UI menus */}
          {/* <Menu id="deviceSelect"
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
          </Menu> */}
{/* end UI menus */}


          
          <Card id="graphContent">
            {/* Anchor Element for Menu */}
            {/* <Button variant="raised" color="primary" className="buttonWire" onClick={this.openDeviceMenu}> Select Device </Button>
            <Button variant="raised" color="primary" className="buttonWire" onClick={this.openTimeMenu}> Select Timeframe </Button> */}



            <select onChange={this.handleTimeSelect}>
              <option value="6">1 Minute</option>
              <option value="30">5 Minutes</option>
              <option value="60">10 Minutes</option>
              <option value="360">1 Hour</option>
            </select>


            <div className="graphWire">

              <LineChart data={chartData} width="500" height="500"/>
            
            </div>


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
