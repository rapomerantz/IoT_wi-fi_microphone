import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Paper, Button } from 'material-ui';
import './Devices.css'
import Icon from 'material-ui/Icon';

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
              <p>Device Name: {this.props.device.device_name}</p>
            <Button color="primary">Edit</Button>
            <Button color="primary">Instant View</Button>
            <Button color="primary">Graph View</Button>
            <Button color="secondary"><Icon>delete</Icon></Button>
            
            </Paper>
        </Paper>
      </div>
    );
  }
}

// allows us to use <App /> in index.js
export default connect(mapStateToProps)(DevicesItem);
