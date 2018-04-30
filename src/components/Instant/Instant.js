import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import InstantMenu from './InstantMenu.js'
import { Button, Card, Menu, MenuItem } from 'material-ui';
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

  render() {
    const { anchorEl } = this.state;


    return (
      <div>
        <Nav />
        <div id="instantContainer">
          <h1>Instant</h1>
          <Menu id="deviceSelect"
                anchorEl = {anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.closeMenu}>
              <MenuItem onClick={this.handleClose}>Device</MenuItem>
              <MenuItem onClick={this.handleClose}>Device</MenuItem>
              <MenuItem onClick={this.handleClose}>Device</MenuItem>
          </Menu>
          <Card id="instantContent">
            {/* Anchor Element for Menu */}
            <Button variant="raised" color="primary" className="buttonWire" onClick={this.openMenu}> Select Device </Button>

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
