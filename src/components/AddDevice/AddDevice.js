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
                          label="Device Name"/>
              <TextField className="inputField"
                          id="deviceId"
                          label="Device Id"/>
              <TextField className="inputField"
                          id="deviceAuth"
                          label="Authorization Token"/>
              <Button color="primary">Submit</Button>
            </form>
          </Paper>

        </Paper>
      </div>
    );
  }
}

// allows us to use <App /> in index.js
export default connect(mapStateToProps)(AddDevice);
