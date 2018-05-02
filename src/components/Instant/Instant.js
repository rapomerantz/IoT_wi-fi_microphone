import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { Button, Card, MenuItem, FormControl, InputLabel, Select, Switch, FormControlLabel } from 'material-ui'; 
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
          selectedDevice: '3a0027001647343339383037',
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

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

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

//switch toggles auto update 
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
      <div>
        <Nav />
        <div id="instantContainer">
          <h1>Instant</h1>
          <Card id="instantContent">


          <FormControlLabel
            control={
              <Switch
                checked={this.state.switch}
                onChange={this.handleSwitch('switch')}
                value="switch"
              />
            }
            label="<- Auto Update"
          />

          <select onChange={this.handleDeviceSelect}>
            {selectOptions}
          </select>

          {/* <FormControl>
            <InputLabel>Select Device</InputLabel>
              <Select
                value={this.state.selectedDevice}
                onChange={this.handleChange}
                name="selectedDevice">
                  <MenuItem value={this.state.selectedDevice}><em>Select Device</em></MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
              </Select>
          </FormControl> */}

            <p>selected device: {this.state.selectedDevice}</p>
            <div className="instantWire">
              {newSpl}
            </div>

            <InstantWarning newSpl={newSpl}/>
              {/* link to graph view */}
            <Button variant="raised" color="primary" className="buttonWire">See Graph</Button>
          </Card>
        </div>
      </div>
    );
  }
}

// allows us to use <App /> in index.js
export default connect(mapStateToProps)(Instant);
