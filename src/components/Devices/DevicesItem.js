import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';
import { Paper, Button, Grid, Typography } from 'material-ui';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



import './Devices.css'
import Icon from 'material-ui/Icon';

//connect to redux
const mapStateToProps = state => ({
    state
});

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});













class DevicesItem extends Component {
    state = { expanded: false };


//handle card expand
handleExpandClick = () => {
  console.log('expand');
  this.setState({ expanded: !this.state.expanded });
  console.log(this.state);
  
};


  render() {
    const { classes } = this.props;


    return (
      <div>

            <Card className="devicePaper" >
              <CardContent>
                <Grid zeroMinWidth container spacing={16}>
                    <Grid item xs={2}>
                      <div className="deviceMore"><Button onClick={this.handleExpandClick}><Icon className="expandOpen">expand_more</Icon></Button></div>
                    </Grid>
                    <Grid item xs={5}>
                        <div className="deviceName"><p>{this.props.device.device_name}</p></div>
                    </Grid>
                    <Grid item xs={2}>
                        <div className="deviceEdit"><Button color="primary">Edit</Button></div>
                    </Grid>
                    <Grid item xs={2}>
                      <div className="deviceDelete"><Button color="secondary"><Icon>delete</Icon></Button></div>
                    </Grid>
                </Grid>
              </CardContent>
              <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                      <i>Id: <br/> {this.props.device.device_id}</i>
                      <br/>
                      <i>Auth Token: <br/> {this.props.device.auth_token}</i>
                    </CardContent>
                </Collapse>
            </Card>
 
      </div>
    );
  }
}

// allows us to use <App /> in index.js
export default connect(mapStateToProps)(DevicesItem);
