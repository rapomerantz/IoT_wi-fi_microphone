import React, { Component } from 'react';
import { connect } from 'react-redux';
import DevicesDeleteDialog from './DevicesDeleteDialog.js'
import DevicesEditDialog from './DevicesEditDialog.js'
import './Devices.css'


import {Button, Grid } from 'material-ui';
import Card, { CardContent } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Icon from 'material-ui/Icon';
import Switch from 'material-ui/Switch';
import { FormControlLabel } from 'material-ui/Form';





//connect to redux
const mapStateToProps = state => ({
    state
});


class DevicesItem extends Component {
    state = { 
      expanded: false,
      deleteDialog: false,
      editDialog: false,
      activeSampling: this.props.device.active,
    };

handleActiveButton = () => {
  console.log('active button');
  this.setState({
    activeSampling: !this.state.activeSampling
  })
  this.props.dispatch({
    type: 'TOGGLE_ACTIVE', 
    payload: this.props.device,
  })
}


//handle card expand
  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };


//send delete to DB ~ I didn't move this into the component because it didn't seem necessary
  deleteSaga = () => {
    this.setState({ deleteDialog: false });
    this.props.dispatch({
      type: 'DELETE_DEVICE', 
      payload: this.props.device.device_id
    })
  }

//open DELETE dialog
handleDeleteOpen = () => {
  this.setState({ deleteDialog: true });
};

//open EDIT dialog
handleEditOpen = () => {
  this.setState({ editDialog: true });
};

//close delete dialog
handleClose = () => {
  this.setState({
     deleteDialog: false,
     editDialog: false
    });
};

  render() {

    let activeClassName = '';
    let activateButtonText = 'Activate'
    if (this.state.activeSampling) {
      activeClassName += 'activeDevice';
      activateButtonText = 'Deactivate'
    }


    return (
      <div>

            <Card className='devicePaper'>
              <CardContent className={activeClassName}>
                <Grid zeroMinWidth container spacing={16}>
                    <Grid item xs={2}>
                      <div className="deviceMore">
                        <Button onClick={this.handleExpandClick}><Icon>expand_more</Icon></Button>
                      </div>
                    </Grid>
                    <Grid item xs={5}>
                        <div className="deviceName">
                          <p>{this.props.device.device_name}</p>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className="deviceEdit">
                          <Button color="primary" onClick={this.handleEditOpen}>Edit</Button>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                      <div className="deviceDelete">
                        <Button color="secondary" name="deleteDialog" onClick={this.handleDeleteOpen}><Icon>delete</Icon></Button>
                      </div>
                    </Grid>
                </Grid>
              </CardContent>

              {/* collapse content: more device info */}
              <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                  <CardContent className={activeClassName}>

                {/* Activate Button */}
                    <Button onClick={this.handleActiveButton} 
                            variant="raised" 
                            color="primary" >
                            {activateButtonText}
                    </Button>
                    
                      <br/>
                      <i>Id: <br/> {this.props.device.device_id}</i>
                      <br/>
                      <i>Auth Token: <br/> {this.props.device.auth_token}</i>
                    </CardContent>
                </Collapse>

            </Card>

            <DevicesDeleteDialog deleteDialog={this.state.deleteDialog} // <-- passing thru open/close boolean
                                  handleClose={this.handleClose}
                                  deleteSaga={this.deleteSaga}/> 
            
            <DevicesEditDialog  device={this.props.device} //<-- passing all of device thru to edit dialog
                                editDialog={this.state.editDialog} // <-- passing thru open/close boolean
                                handleClose={this.handleClose}/> 
   
      </div>
    );
  }
}

// allows us to use <App /> in index.js
export default connect(mapStateToProps)(DevicesItem);
