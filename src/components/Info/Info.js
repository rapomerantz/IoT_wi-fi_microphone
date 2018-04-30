import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { Paper, Button } from 'material-ui';
import './Info.css'

const mapStateToProps = state => ({
  state
});

class InfoPage extends Component {
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
      <Paper id="infoContainer">
        <h1>Info</h1>
        <p>A nice info page will live here :) </p>
      </Paper>
    </div>
  );
}
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(InfoPage);
