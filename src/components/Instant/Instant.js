import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
// import InstantMenu from './InstantMenu.js'
import { Button, Card, MenuItem, FormControl, InputLabel, Select } from 'material-ui';
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
          selectedDevice: '1' 
      };
    }

//fetch user info
  componentDidMount() {
    this.fetchSpl(); 
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.fetchDevices(); 
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
    this.clearInterval(this.state.timer); //<-- clear timer interval on unmount
  }


//function to run every 5 seconds (update spl)
  // tick = () => {
  //   this.setState({
  //     counter: this.state.counter +1
  //   });
  //   this.fetchSpl(); 
  //   // console.log('tick')
  // }


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
      payload: 1
    })    
  }



  render() {
    let newSpl = this.props.state.splReducer[0] && //<-- 'does this value exist?'
                  this.props.state.splReducer[0].spl; //<-- 'if yes, this is the value of newSpl'
    console.log(newSpl)


    
    
//Changing color/contents of warning <div> based on most recent SPL data
    let warningClassName = '';
    let warningMessage = '';
    if (newSpl <= 60) {
      warningClassName = 'warningGreen';
      warningMessage = 'It\'s not too loud in here, you should be fine'; 
    }
    else if(newSpl > 60 && newSpl < 80) {
      warningClassName = 'warningYellow';
      warningMessage = 'Caution: you are approching the threshold for hearing damage'
    }
    else if (newSpl >= 80) {
      warningClassName = 'warningRed';
      warningMessage = 'It\'s really loud in here, you should probably be wearing earplugs'
    }
    else {
      warningClassName = 'warningGreen'; 
      warningMessage = 'It\'s not too loud in here, you should be fine'; 
    }
//End change color/content

    

    return (
      <div>
        <Nav />
        <div id="instantContainer">
          <h1>Instant</h1>
          <Card id="instantContent">

          <FormControl>
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
          </FormControl>

            <div className="instantWire">
            {newSpl}
            </div>

            <div className={warningClassName}>
            <em>{warningMessage}</em>
            </div>
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
