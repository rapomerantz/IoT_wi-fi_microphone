import React, { Component } from 'react'
import { connect } from 'react-redux';


import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
  } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';



//connect to redux
const mapStateToProps = state => ({
    state
});

class DevicesEditDialog extends Component {
    state = { 
        deviceName: '',
        deviceId: '',
        authToken: '', 
        errorMessage: false
      };

//currying function to setState on change of input fields
handleTextChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })    
  }
  
handleAddSubmit = (event) => {
    event.preventDefault();

    if (this.state.deviceId.length > 0 && this.state.deviceName.length > 0 && this.state.authToken.length > 0 ){
      //pass this.state to addDeviceSaga    
      this.props.dispatch({ 
          type:'ADD_DEVICE',
          payload: {
          deviceName: this.state.deviceName,
          deviceId: this.state.deviceId,
          authToken: this.state.authToken
          }
      })
      //reset input fields
      this.setState({     
          deviceName: '',
          deviceId: '',
          authToken: '',
          errorMessage: false
      })
      this.props.handleClose(); 
      }
    else {
      this.setState({
        errorMessage: true
      })
    }
  }





  render() {

    let errorMessage;
    if (this.state.errorMessage) {
      errorMessage = <p>Check your inputs - all fields are required</p>
    } 


    return (
      <div>
        <Dialog open={this.props.addDialog}
                onClose={this.props.handleClose}
                aria-labelledby="form-dialog-title">

          <DialogTitle id="form-dialog-title">Enter Device Details</DialogTitle>
          <DialogContent>
            <TextField className="inputField"
                          id="deviceName"
                          label="Device Name"
                          name="deviceName"
                          value={this.state.deviceName}
                          onChange={this.handleTextChange}/>
              <TextField className="inputField"
                          id="deviceId"
                          label="Device Id"
                          name="deviceId"
                          value={this.state.deviceId}
                          onChange={this.handleTextChange}/>
              <TextField className="inputField"
                          id="deviceAuth"
                          label="Authorization Token"
                          name="authToken"
                          value={this.state.authToken}
                          onChange={this.handleTextChange}/>

              {errorMessage}   {/* appears if user doesn't enter a device ID */}

          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose}>
              Cancel
            </Button>
            <Button onClick={this.handleAddSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        
      </div>
    )
  }
}

export default connect(mapStateToProps)(DevicesEditDialog);
