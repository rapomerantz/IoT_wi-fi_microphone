import React, { Component } from 'react'
import { connect } from 'react-redux'

export class SandBox extends Component {


  changeRedux = (event) => {
    this.props.dispatch({
      type: 'TEST',
      payload: event.target.value
    })
  }


  render() {
    console.log('I DO NOW, this.props.state:', this.props.state);
    
    return (
      <div>
        <h1>HELLO THERE </h1>

        <select name="claimContributor"
                        id='0'
                        onChange={this.changeRedux}
                        value={this.props.state.SandBoxReducer.SandBoxReducer}
                        >
            <option value="">-- Select Contributor --</option>
            <option value="contributor1">Contributor 1</option>
            <option selected value="contributor2">Contributor 2</option>
        </select>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  keyClaims: state.SandBoxReducer.SandBoxReducer.keyClaims,
  state
})


export default connect(mapStateToProps)(SandBox)
