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
          selectedDevice: '1' 
      };
    }

//fetch user info
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.fetchDevices(); 
    this.fetchSpl(); 
  }

//check user - boot unauthorized user
  componentDidUpdate() {
    if (!this.props.state.user.isLoading && this.props.state.user.userName === null) {
      this.props.history.push('home');
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
      payload: 1
    })    
  }



  render() {
    //picking out spl reading from splReducer state in redux
    let newSpl = this.props.state.splReducer.splReducer.map((item) => {
      return <p key={item.id}>{item.spl}</p>
    })
    console.log('newSpl', newSpl);
    

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

            <div className="warningWire"></div>
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
