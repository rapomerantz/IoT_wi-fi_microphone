import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Button, Card, Menu, MenuItem } from 'material-ui';


const mapStateToProps = state => ({
  state
});

class InstantMenu extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            anchorEl: null,
        };
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
                    <Button variant="raised" color="primary" className="buttonWire" onClick={this.openMenu}> Select Device </Button>

        <Menu id="deviceSelect"
                anchorEl = {anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.closeMenu}>
            <MenuItem onClick={this.handleClose}>Device</MenuItem>
            <MenuItem onClick={this.handleClose}>Device</MenuItem>
            <MenuItem onClick={this.handleClose}>Device</MenuItem>
        </Menu>
    </div>
  );
}
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(InstantMenu);
