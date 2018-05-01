import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { Button, Card, MenuItem, FormControl, InputLabel, Select } from 'material-ui'; 
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
      this.state = {
          timer: null,
          counter: 0,
          selectedDevice: '3a0027001647343339383037',
      };
    }

//fetch user info
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.fetchDevices(); 
    this.fetchSpl(); 
    let timer = setInterval(this.tick, 5000);  //<-- setting interval for reset timer (5 seconds)
    this.setState({timer});
  }

//check user - boot unauthorized user
  componentDidUpdate() {
    if (!this.props.state.user.isLoading && this.props.state.user.userName === null) {
      this.props.history.push('home');
    }
  }

  componentWillUnmount () {
//   let timer = setInterval(0); //<-- clear timer interval on unmount
//   this.setState({timer}); 
  }

//function to run every 5 seconds (update spl)
  tick = () => {
    this.setState({
      counter: this.state.counter +1
    });
    this.fetchSpl(); 
    // console.log('tick')
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

  handleSelect = (event) => {
    console.log('select value: ',event.target.value);
    this.setState({
      selectedDevice: event.target.value
    });    
    this.fetchSpl(); 
  }

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
    console.log(newSpl)

    return (
      <div>
        <Nav />
        <div id="instantContainer">
          <h1>Instant</h1>
          <Card id="instantContent">

          <select onChange={this.handleSelect}>
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
