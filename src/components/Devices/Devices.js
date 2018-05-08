import React, { Component } from 'react';
import { connect } from 'react-redux';
import DevicesAddDialog from './DevicesAddDialog'
import DevicesItem from './DevicesItem.js'


import { USER_ACTIONS } from '../../redux/actions/userActions';
import { Button } from 'material-ui';

import './Devices.css'



//connect to redux
const mapStateToProps = state => ({
    state
});

class Devices extends Component {
  state = {
    addDialog: false
  }


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

  handleAddOpen = () => {
    console.log('open add device');
    this.setState({
      addDialog: true
    })
  }

  handleClose = () => {
    console.log('close add device');
    this.setState({
      addDialog: false
    })
    
  }


  render() {
    let devicesReducer = this.props.state.devicesReducer.devicesReducer; 

//.map() over redux devicesReducer to make list of user's devices
    let devicesItemArray = devicesReducer.map((device) => {
      return <DevicesItem key={device.id}
                          device={device}/>
    })
    



    return (
      <div>

  {/* Link to AddDevice page ~ may switch to a modal */}
        <Button id="addDeviceLink" 
                variant="raised" 
                fullWidth={true} 
                onClick={this.handleAddOpen}>
          Add Device
        </Button>

          {devicesItemArray}



        <DevicesAddDialog // device={this.props.device} //<-- passing all of device thru to edit dialog
                            addDialog={this.state.addDialog} // <-- passing thru open/close boolean
                            handleClose={this.handleClose}/> 

      </div>
    );
  }
}

// allows us to use <App /> in index.js
export default connect(mapStateToProps)(Devices);
