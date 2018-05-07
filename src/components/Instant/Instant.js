import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { Switch, FormControlLabel, } from 'material-ui'; 
import InstantSelectOption from './InstantSelectOption.js'
import InstantWarning from './InstantWarning.js'
import './Instant.css'

//connect to redux
const mapStateToProps = state => ({
    state
});

class Instant extends Component {
    constructor(props) {
      super(props) 
      this.timer = null;
      this.state = {
          selectedDevice: '3a0027001647343339383037', //<-- auto-select my device, change this later
          switch: true,
      };
    }

//fetch user info
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.fetchDevices(); 
    this.fetchSpl(); 
    this.timer = setInterval(this.tick, 1000);  //<-- setting interval for reset timer (1 second)
  }

//check user - boot unauthorized user
  componentDidUpdate() {
    if (!this.props.state.user.isLoading && this.props.state.user.userName === null) {
      this.props.history.push('home');
    }
  }

  componentWillUnmount () {
    clearInterval(this.timer);
  }

//function to run every 1 second (update spl) IF switch is on
tick = () => {
  if (this.state.switch) {
    this.fetchSpl(); 
  }
}

//GET devices from db
  fetchDevices = () => {
    console.log('fetching devices');
    this.props.dispatch({
      type: 'FETCH_DEVICES'
    });
  }


//GET most recent SPL data from db
  fetchSpl = () => {
    console.log('in fetchSpl');
    this.props.dispatch({
      type:'FETCH_SPL',
      payload: {
        quantity: 1,
        selectedDevice: this.state.selectedDevice
      }
    })    
  }

  handleDeviceSelect = (event) => {
    console.log('select value: ',event.target.value);
    this.setState({
      selectedDevice: event.target.value
    });    
    this.fetchSpl(); 
  }

//switch toggles auto-update 
  handleSwitch = name => event => {
    this.setState({ [name]: event.target.checked });  
  };

  render() {

//looping through devices & returning <option> elemnts to populate <select>
    let selectItemsArray = this.props.state.devicesReducer.devicesReducer && this.props.state.devicesReducer.devicesReducer; 
    let selectOptions = selectItemsArray.map((element) => {
        return <InstantSelectOption key={element.device_id}
                                     element={element}/>
    })

//Defining newSpl upon render
    let newSpl = this.props.state.splReducer[0] && //<-- 'does this value exist?'
                  this.props.state.splReducer[0].spl; //<-- 'if yes, this is the value of newSpl'

    return (
        <div id="instantContainer">
          <div id="instantContent">
          
          <select onChange={this.handleDeviceSelect}>
            {selectOptions}
          </select>

          <FormControlLabel
            control={
              <Switch
                checked={this.state.switch}
                onChange={this.handleSwitch('switch')}
                value="switch"
              />
            }
            label="Connect"
          />

            <div id="instantBox">
              <p id="instantText">{newSpl}</p>
            </div>
            
            <div id="instantWarningBox">
              <InstantWarning newSpl={newSpl}/>
            </div>


            
          </div>
        </div>
    );
  }
}

// allows us to use <App /> in index.js
export default connect(mapStateToProps)(Instant);
