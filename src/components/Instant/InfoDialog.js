import React, { Component } from 'react'

import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';


export default class InfoDialog extends Component {
  render() {

    return (
        <div>
            <Dialog fullScreen
                    open={this.props.infoDialog}
                    onClose={this.props.handleClose}
                    aria-labelledby="Decibel Info Dialog"
                    onClick={this.props.handleClose}>

            <DialogTitle id="form-dialog-title">What's a Decible?</DialogTitle>
            <DialogContent>
                <List>

                    <ListItem>
                        <span><strong>165</strong> Shot gun </span>
                    </ListItem>
                    <ListItem>
                        <span><strong>145 </strong> Fireworks</span>
                    </ListItem>
                    <ListItem>
                        <span><strong>130 </strong> Plane from 100 ft.</span>
                    </ListItem>
                    <ListItem>
                        <span><strong>110 </strong> Concert</span>
                    </ListItem>
                    <ListItem>
                        <span><strong>100 </strong> Tractor</span>
                    </ListItem>
                    <ListItem>
                        <span><strong>95 </strong> Hair dryer</span>
                    </ListItem>
                    <ListItem>
                        <span><strong>85 </strong> City trafic</span>
                    </ListItem>
                    <ListItem>
                        <span><strong>50-65 </strong> Speech</span>
                    </ListItem>
                    <ListItem>
                        <span><strong>20 </strong> Whisper</span>
                    </ListItem>
                    <ListItem>
                        <span><strong>0 </strong> Softest audible sound</span>
                    </ListItem>

                </List>

            <DialogTitle id="form-dialog-title">Permissible Exposure Time</DialogTitle>

                 <List>

                    <ListItem>
                        <span><strong>115 </strong> 30 sec. </span>
                    </ListItem>
                    <ListItem>
                        <span><strong>110 </strong> 2 min. </span>
                    </ListItem>
                    <ListItem>
                        <span><strong>100 </strong> 15 min. </span>
                    </ListItem>
                    <ListItem>
                        <span><strong>97 </strong> 30 min. </span>
                    </ListItem>
                    <ListItem>
                        <span><strong>94 </strong> 1 hr. </span>
                    </ListItem>
                    <ListItem>
                        <span><strong>91 </strong> 2 hr. </span>
                    </ListItem>
                    <ListItem>
                        <span><strong>88 </strong> 4 hr. </span>
                    </ListItem>
                    <ListItem>
                        <span><strong>85 </strong> 8 hr. </span>
                    </ListItem>

                </List>

            </DialogContent>
            </Dialog>
            
      </div>
    )
  }
}
