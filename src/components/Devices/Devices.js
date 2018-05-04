import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { Paper } from 'material-ui';
import DevicesItem from './DevicesItem.js'
import './Devices.css'

//connect to redux
const mapStateToProps = state => ({
    state
});

class Devices extends Component {
//fetch user info
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.fetchDevices(); 

  }

//check user - boot unauthorized user
  componentDidUpdate() {
    if (!this.props.state.user.isLoading && this.props.state.user.userName === null) {
      this.props.history.push('home');
    }
  }

//triggers fetchDevicesSaga, stores devices on this.props.state.devicesReducer
  fetchDevices = () => {
    console.log('fetching devices');
    this.props.dispatch({
      type: 'FETCH_DEVICES'
    });
  }

  render() {
    let devicesReducer = this.props.state.devicesReducer.devicesReducer; 

    let devicesItemArray = devicesReducer.map((device) => {
      return <DevicesItem key={device.id}
                          device={device}/>
    })
    



    return (
      <div>
        {/* <Nav /> */}
        
          {devicesItemArray}
       



      </div>
    );
  }
}

// allows us to use <App /> in index.js
export default connect(mapStateToProps)(Devices);
