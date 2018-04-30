import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Paper, Button } from 'material-ui';
import './Devices.css'

//connect to redux
const mapStateToProps = state => ({
    state
});

class DevicesItem extends Component {

  render() {

    return (
      <div>
        <Paper>
            <Paper className="devicePaper">
              <h3>Device Name: {this.props.device.device_name}</h3>
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
export default connect(mapStateToProps)(DevicesItem);
