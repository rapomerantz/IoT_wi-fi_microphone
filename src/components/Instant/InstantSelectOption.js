import React, { Component } from 'react';


class InstantSelectOption extends Component {

render() {

  return (
    <option value={this.props.element.device_id}>{this.props.element.device_name}</option>
  );
}
}

export default InstantSelectOption;
  