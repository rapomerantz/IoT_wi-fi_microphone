import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'

var LineChart = require("react-chartjs").Line;



const mapStateToProps = state => ({
  state
});

class Chart extends Component {
render() {

  //breaking apart splReducer array to use for chart data
  let splReducer = this.props.state.splReducer.reverse();

  let splStampMap = splReducer.map((item) => {
      let formatedStamp = moment(item.stamp).format('mm:ss');
      return formatedStamp;   
  })
  let splDataMap = splReducer.map((item) => {
      return item.spl; 
  })

//end chart data maps
//data for chart
  let chartData = {
    labels: splStampMap,
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(0,0,255,0.3)",
            strokeColor: "rgba(0,0,255,1)",
            pointColor: "rgba(0,0,255,1)",
            pointStrokeColor: "",
            pointHighlightFill: "",
            pointHighlightStroke: "",
            data: splDataMap,
        }
    ]
};
//end data for chart

//setting chart range
let chartRange = this.props.chartRange;
let scaleStart = 55;
let scaleSteps = 10;
console.log('chart chartRange', chartRange);

    if (chartRange === 'low') {
        let scaleStart = 40;
        let scaleSteps = 10;
    } 
    else if (chartRange === 'medium') {
        let scaleStart = 50;
        let scaleSteps = 10;
    }
    else if (chartRange === 'high'){
        let scaleStart = 60;
        let scaleSteps = 15;
    }






let chartOptions = {
        scaleOverride: true, 
        scaleStartValue: scaleStart, 
        scaleStepWidth: 2, 
        scaleSteps: scaleSteps,
        bezierCurve : true,
        pointDot : true,
        pointDotStrokeWidth : 0.5,
        datasetFill : false,
}
  

  return (
      <LineChart data={chartData} options={chartOptions} height="370" width="250"/>            
  );
}
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Chart);
