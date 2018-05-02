import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Instant.css'


const mapStateToProps = state => ({
  state
});

class InstantWarning extends Component {


//check user - boot unauthorized user


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
      warningClassName = 'warningGreen'; 
      warningMessage = 'It\'s not too loud in here, you should be fine'; 
    }
//End change color/content

  return (
    <div className={warningClassName}>
        <p id="instantWarningText">{warningMessage}</p>
    </div>
  );
}
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(InstantWarning);
