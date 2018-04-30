import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { Paper, Button, TextField } from 'material-ui';
import './AddDevice.css'

//connect to redux
const mapStateToProps = state => ({
    state
});

class AddDevice extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      deviceName: '',
      deviceId: '',
      authToken: '', 
    }
  }



//fetch user info
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

//check user - boot unauthorized user
  componentDidUpdate() {
    if (!this.props.state.user.isLoading && this.props.state.user.userName === null) {
      this.props.history.push('home');
    }
  }

//currying function to setState on change of input fields
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })    
  }

  handleSubmit = (event) => {
    event.preventDefault();
    //pass this.state to addDeviceSaga    
    this.props.dispatch({ 
      type:'ADD_DEVICE',
      payload: this.state
    })
    //reset input fields
    this.setState({     
      deviceName: '',
      deviceId: '',
      authToken: '', 
    })
  }


  render() {

    return (
      <div>
        <Nav />
        <Paper>
          <h1>Add Device</h1>
          <Paper className="inputs">

            <form>

              <TextField className="inputField"
                          id="deviceName"
                          label="Device Name"
                          name="deviceName"
                          value={this.state.deviceName}
                          onChange={this.handleChange}/>
              <TextField className="inputField"
                          id="deviceId"
                          label="Device Id"
                          name="deviceId"
                          value={this.state.deviceId}
                          onChange={this.handleChange}/>
              <TextField className="inputField"
                          id="deviceAuth"
                          label="Authorization Token"
                          name="authToken"
                          value={this.state.authToken}
                          onChange={this.handleChange}/>
              <Button onClick={this.handleSubmit} color="primary">Submit</Button>

            </form>

          </Paper>

        </Paper>
      </div>
    );
  }
}

// allows us to use <App /> in index.js
export default connect(mapStateToProps)(AddDevice);
