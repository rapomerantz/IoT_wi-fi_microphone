import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  state
});

class GraphSelectOptions extends Component {

render() {

  return (
    <option value={this.props.element.device_id}>{this.props.element.device_name}</option>
  );
}
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(GraphSelectOptions);
  