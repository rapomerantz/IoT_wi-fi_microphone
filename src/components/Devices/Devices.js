import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'; 

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { Paper, Button } from 'material-ui';
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

  fetchDevices = () => {
    console.log('fetching devices');
    this.props.dispatch({
      type: 'FETCH_DEVICES'
    });
    

  }



  render() {

    return (
      <div>
        <Nav />
        <Paper>
        <h1>Devices</h1>
        <Paper className="devicePaper">
           DEVICE 1
          <Button color="primary">Edit</Button>
          <Button color="primary">Instant View</Button>
          <Button color="primary">Graph View</Button>
          <Button color="secondary">Delete</Button>
        </Paper>
        <Paper className="devicePaper">
           DEVICE 2
          <Button color="primary">Edit</Button>
          <Button color="primary">Instant View</Button>
          <Button color="primary">Graph View</Button>
          <Button color="secondary">Delete</Button>
        </Paper>


        </Paper>



      </div>
    );
  }
}

// allows us to use <App /> in index.js
export default connect(mapStateToProps)(Devices);
