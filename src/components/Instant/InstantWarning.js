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
      warningMessage = 'It\'s not too loud in here, you should be fine'; 
    }
    else if(this.props.newSpl > 60 && this.props.newSpl < 80) {
      warningClassName = 'warningYellow';
      warningMessage = 'Caution: you are approching the threshold for hearing damage'
    }
    else if (this.props.newSpl >= 80) {
      warningClassName = 'warningRed';
      warningMessage = 'It\'s really loud in here, you should probably be wearing earplugs'
    }
    else {
      warningClassName = 'warningGreen'; 
      warningMessage = 'It\'s not too loud in here, you should be fine'; 
    }
//End change color/content

  return (
    <div className={warningClassName}>
        <em>{warningMessage}</em>
    </div>
  );
}
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(InstantWarning);
