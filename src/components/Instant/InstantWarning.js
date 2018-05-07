import React, { Component } from 'react';
import './Instant.css'

class InstantWarning extends Component {
render() {

//Changing color/contents of warning <div> based on most recent SPL data
    let warningClassName = '';
    let warningMessage = '';
    if (this.props.newSpl <= 60) {
      warningClassName = 'warningGreen';
      warningMessage = 'No risk.'; 
    }
    else if(this.props.newSpl > 60 && this.props.newSpl < 80) {
      warningClassName = 'warningYellow';
      warningMessage = 'Moderate risk.'
    }
    else if (this.props.newSpl >= 80) {
      warningClassName = 'warningRed';
      warningMessage = 'High risk.'
    }
    else {
      warningClassName = ''; 
      warningMessage = 'Something\'s Wrong...Check your microphone'; 
    }
//End change color/content


    return (
      <div className={warningClassName}>
          <p id="instantWarningText">{warningMessage}</p>
      </div>
    );
  }
}

export default InstantWarning;
