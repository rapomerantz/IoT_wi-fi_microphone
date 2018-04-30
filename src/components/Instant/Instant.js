import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
// import InstantMenu from './InstantMenu.js'
import { Button, Card, Menu, MenuItem, FormControl, InputLabel, Select } from 'material-ui';
import './Instant.css'

//connect to redux
const mapStateToProps = state => ({
    state
});

class Instant extends Component {
    constructor(props) {
      super(props) 
      this.state = {
          anchorEl: null,
          selectedDevice: 'Device' 
      };
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
//handle menu close
  closeMenu = () => {
    this.setState({ anchorEl: null });
  };

  openMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };


  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };


  render() {


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
                onChange={this.handleChange}>
                  <MenuItem value={this.state.selectedDevice}><em>Select Device</em></MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
              </Select>
          </FormControl>

            <div className="instantWire"></div>
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
