import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Paper, Button } from 'material-ui';
import './Devices.css'

//connect to redux
const mapStateToProps = state => ({
    state
});

class Devices extends Component {

  render() {

    return (
      <div>
        <Paper>
            <Paper className="devicePaper">
            DEVICE 1
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
