import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Paper, Button, Grid, Typography } from 'material-ui';
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
            <Grid zeroMinWidth container spacing={16}>
                <Grid item xs={2}>
                  <div id="deviceMore"><Button ><Icon>expand_more</Icon></Button></div>
                </Grid>
                <Grid item xs={5}>
                    <div className="deviceName"><p>{this.props.device.device_name}</p></div>
                </Grid>
                <Grid item xs={2}>
                    <div id="deviceEdit"><Button color="primary">Edit</Button></div>
                </Grid>
                <Grid item xs={2}>
                  <div id="deviceDelete"><Button color="secondary"><Icon>delete</Icon></Button></div>
                </Grid>
                
            </Grid>

              </Paper>

            
        </Paper>
      </div>
    );
  }
}

// allows us to use <App /> in index.js
export default connect(mapStateToProps)(DevicesItem);
