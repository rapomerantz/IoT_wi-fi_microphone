import React, { Component } from 'react';
import { connect } from 'react-redux';
import DevicesDeleteDialog from './DevicesDeleteDialog.js'
import './Devices.css'


import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { Paper, Button, Grid, Typography } from 'material-ui';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Icon from 'material-ui/Icon';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';



//connect to redux
const mapStateToProps = state => ({
    state
});

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});





class DevicesItem extends Component {
    state = { 
      expanded: false,
      deleteDialog: false,
      editDialog: false,
      deviceName: this.props.device.device_name,
      deviceId: this.props.device.device_id,
      authToken: this.props.device.auth_token, 
    };


//handle card expand
  handleExpandClick = () => {
    console.log('expand');
    this.setState({ expanded: !this.state.expanded });
    console.log(this.state);
  };

//send delete to DB
  deleteSaga = () => {
    this.setState({ deleteDialog: false });
    this.props.dispatch({
      type: 'DELETE_DEVICE', 
      payload: this.props.device.device_id
    })
  }

//open DELETE dialog
handleDeleteOpen = () => {
  console.log('delete clicked', this.props.device);
  this.setState({ deleteDialog: true });
};

//open EDIT dialog
handleEditOpen = () => {
  console.log('edit clicked', this.props.device);
  this.setState({ editDialog: true });
};

//close delete dialog
handleClose = () => {
  this.setState({
     deleteDialog: false,
     editDialog: false
    });
};

//currying function to setState on change of input fields
handleEditTextChange = (event) => {
  this.setState({
    [event.target.name]: event.target.value,
  })    
}

handleEditSubmit = (event) => {
  event.preventDefault();
  //pass this.state to addDeviceSaga    
  this.props.dispatch({ 
    type:'EDIT_DEVICE',
    payload: {
      deviceName: this.state.deviceName,
      deviceId: this.state.deviceId,
      authToken: this.state.authToken
    }
  })
  //reset input fields
  this.setState({     
    deviceName: this.props.device.device_name,
    deviceId: this.props.device.device_id,
    authToken: this.props.device.auth_token,
  })
  this.handleClose(); 
}






  render() {
    const { classes } = this.props;


    return (
      <div>

            <Card className="devicePaper" >
              <CardContent>
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
                  <CardContent>
                      <i>Id: <br/> {this.props.device.device_id}</i>
                      <br/>
                      <i>Auth Token: <br/> {this.props.device.auth_token}</i>
                    </CardContent>
                </Collapse>

            </Card>
            <DevicesDeleteDialog deleteDialog={this.state.deleteDialog}
                                  handleClose={this.handleClose}
                                  deleteSaga={this.deleteSaga}/>
            



        <Dialog
          open={this.state.editDialog}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit Device?
            </DialogContentText>
            <TextField className="inputField"
                          id="deviceName"
                          label="Device Name"
                          name="deviceName"
                          value={this.state.deviceName}
                          onChange={this.handleEditTextChange}/>
              <TextField className="inputField"
                          id="deviceId"
                          label="Device Id"
                          name="deviceId"
                          value={this.state.deviceId}
                          onChange={this.handleEditTextChange}/>
              <TextField className="inputField"
                          id="deviceAuth"
                          label="Authorization Token"
                          name="authToken"
                          value={this.state.authToken}
                          onChange={this.handleEditTextChange}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleEditSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>







            
 
      </div>
    );
  }
}

// allows us to use <App /> in index.js
export default connect(mapStateToProps)(DevicesItem);
