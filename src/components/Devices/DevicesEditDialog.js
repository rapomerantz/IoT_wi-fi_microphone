import React, { Component } from 'react'
import { connect } from 'react-redux';


import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';



//connect to redux
const mapStateToProps = state => ({
    state
});



class DevicesEditDialog extends Component {
    state = { 
        deviceName: this.props.device.device_name,
        deviceId: this.props.device.device_id,
        authToken: this.props.device.auth_token, 
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
    this.props.handleClose(); 
    }

  render() {
    return (
      <div>
        <Dialog open={this.props.editDialog}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title">

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
            <Button onClick={this.props.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleEditSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        
      </div>
    )
  }
}

export default connect(mapStateToProps)(DevicesEditDialog);
